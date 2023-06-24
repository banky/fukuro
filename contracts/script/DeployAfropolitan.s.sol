// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/tokens/AfropolitanNFT.sol";

contract DeployAfropolitan is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        new AfropolitanNFT(
            "ipfs://bafybeifc5vbzbr5ayrr6gviwb3ftut7pwi5oej2n22oik3wt44wc3rxbre/"
        ); // baseURI

        vm.stopBroadcast();
    }
}
