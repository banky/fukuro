#!/bin/bash

source .env

forge script script/DeployImplementation.s.sol:DeployImplementation --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
