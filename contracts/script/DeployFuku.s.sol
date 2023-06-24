// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/tokens/Collectible.sol";

contract DeployFuku is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        new FukuFuku("ipfs://QmavhyKfH6cEfWGoQybikCEJsRHEjzA5E3UF4awiHFsEyt/"); // baseURI
        vm.stopBroadcast();
    }
}
