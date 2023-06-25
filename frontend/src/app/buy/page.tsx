"use client";

import Link from "next/link";
import { BLOCK_EXPLORER_URL } from "../../utils/constants";
import { GoCodescan } from 'react-icons/go'
import { ethers } from "ethers";
import { Button } from "../../components/Button";
import { HydratedAuction } from "../../hooks/useAuctions";
import { AuctionsContext } from "../../contexts/AuctionsContext";
import { useContext } from "react";

function Page() {
  const {activeAuctions, inactiveAuctions, loading} = useContext(AuctionsContext);
  return (
    <>
      <div className="max-w-4xl min-h-50 mx-auto ">
        <h1 className="text-center text-6xl">
          Buy and sell token bundles with ease
        </h1>
        <h1 className="mt-4 text-center text-4xl">
          Open Auctions
        </h1>
        <div className="grid grid-cols-2 mt-8 mb-4 gap-4 max-w-4xl mx-auto">
          {loading ? "Loading..." : activeAuctions.map((auction) => (
            <>
              <AuctionCard
                key={`${auction.auctionAddress}`}
                auctionAddress={auction.auctionAddress}
                startBlock={auction.startBlock}
                endBlock={auction.endBlock}
                bidIncrement={auction.bidIncrement}
                highestBid={auction.highestBid}
                highestBidder={auction.highestBidder}
                highestBindingBid={auction.highestBindingBid}
                canceled={auction.canceled}
                finalized={auction.finalized}
                parentNFT={auction.parentNFT}
              />
            </>))}
        </div>
        <h1 className="text-center text-4xl">
          Past Auctions (Inactive)
        </h1>
        <div className="grid grid-cols-2 mt-8 mb-4 gap-4 max-w-4xl mx-auto">
        {loading ? "Loading..." : inactiveAuctions.map((auction) => (
            <>
              <AuctionCard
                key={`${auction.auctionAddress}`}
                auctionAddress={auction.auctionAddress}
                startBlock={auction.startBlock}
                endBlock={auction.endBlock}
                bidIncrement={auction.bidIncrement}
                highestBid={auction.highestBid}
                highestBidder={auction.highestBidder}
                highestBindingBid={auction.highestBindingBid}
                canceled={auction.canceled}
                finalized={auction.finalized}
                parentNFT={auction.parentNFT}
              />
            </>))}
        </div>
      </div>
    </>
  );
}

interface AuctionProps extends HydratedAuction {
  auctionAddress: string;
}

const AuctionCard = (
  { auctionAddress,
    startBlock,
    endBlock,
    bidIncrement,
    canceled,
    finalized,
    highestBindingBid,
    highestBidder,
    highestBid,
    parentNFT
  }: AuctionProps) => {

  const bidIncrementEth = ethers.utils.formatEther(bidIncrement.toString());
  const highestBidEth = ethers.utils.formatEther(highestBid.toString());

  const image = parentNFT.media[0].gateway as string;
  const title = parentNFT.title;
  const tokenId = parentNFT.tokenId;

  return (
    <div className="my-2">
      <div className="bg-gray-950 opacity-80 p-4 rounded-xl">
        <Link href={`/buy/${auctionAddress}`}>
          <div className="mb-4">
            <h1 className="text-lg">
              Open Auction: {title} #{tokenId}
            </h1>
          </div>
          <div className="flex gap-4">
            <Image src={image} width={200} height={200} alt="" />
            <div className="text-l">
              <div>
                Start time: {startBlock.toString()}
              </div>
              <br />
              <div>
                End time: {endBlock.toString()}
              </div>
              <br />
              <div>
                Bid increment: {bidIncrementEth} ETH
              </div>
              <br />
              <div>
                Highest bid: {highestBidEth} ETH
              </div>
            </div>
          </div>
        </Link>
        <div className="flex gap-8 items-center justify-center mt-4 ">
          <Link
            href={`${BLOCK_EXPLORER_URL}/address/${auctionAddress}`}
            target="_blank"
          >
            <div className="flex gap-2 items-center justify-center">
              View on etherscan <GoCodescan />
            </div>
          </Link>
          <Link
            href={`/buy/${auctionAddress}`}>
            <Button>
              See auction details
            </Button>
          </Link>
        </div>
      </div>

    </div >
  );
};

export default Page;
