// SPDX-License-Identifier: MIT
// Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
pragma solidity ^0.8.0;

import "openzeppelin-contracts/interfaces/IERC20.sol";
import "openzeppelin-contracts/utils/Strings.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/security/ReentrancyGuard.sol";
import "openzeppelin-contracts/utils/cryptography/MerkleProof.sol";

contract FukuFuku is ERC721URIStorage, Ownable, ReentrancyGuard {
    string private _collectionURI;
    string public baseURI;

    /**
     * team mint are from 1-25 (25 max supply)
     * whitelist are from 26-1000 (975 max supply)
     * public mint from 1001 - 6000 (5000 max supply)
     **/

    uint256 public immutable maxGiftMintId = 25;
    uint256 public giftMintId = 1;

    uint256 public immutable maxPublicMint = 1000;
    uint256 public publicMintId = 26;
    uint256 public constant PUBLIC_SALE_PRICE = 0.002 ether;

    // keep track of those on whitelist who have claimed their NFT
    mapping(address => bool) public claimed;

    constructor(
        string memory _baseURI,
        string memory collectionURI
    ) ERC721("FukuFuku", "FUKU") {
        setBaseURI(_baseURI);
        setCollectionURI(collectionURI);
    }

    modifier isCorrectPayment(uint256 price, uint256 numberOfTokens) {
        require(
            price * numberOfTokens == msg.value,
            "Incorrect ETH value sent"
        );
        _;
    }

    modifier canMint(uint256 numberOfTokens) {
        require(
            publicMintId + numberOfTokens <= maxPublicMint,
            "Not enough tokens remaining to mint"
        );
        _;
    }

    // ============ PUBLIC FUNCTIONS FOR MINTING ============

    /**
     * @dev mints 1 token per address, does not charge a fee
     * Max supply: 25 (token ids: 1-25)
     */
    function mintGift() public nonReentrant {
        require(giftMintId <= maxGiftMintId);
        require(!claimed[msg.sender], "NFT is already claimed by this wallet");
        _mint(msg.sender, giftMintId);
        giftMintId++;
    }

    /**
     * @dev mints 1 token per whitelisted address, does not charge a fee
     * Max supply: 975 (token ids: 26-1000)
     * charges a fee
     */
    function publicMint(
        uint256 numberOfTokens
    )
        public
        payable
        isCorrectPayment(PUBLIC_SALE_PRICE, numberOfTokens)
        canMint(numberOfTokens)
        nonReentrant
    {
        for (uint256 i = 0; i < numberOfTokens; i++) {
            _mint(msg.sender, publicMintId);
            publicMintId++;
        }
    }

    // ============ PUBLIC READ-ONLY FUNCTIONS ============
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: query for nonexistent token"
        );
        return
            string(
                abi.encodePacked(baseURI, Strings.toString(tokenId), ".json")
            );
    }

    /**
     * @dev collection URI for marketplace display
     */
    function contractURI() public view returns (string memory) {
        return _collectionURI;
    }

    // ============ OWNER-ONLY ADMIN FUNCTIONS ============
    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    /**
     * @dev set collection URI for marketplace display
     */
    function setCollectionURI(
        string memory collectionURI
    ) internal virtual onlyOwner {
        _collectionURI = collectionURI;
    }

    /**
     * @dev withdraw funds for to specified account
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function withdrawTokens(IERC20 token) public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }
}
