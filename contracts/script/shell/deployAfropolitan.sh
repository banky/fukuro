#!/bin/bash

source .env

forge script script/DeployAfropolitan.s.sol:DeployAfropolitan --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
