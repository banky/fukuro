// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../contracts/tokens/Collectible.sol";
import "../contracts/tokens/AfropolitanNFT.sol";
import "../lib/reference/src/interfaces/IERC6551Registry.sol";

contract DemoSetup is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address implementationAddress = 0xDA6c577241cB047628a370802D0CD20319F307B7; // Fukuro contract
        IERC6551Registry registry = IERC6551Registry(
            0x02101dfB77FDE026414827Fdc604ddAF224F0921
        );

        AfropolitanNFT afropolitan = AfropolitanNFT(
            0x8E16e15381729fFEeDC4755f2Dcf6F5461f7F389
        );
        FukuFuku fuku = FukuFuku(0xA6d32Be299C481c7C689b6f7238A1cE1b5A3213d);

        uint startFuku = 35;

        // create 6551 accounts for fukus
        address accountAddress1 = registry.createAccount(
            implementationAddress,
            block.chainid,
            address(fuku),
            startFuku,
            0,
            ""
        );
        console.log("accountAddress1: %s", accountAddress1);

        address accountAddress2 = registry.createAccount(
            implementationAddress,
            block.chainid,
            address(fuku),
            startFuku + 1,
            0,
            ""
        );
        console.log("accountAddress2: %s", accountAddress2);
        address accountAddress3 = registry.createAccount(
            implementationAddress,
            block.chainid,
            address(fuku),
            startFuku + 2,
            0,
            ""
        );
        console.log("accountAddress3: %s", accountAddress3);

        address seaportBurner = 0x85C91C3DfA5c200a6Ee9Bc9d3085d02A2c95908b;
        address banky = 0xCC2c242B3B89D6A5BD37700AE681A4b94EE7d7CE;
        address nick = 0x2633223E6cEE2Fb4e030d8F815dfc78003c4CCe1;
        address straightupjac = 0xE4Edb4C1696019589249Acf483DA341A89C9d961;

        // send Afropolitans to fuku accounts

        // uint start = 66;
        // for (uint256 i = 0; i < 3; i++) {
        //     afropolitan.transferFrom(seaportBurner, accountAddress1, start + i);
        // }
        // for (uint256 i = 0; i < 4; i++) {
        //     afropolitan.transferFrom(
        //         seaportBurner,
        //         accountAddress2,
        //         start + 3 + i
        //     );
        // }
        // for (uint256 i = 0; i < 3; i++) {
        //     afropolitan.transferFrom(
        //         seaportBurner,
        //         accountAddress3,
        //         start + 7 + i
        //     );
        // }

        // send fukus
        fuku.transferFrom(seaportBurner, straightupjac, 35);
        fuku.transferFrom(seaportBurner, straightupjac, 36);
        fuku.transferFrom(seaportBurner, straightupjac, 37);

        vm.stopBroadcast();
    }
}
