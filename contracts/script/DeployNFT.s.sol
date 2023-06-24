// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../lib/reference/src/interfaces/IERC6551Registry.sol";
import "../contracts/tokens/AfropolitanNFT.sol";
import "../contracts/tokens/BundleNFT.sol";

contract DeployNFTs is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address implementationAddress = 0xDA6c577241cB047628a370802D0CD20319F307B7;

        BundleNFT bundle = new BundleNFT();
        bundle.mintNFT(address(0xCC2c242B3B89D6A5BD37700AE681A4b94EE7d7CE), "");
        IERC6551Registry registry = IERC6551Registry(
            0x02101dfB77FDE026414827Fdc604ddAF224F0921
        );

        address accountAddress = registry.createAccount(
            implementationAddress,
            block.chainid,
            address(bundle),
            1,
            0,
            ""
        );

        // AfropolitanNFT nft = AfropolitanNFT()
        // nft.mintTo(address(accountAddress), 5);
        vm.stopBroadcast();
    }
}
