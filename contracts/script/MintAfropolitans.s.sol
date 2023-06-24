// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/tokens/AfropolitanNFT.sol";

contract MintAfropolitans is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        AfropolitanNFT afropolitan = AfropolitanNFT(
            0x8E16e15381729fFEeDC4755f2Dcf6F5461f7F389
        );

        afropolitan.mintTo{value: 0.002 ether * 10}(
            0x85C91C3DfA5c200a6Ee9Bc9d3085d02A2c95908b,
            10
        );

        vm.stopBroadcast();
    }
}
