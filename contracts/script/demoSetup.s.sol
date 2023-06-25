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

        // create 6551 accounts for fukus
        address accountAddress1 = registry.createAccount(
            implementationAddress,
            block.chainid,
            address(fuku),
            32,
            0,
            ""
        );
        console.log("accountAddress1: %s", accountAddress1);

        address accountAddress2 = registry.createAccount(
            implementationAddress,
            block.chainid,
            address(fuku),
            33,
            0,
            ""
        );
        console.log("accountAddress2: %s", accountAddress2);
        address accountAddress3 = registry.createAccount(
            implementationAddress,
            block.chainid,
            address(fuku),
            34,
            0,
            ""
        );
        console.log("accountAddress3: %s", accountAddress3);

        address seaportBurner = 0x85C91C3DfA5c200a6Ee9Bc9d3085d02A2c95908b;
        address banky = 0xCC2c242B3B89D6A5BD37700AE681A4b94EE7d7CE;
        address nick = 0x2633223E6cEE2Fb4e030d8F815dfc78003c4CCe1;

        // send Afropolitans to fuku accounts
        afropolitan.transferFrom(seaportBurner, accountAddress1, 46);
        afropolitan.transferFrom(seaportBurner, accountAddress1, 47);
        afropolitan.transferFrom(seaportBurner, accountAddress1, 48);

        afropolitan.transferFrom(seaportBurner, accountAddress2, 49);
        afropolitan.transferFrom(seaportBurner, accountAddress2, 50);
        afropolitan.transferFrom(seaportBurner, accountAddress2, 51);

        afropolitan.transferFrom(seaportBurner, accountAddress3, 52);
        afropolitan.transferFrom(seaportBurner, accountAddress3, 53);
        afropolitan.transferFrom(seaportBurner, accountAddress3, 54);
        afropolitan.transferFrom(seaportBurner, accountAddress3, 55);

        // send fukus to banky
        fuku.transferFrom(seaportBurner, nick, 32);
        fuku.transferFrom(seaportBurner, nick, 33);
        fuku.transferFrom(seaportBurner, nick, 34);

        vm.stopBroadcast();
    }
}
