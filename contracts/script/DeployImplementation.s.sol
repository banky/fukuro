pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/Fukuro.sol";

contract DeployImplementation is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        Fukuro implementation = new Fukuro();
        vm.stopBroadcast();
    }
}
