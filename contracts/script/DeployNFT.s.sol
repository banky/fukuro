// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../lib/reference/src/interfaces/IERC6551Registry.sol";
import "../contracts/AfropolitanNFT.sol";
import "../contracts/BundleNFT.sol";

contract DeployNFTs is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        BundleNFT bundle = new BundleNFT();
        bundle.mintNFT(address(0xCC2c242B3B89D6A5BD37700AE681A4b94EE7d7CE), "");
        IERC6551Registry registry = IERC6551Registry(
            0x02101dfB77FDE026414827Fdc604ddAF224F0921
        );
        address account_address = registry.createAccount(
            0x2D25602551487C3f3354dD80D76D54383A243358,
            block.chainid,
            address(bundle),
            1,
            0,
            ""
        );
        AfropolitanNFT nft = new AfropolitanNFT();
        nft.mintNFT(
            address(account_address),
            "ipfs://bafkreia6ojqj4ynx5nghlhu3kg26ce55adfe75jokrsewoh7dg7e47sieu"
        );
        vm.stopBroadcast();
    }
}
