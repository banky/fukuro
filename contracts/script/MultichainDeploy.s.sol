// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/tokens/AfropolitanNFT.sol";
import "../contracts/tokens/Collectible.sol";
import "../contracts/Fukuro.sol";
import "../lib/reference/src/interfaces/IERC6551Registry.sol";
import "../lib/reference/src/ERC6551Registry.sol";
import "../contracts/AuctionFactory.sol";
import "forge-std/console.sol";

contract MultichainDeploy is Script {
    function run() external {
        address banky = 0xCC2c242B3B89D6A5BD37700AE681A4b94EE7d7CE;
        address nick = 0x2633223E6cEE2Fb4e030d8F815dfc78003c4CCe1;
        address straightupjac = 0xE4Edb4C1696019589249Acf483DA341A89C9d961;

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        AfropolitanNFT afropolitanNFT = new AfropolitanNFT(
            "ipfs://bafybeifc5vbzbr5ayrr6gviwb3ftut7pwi5oej2n22oik3wt44wc3rxbre/"
        ); // baseURI

        FukuFuku fuku = new FukuFuku(
            "ipfs://QmavhyKfH6cEfWGoQybikCEJsRHEjzA5E3UF4awiHFsEyt/"
        ); // baseURI

        uint num6551 = 4;

        Fukuro fukuro = new Fukuro();

        address defaultRegistry = 0x02101dfB77FDE026414827Fdc604ddAF224F0921;
        IERC6551Registry registry;
        uint32 registryContractSize;
        assembly {
            registryContractSize := extcodesize(defaultRegistry)
        }
        if (registryContractSize > 0) {
            registry = IERC6551Registry(defaultRegistry);
        } else {
            registry = new ERC6551Registry();
        }

        // Mint to Banky
        uint start = fuku.publicMintId();
        for (uint i = start; i < start + num6551; i++) {
            fuku.publicMint{value: 0.002 ether}(1);
            fuku.transferFrom(address(banky), address(banky), i);
            address accountAddress = registry.createAccount(
                address(fukuro),
                block.chainid,
                address(fuku),
                i,
                0,
                ""
            );

            afropolitanNFT.mintTo{value: 0.002 ether * 4}(accountAddress, 4);
        }

        // Mint to Nick Offerman
        start = fuku.publicMintId();
        for (uint i = start; i < start + num6551; i++) {
            fuku.publicMint{value: 0.002 ether}(1);
            fuku.transferFrom(address(banky), address(nick), i);
            address accountAddress = registry.createAccount(
                address(fukuro),
                block.chainid,
                address(fuku),
                i,
                0,
                ""
            );

            afropolitanNFT.mintTo{value: 0.002 ether * 4}(accountAddress, 4);
        }

        // Mint to Jacky Chan
        start = fuku.publicMintId();
        for (uint i = start; i < start + num6551; i++) {
            fuku.publicMint{value: 0.002 ether}(1);
            fuku.transferFrom(address(banky), address(straightupjac), i);
            address accountAddress = registry.createAccount(
                address(fukuro),
                block.chainid,
                address(fuku),
                i,
                0,
                ""
            );

            afropolitanNFT.mintTo{value: 0.002 ether * 4}(accountAddress, 4);
        }

        AuctionFactory auctionFactory = new AuctionFactory();

        console.log("Fukuro", address(fukuro));
        console.log("FukuFuku", address(fuku));
        console.log("AfropolitanNFT", address(afropolitanNFT));
        console.log("Registry", address(registry));
        console.log("AuctionFactory", address(auctionFactory));

        vm.stopBroadcast();
    }
}
