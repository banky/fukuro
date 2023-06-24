// SPDX-License-Identifier: MIT
// modified from @brynbellomy/solidity-auction
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/Auction.sol";
import "../contracts/Fukuro.sol";
import "./mocks/MockERC721.sol";
import "./mocks/MockAccountRegistry.sol";

contract AuctionTest is Test {
    Auction public auction;
    Fukuro public fukuro;
    MockERC721 public tokenCollection;
    AccountRegistry public accountRegistry;

    function setUp() public {
        auction = new Auction(
            1,
            1,
            2,
            payable(0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF)
        );
        tokenCollection = new MockERC721();
        accountRegistry = new AccountRegistry(address(fukuro));
    }
}
