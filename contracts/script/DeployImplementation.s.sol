pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/Curation.sol";

contract DeployImplementation is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        Curation implementation = new Curation();
        vm.stopBroadcast();
    }
}
