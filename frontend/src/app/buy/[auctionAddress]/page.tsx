"use client";

import Image from "next/image";
import { ethers } from 'ethers';
import { use, useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/Button";
import { usePathname } from "next/navigation";
import { useAccountOwnedByToken } from "../../../hooks/useAccountOwnedByToken";
import { useAccount, useChainId, useContractRead } from "wagmi";
import { fetchERC721Balances } from "../../../utils/alchemy";
import { Token } from "../../../utils/subgraph";
import { SiOpensea } from "react-icons/si";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { AUCTIONS, OPENSEA_URL } from "../../../utils/constants";
import { Auction, HydratedAuction, hydrateAuction } from "../../../components/Auction";
import { NFTList } from "../../../components/NFTList";

const MOCK_AUCTION_DATA = {
  state: "active",
  highestBid: 400,
  highestBidder: "0x123",
};

const READABLE_AUCTION_STATE = {
  active: "Active",
  canceled: "Canceled",
  finalized: "Finalized",
};

export function Page() {
  const pathName = usePathname();
  const auctionAddress = pathName.replace("/buy/", "");
  const [auction, setAuction] = useState<HydratedAuction>();
  useEffect(() => {
    const getAuctionData = async () => {
      const _auction = await hydrateAuction(auctionAddress);
      setAuction(_auction as any)
    }
    getAuctionData()
  }, [setAuction, auctionAddress])


  // const auction = useMemo(() => AUCTIONS.find((auction) => auction.auctionAddress === auctionAddress), [auctionAddress])
  const [endTimestampEstimate, setEndTimestampEstimate] = useState(0);

  useEffect(() => {
    if (!auction) { return; }
    const getAuctionData = async () => {
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_GOERLI_RPC_URL)
      const startTimestamp = (await provider.getBlock(auction.startBlock)).timestamp;
      const blockDiff = auction.endBlock - auction.startBlock;
      setEndTimestampEstimate(blockDiff * 12 * 1000 + startTimestamp * 1000)
    }
    getAuctionData()
  }, [setEndTimestampEstimate, auction])

  return (
    <div className=" min-h-screen">
      <div className="flex flex-col justify-between">
        <div>
          <Link href="/buy">
            <div className="flex justify-start gap-4 items-center">
              <BiArrowBack /> Go back
            </div>
          </Link>
          <h1 className="text-center text-2xl">Auction for {auction?.parentNFT.title} # {auction?.parentNFT.tokenId}</h1>
          {auction ?
            <Auction auction={auction} endTimestampEstimate={endTimestampEstimate} />
            : <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default Page;
