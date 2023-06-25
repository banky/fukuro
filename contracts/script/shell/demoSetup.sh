#!/bin/bash

source .env

forge script script/demoSetup.s.sol:DemoSetup --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
