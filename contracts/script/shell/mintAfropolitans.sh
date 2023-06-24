#!/bin/bash

source .env

forge script script/MintAfropolitans.s.sol:MintAfropolitans --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
