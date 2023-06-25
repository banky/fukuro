"use client";

import Image from "next/image";
import Link from "next/link";
import { AFROPOLITAN_ADDRESS, AUCTION_FACTORY, BLOCK_EXPLORER_URL } from "../../utils/constants";
import { GoCodescan } from 'react-icons/go'
import { ethers } from "ethers";
import { Button } from "../../components/Button";
import { useContractRead } from "wagmi";
import AuctionFactory from "../../data/AuctionFactory.json";
import Auction from "../../data/Auction.json";
import Fukuro from "../../data/Fukuro.json";
import { readContract } from '@wagmi/core'
import { useEffect, useState } from "react";
import { getTokenDetails } from "../../utils/alchemy";
import { Nft } from "alchemy-sdk";
import { HydratedAuction, hydrateAuction } from "../../components/Auction";

function Page() {
  const [hydratedAuctions, setHydratedAuctions] = useState<HydratedAuction[]>([])
  const [activeAuctions, setActiveAuctions] = useState<HydratedAuction[]>([])
  const [inactiveAuctions, setInactiveAuctions] = useState<HydratedAuction[]>([])

  const { data: auctionAddresses, isError, isLoading } = useContractRead({
    address: AUCTION_FACTORY,
    abi: AuctionFactory.abi,
    functionName: 'getAuctions',
  })

  useEffect(() => {
    const fetchAuctions = async () => {
      const _hydratedAuctions = await Promise.all(
        (auctionAddresses as any[]).map(async (auctionAddress: string) => {
          return await hydrateAuction(auctionAddress);
        })
      );
      setHydratedAuctions(_hydratedAuctions as HydratedAuction[]);
      console.log('hydratedAuctions', _hydratedAuctions);
    };

    fetchAuctions();
  }, [auctionAddresses]);

  useEffect(() => {
    const _activeAuctions = hydratedAuctions.filter((auction) => auction.canceled === false && auction.finalized === false);
    const _inactiveActions = hydratedAuctions.filter((auction) => auction.canceled === true || auction.finalized === true);

    setActiveAuctions(_activeAuctions);
    setInactiveAuctions(_inactiveActions)
  }, [hydratedAuctions])

  const auctions = [
    {
      tokenId: 26,
      auctionAddress: AFROPOLITAN_ADDRESS,
      imageUrl: "https://ipfs.io/ipfs/bafybeifcetut4fgnlmquws3c2jddt5i72vlculluw3tdyls7qiv2ixquum",
      title: "Auction",
      startBlock: 1,
      endBlock: 100,
      highestBid: ethers.utils.parseUnits("0.1", "ether").toString(),
      bidIncrement: ethers.utils.parseUnits("0.11", "ether").toString(),
    },
    {
      tokenId: 26,
      auctionAddress: AFROPOLITAN_ADDRESS,
      imageUrl: "https://ipfs.io/ipfs/bafybeid4blrpjudmqu7eborxklbnonoopqmm7opymlpfrgubw5ctt7m2c4",
      title: "Auction",
      startBlock: 1,
      endBlock: 100,
      highestBid: ethers.utils.parseUnits("0.2", "ether").toString(),
      bidIncrement: ethers.utils.parseUnits("0.12", "ether").toString(),
    },
    {
      tokenId: 26,
      auctionAddress: AFROPOLITAN_ADDRESS,
      imageUrl: "https://ipfs.io/ipfs/bafybeido3vjv6t2p7ijpdsa3qlpsejksv6js225g7bjt7zv67hfovjgqcq",
      title: "Auction",
      startBlock: 1,
      endBlock: 100,
      highestBid: ethers.utils.parseUnits("0.15", "ether").toString(),
      bidIncrement: ethers.utils.parseUnits("0.15", "ether").toString(),
    }
  ]


  return (
    <>
      <div className="max-w-4xl min-h-50 mx-auto ">
        <h1 className="text-center text-6xl">
          Buy and sell token bundles with ease
        </h1>
        <div className="grid grid-cols-2 mt-8 mb-4 gap-4 max-w-4xl mx-auto">
          {activeAuctions.map((auction) => (
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
      <div className="bg-gray-950 opacity-60 p-4 rounded-xl">
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
        <div className="flex gap-8 items-center justify-center">
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
