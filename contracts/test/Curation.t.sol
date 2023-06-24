// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/Curation.sol";
import "./mocks/MockERC721.sol";
import "./mocks/MockAccountRegistry.sol";

contract CurationTest is Test {
    Curation public curation;
    MockERC721 public tokenCollection;
    AccountRegistry public accountRegistry;

    function setUp() public {
        curation = new Curation();
        tokenCollection = new MockERC721();
        accountRegistry = new AccountRegistry(address(curation));
    }

    function testNonOwnerCallsFail(uint256 tokenId) public {
        address user1 = vm.addr(1);
        address user2 = vm.addr(2);

        tokenCollection.mint(user1, tokenId);
        assertEq(tokenCollection.ownerOf(tokenId), user1);

        address accountAddress = accountRegistry.createAccount(
            address(tokenCollection),
            tokenId
        );

        vm.deal(accountAddress, 1 ether);

        Curation account = Curation(payable(accountAddress));

        // should fail if user2 tries to use account
        vm.prank(user2);
        vm.expectRevert();
        account.executeCall(payable(user2), 0.1 ether, "");
    }
}
