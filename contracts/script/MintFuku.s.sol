// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/tokens/Collectible.sol";

contract MintFuku is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        FukuFuku fuku = FukuFuku(0xA6d32Be299C481c7C689b6f7238A1cE1b5A3213d);

        fuku.publicMint{value: 0.002 ether * 10}(10);

        vm.stopBroadcast();
    }
}
