// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/utils/Counters.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AfropolitanNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    string public baseURI;
    Counters.Counter private _tokenIds;

    constructor(
        string memory _baseURI,
    ) ERC721("Afropolitan Citizen", "AFROPOL") {
        setBaseURI(_baseURI);
    }

    function mintNFT(
        address recipient
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        string tokenURI = string.concat(baseURI, '/', Strings.toString(_tokenIds.current()))
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
