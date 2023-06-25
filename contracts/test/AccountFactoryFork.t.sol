// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/AuctionFactory.sol";
import "../contracts/Auction.sol";
import "../contracts/Fukuro.sol";
import "./mocks/MockERC721.sol";
import "./mocks/MockAccountRegistry.sol";

contract AuctionFactoryTest is Test {
    AuctionFactory public auctionFactory;
    Fukuro public fukuro;
    MockERC721 public tokenCollection;
    AccountRegistry public accountRegistry;

    function setUp() public {
        auctionFactory = AuctionFactory(
            0xb16916Fc4c5bCb989b9e2c1e73Ed56b74003dbE2
        );
    }

    function testCreateAuction() public {
        vm.startPrank(0xCC2c242B3B89D6A5BD37700AE681A4b94EE7d7CE);
        auctionFactory.createAuction(
            1,
            block.number,
            block.number + 1 weeks,
            payable(0x174D9E9b11E6FEF28895f2bCeA783138eDBD47eB)
        );

        vm.stopPrank();
    }
}
