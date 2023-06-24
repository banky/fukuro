// SPDX-License-Identifier: MIT
// modified from brynbellomy/solidity-auction
pragma solidity ^0.8.13;

import "./Auction.sol";
import "openzeppelin-contracts/token/ERC721/IERC721.sol";
import "openzeppelin-contracts/token/ERC1155/IERC1155.sol";

contract AuctionFactory {
    // ============ STATE ============
    enum AuctionState {
        OPEN,
        CANCELED,
        FINALIZED
    }

    mapping(Auction => AuctionState) public auctionMap;
    Auction[] public auctions;

    // ============ EVENTS ============
    event AuctionCreated(Auction auctionContract, address owner);

    // ============ CONSTRUCTOR ============
    constructor() {}

    // ============ PUBLIC FUNCTIONS ============
    /*  @dev sell will deploy a new Auction with all the params
    it checks if the passed in token is of erc721 or erc1155
    */
    function createAuction(
        uint _bidIncrement, // TODO: is this in wei or eth
        uint _startBlock,
        uint _endBlock,
        address payable _tokenboundAddress
    ) public {
        // TODO: every time auction is closed, have to delete - expensive delete
        // solady has pkg for it
        // we also need the array to enumerate through

        // validate that parent of tokenbound is ERC721 or ERC1155

        (
            uint256 chainId,
            address tokenContract,
            uint256 tokenId
        ) = IERC6551Account(_tokenboundAddress).token(); // getting the parent
        if (chainId != block.chainid) {
            revert("chain does not match token chain"); // make sure we're the right chain
        }

        require(
            IERC721(tokenContract).ownerOf(tokenId) == msg.sender,
            "auction creator does not own tokenId"
        );

        IERC165 tokenContract165 = IERC165(tokenContract);
        require(
            tokenContract165.supportsInterface(type(IERC721).interfaceId) ||
                tokenContract165.supportsInterface(type(IERC1155).interfaceId),
            "Not an ERC721 and ERC1155 tokenbound contract"
        );

        Auction auction = new Auction(
            _bidIncrement,
            _startBlock,
            _endBlock,
            _tokenboundAddress
        );
        auction.transferOwnership(msg.sender);

        emit AuctionCreated(auction, msg.sender);
        auctionMap[auction] = AuctionState.OPEN;
        auctions.push(auction);
    }
}
