// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/Auction.sol";
import "./mocks/MockERC721.sol";
import "./mocks/MockAccountRegistry.sol";

contract AuctionTest is Test {
    Auction public auction;
    Curation public curation;
    MockERC721 public tokenCollection;
    AccountRegistry public accountRegistry;

    function setUp() public {
        auction = new Counter();
        tokenCollection = new MockERC721();
        accountRegistry = new AccountRegistry(address(curation));
    }

    function testBadCast() public {}
}
