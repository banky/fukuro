#!/bin/bash

source .env

forge script script/MintFuku.s.sol:MintFuku --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
