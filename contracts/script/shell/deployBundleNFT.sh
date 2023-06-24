#!/bin/bash

source .env

forge script script/DeployNFT.s.sol:DeployNFTs --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
