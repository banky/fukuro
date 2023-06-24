#!/bin/bash

source .env

forge script script/DeployFuku.s.sol:DeployFuku --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
