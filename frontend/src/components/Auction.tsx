import { useEffect, useState } from "react";
import { Button } from "./Button";
import { prettySeconds } from "../utils/prettySeconds";
import { readContract } from '@wagmi/core'
import AuctionAbi from "../data/Auction.json";
import Fukuro from "../data/Fukuro.json";
import { getTokenDetails } from "../utils/alchemy";
import { Nft } from "alchemy-sdk";
import { ethers } from "ethers";
import Image from "next/image";
import { useContractWrite } from "wagmi";
import { AUCTION_FACTORY } from "../utils/constants";


type Auction = {
    state: string;
    highestBid: number;
    highestBidder: string;
}

export interface HydratedAuction {
    auctionAddress: string;
    startBlock: number;
    endBlock: number;
    bidIncrement: string;
    canceled: boolean;
    finalized: boolean;
    highestBindingBid: string;
    highestBidder: string;
    highestBid: string;
    parentNFT: Nft;
}


export const Auction = ({ auction, endTimestampEstimate }: { auction: HydratedAuction, endTimestampEstimate: number }) => {
    const { canceled, finalized,
        highestBid, highestBidder, bidIncrement, startBlock, endBlock,
        parentNFT
    } = auction;
    const [bid, setBid] = useState(Math.max(0.02, Number(ethers.utils.formatEther(parseInt(highestBid) + parseInt(bidIncrement)))));
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
    }, []);

    const highestBidEth = ethers.utils.formatEther(highestBid.toString());
    const bidIncrementEth = ethers.utils.formatEther(bidIncrement.toString());
    const image = parentNFT.media[0].gateway as string;

    const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
        address: auction.auctionAddress as any,
        abi: AuctionAbi.abi,
        functionName: "placeBid",
    });

    const placeBid = async () => {
        const bidAmountWei = ethers.utils.parseUnits(bid.toString(), "ether") // Convert to wei
        const writeFuncResult = await writeAsync({
            value: bidAmountWei.toBigInt(),
        });
        console.log(writeFuncResult);
    }
    return (
        <div className="p-4 rounded-xl">
            <div className="flex justify-center items-center flex-col gap-4">
                <Image src={image} width={300} height={300} alt="" />
                <div className="mb-4">
                    <h1 className="text-xl text-center">
                        {canceled ? 'Canceled' : finalized ? 'Finalized' : 'Auction is open!'}
                    </h1>
                </div>
            </div>
            <div className="flex mb-4">
                <div className="flex flex-col">
                    {highestBid ?
                        <div className="text-lg">
                            Highest bid: {highestBid}
                        </div> :
                        <div className="text-lg">
                            No bids yet
                        </div>
                    }
                    <br />
                    <div className="text-lg">
                        Start time: {startBlock.toString()}
                    </div>
                    <br />
                    <div className="text-lg">
                        End time: {endBlock.toString()}
                    </div>
                    <br />
                    {highestBid &&
                        <>
                            <div className="text-lg">
                                Highest bidder: {highestBidder}
                            </div>
                            <br />
                        </>
                    }
                    {highestBidEth &&
                        <>
                            <div className="text-lg">
                                Highest bid: {highestBidEth}
                            </div>
                            <br />
                        </>}
                    <div className="text-lg">
                        Bid increment: {bidIncrementEth} ETH
                    </div>
                    <br />
                    <div className="text-lg">
                        Time left: {endTimestampEstimate === 0 ? '???' : (prettySeconds(Math.floor((endTimestampEstimate - currentTime) / 1000)))}
                    </div>
                </div>
            </div>
            <div className="my-8 flex gap-4 w-fit mx-auto">
                <input
                    className="text-black px-4 py-2 rounded-md"
                    value={bid}
                    onChange={(e) => setBid(Number(e.target.value))}
                    placeholder="Enter a bid value (ETH)"
                />
                {isLoading ? <div className="text-lg">Loading...</div> : isSuccess ? <div className="text-lg">Successfully placed bid!</div> : null}
                {!isLoading && !isSuccess && <Button onClick={placeBid} disabled={bid <= Number(highestBid)}>Place bid</Button>}
            </div>
        </div >
    );
};


export const hydrateAuction = async (auctionAddress: string) => {
    const startBlock = await readContract({
        address: auctionAddress as any,
        abi: AuctionAbi.abi,
        functionName: 'startBlock',
        chainId: 5,
    })
    const endBlock = await readContract({
        address: auctionAddress as any,
        abi: AuctionAbi.abi,
        functionName: 'endBlock',
        chainId: 5,
    })
    const bidIncrement = await readContract({
        address: auctionAddress as any,
        abi: AuctionAbi.abi,
        functionName: 'bidIncrement',
        chainId: 5,
    })

    const canceled = await readContract({
        address: auctionAddress as any,
        abi: AuctionAbi.abi,
        functionName: 'canceled',
        chainId: 5,
    })
    const finalized = await readContract({
        address: auctionAddress as any,
        abi: AuctionAbi.abi,
        functionName: 'finalized',
        chainId: 5,
    })
    const highestBindingBid = await readContract({
        address: auctionAddress as any,
        abi: AuctionAbi.abi,
        functionName: 'highestBindingBid',
        chainId: 5,
    })
    const highestBid = await readContract({
        address: auctionAddress as any,
        abi: AuctionAbi.abi,
        functionName: 'getHighestBid',
        chainId: 5,
    })
    const highestBidder = await readContract({
        address: auctionAddress as any,
        abi: AuctionAbi.abi,
        functionName: 'highestBidder',
        chainId: 5,
    })
    const tokenboundContract = await readContract({
        address: auctionAddress as any,
        abi: AuctionAbi.abi,
        functionName: 'tokenboundContract',
        chainId: 5,
    })

    const parent = await readContract({
        address: tokenboundContract as any,
        abi: Fukuro.abi,
        functionName: 'token',
        chainId: 5,
    })

    const [chainId, parentContract, tokenId] = parent as any[];
    // console.log("~~~~~ tokenbound and parent", tokenboundContract, parent, chainId, parentContract, tokenId)

    const parentNFT = await getTokenDetails(parentContract, parseInt(tokenId), parseInt(chainId));
    // console.log("~~~~~ nftData", parentNFT)

    return {
        auctionAddress,
        startBlock,
        endBlock,
        bidIncrement,
        canceled,
        finalized,
        highestBindingBid,
        highestBidder,
        highestBid,
        parentNFT
    }
}
