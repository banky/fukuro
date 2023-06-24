// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/utils/introspection/IERC165.sol";
import "openzeppelin-contracts/token/ERC721/IERC721.sol";
import "erc6551/interfaces/IERC6551Account.sol";

contract Auction is Ownable, IERC165 {
    // ============ GLOBAL STATIC VARIABLES  ============
    uint public bidIncrement;
    uint public startBlock;
    uint public endBlock;
    IERC6551Account public immutable tokenboundContract;

    // ============ STATE ============
    bool public canceled;
    bool public finalized;
    uint public highestBindingBid;
    address public highestBidder;
    mapping(address => uint256) public fundsByBidder;

    // ============ MODIFIERS ============
    modifier onlyNotOwner() {
        require(msg.sender != owner(), "Owner cannot bid on their own auction");
        _;
    }

    modifier onlyAfterStart() {
        require(block.number >= startBlock, "Auction has not started yet");
        _;
    }

    modifier onlyBeforeEnd() {
        require(block.number <= endBlock, "Auction is over");
        _;
    }

    modifier onlyNotCanceled() {
        require(!canceled, "Auction is canceled");
        _;
    }

    modifier onlyAuctionEnded() {
        require(
            !canceled || block.number > endBlock,
            "Auction not ended or canceled"
        );
        _;
    }

    modifier onlyCanceled() {
        require(canceled, "Auction not canceled");
        _;
    }

    // ============ EVENTS ============
    event LogBid(
        address bidder,
        uint bid,
        address highestBidder,
        uint highestBid,
        uint highestBindingBid
    );
    event LogWithdrawal(
        address withdrawer,
        address withdrawalAccount,
        uint amount
    );
    event LogCanceled();

    // ============ CONSTRUCTOR ============
    constructor(
        uint _bidIncrement, // TODO: is this in wei or eth
        uint _startBlock,
        uint _endBlock,
        address payable _tokenboundAddress
    ) {
        require(
            _startBlock >= block.number,
            "Start block must be greater than current block"
        );
        require(
            _endBlock > _startBlock,
            "End block must be greater than start block"
        );
        require(_bidIncrement > 0, "Bid increment must be greater than 0");
        require(
            _tokenboundAddress != address(0),
            "Tokenbound address cannot be 0"
        );

        IERC6551Account tokenbound = IERC6551Account(_tokenboundAddress);
        // require(
        //     tokenbound.owner() == msg.sender,
        //     "Sender must be owner of tokenbound contract"
        // );

        tokenboundContract = tokenbound;
        bidIncrement = _bidIncrement;
        startBlock = _startBlock;
        endBlock = _endBlock;
    }

    // ============ PUBLIC FUNCTIONS ============
    function getHighestBid() public view returns (uint) {
        return fundsByBidder[highestBidder];
    }

    function placeBid()
        public
        payable
        onlyAfterStart
        onlyBeforeEnd
        onlyNotCanceled
        onlyNotOwner
        returns (bool success)
    {
        require(msg.value > 0, "Bid must be higher than 0");
        uint newBid = fundsByBidder[msg.sender] + msg.value;
        require(newBid > highestBindingBid, "Minimum bid amount not met"); // new bid must out bid binding bid

        uint highestBid = fundsByBidder[highestBidder];
        fundsByBidder[msg.sender] = newBid;

        // TODO: decide if we want to immediately refund last highest bidder or keep them locked in
        highestBindingBid = _min(newBid + bidIncrement, highestBid);
        if (newBid > highestBid) {
            highestBidder = msg.sender;
        }

        emit LogBid(
            msg.sender,
            newBid,
            highestBidder,
            highestBid,
            highestBindingBid
        );
        return true;
    }

    function finalizeAuction()
        public
        onlyOwner
        onlyAuctionEnded
        returns (bool success)
    {
        address withdrawalAccount = highestBidder;
        uint withdrawalAmount = highestBindingBid;

        (
            uint256 chainId,
            address tokenContract,
            uint256 tokenId
        ) = tokenboundContract.token(); // getting the parent
        if (chainId != block.chainid) return false; // make sure we're the right chain

        fundsByBidder[withdrawalAccount] -= withdrawalAmount;
        payable(msg.sender).transfer(withdrawalAmount);
        emit LogWithdrawal(msg.sender, withdrawalAccount, withdrawalAmount);

        IERC165 tokenContract165 = IERC165(address(tokenContract));
        if (tokenContract165.supportsInterface(type(IERC721).interfaceId)) {
            IERC721 token = IERC721(address(tokenContract));
            token.transferFrom(address(this), withdrawalAccount, tokenId);
        } else {
            revert("only ERC721 is supported as parent contract");
        }

        finalized = true;
        return true;
    }

    function withdraw()
        public
        onlyAuctionEnded
        onlyCanceled
        returns (bool success)
    {
        address withdrawalAccount;
        uint withdrawalAmount;
        if (canceled) {
            withdrawalAccount = msg.sender;
            withdrawalAmount = fundsByBidder[withdrawalAccount];
        } else {
            if (msg.sender == highestBidder) {
                // the highest bidder should only be allowed to withdraw the difference between their
                // highest bid and the highestBindingBid
                withdrawalAccount = highestBidder;
                if (finalized) {
                    withdrawalAmount = fundsByBidder[highestBidder];
                } else {
                    withdrawalAmount =
                        fundsByBidder[highestBidder] -
                        highestBindingBid;
                }
            } else {
                // anyone who participated but did not win the auction should be allowed to withdraw
                // the full amount of their funds
                withdrawalAccount = msg.sender;
                withdrawalAmount = fundsByBidder[withdrawalAccount];
            }
        }

        require(withdrawalAmount != 0, "No funds to withdraw");

        fundsByBidder[withdrawalAccount] -= withdrawalAmount;
        payable(msg.sender).transfer(withdrawalAmount);
        emit LogWithdrawal(msg.sender, withdrawalAccount, withdrawalAmount);

        return true;
    }

    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return (interfaceId == type(IERC165).interfaceId ||
            interfaceId == type(IERC6551Account).interfaceId);
    }

    /* =========== OWNER ONLY FUNCTIONS =========== */
    function cancelAuction()
        public
        onlyOwner
        onlyBeforeEnd
        onlyNotCanceled
        returns (bool success)
    {
        canceled = true;
        emit LogCanceled();
        return true;
    }

    /* ========== PRIVATE + INTERNAL FUNCTIONS ========== */
    function _min(uint a, uint b) private pure returns (uint) {
        if (a < b) return a;
        return b;
    }
}
