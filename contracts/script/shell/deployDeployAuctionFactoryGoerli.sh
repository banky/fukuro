#!/bin/bash

source .env

forge script script/DeployAuctionFactory.s.sol:DeployAuctionFactory --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
