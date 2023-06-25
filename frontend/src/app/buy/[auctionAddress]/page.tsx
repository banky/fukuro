"use client";

import Image from "next/image";
import {ethers} from 'ethers';
import { useContext, useEffect, useMemo, useState } from "react";
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
import { AuctionsContext } from "../../../contexts/AuctionsContext";

export function Page() {
  const {activeAuctions, loading} = useContext(AuctionsContext);
  const pathName = usePathname();
  const auctionAddress = pathName.replace("/buy/", "");

  const auction = useMemo(()=>activeAuctions.find((auction) => auction.auctionAddress === auctionAddress),[activeAuctions, auctionAddress])
  const [endTimestampEstimate, setEndTimestampEstimate] = useState(0);

  useEffect(() => {
    if (!auction) { return; }
    const getAuctionData = async () => {
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_GOERLI_RPC_URL)
      const startTimestamp = Number((await provider.getBlock("0x3888a1ae5be36e59d878e1d3df0b43050b5e10fa1389ca0760625c46e00128d0")).timestamp);
      const blockDiff = Number(auction.endBlock) - Number(auction.startBlock);
      setEndTimestampEstimate(blockDiff * 12 * 1000 + startTimestamp*1000)
    }
    if (!loading) {
      getAuctionData()
    }
  },[setEndTimestampEstimate, auction, loading])

  const { address } = useAccount();
  const chainId = useChainId();

  const [minBid, setMinBid] = useState(0);
  const startAuction = async () => {};

  return (
    <div className=" min-h-screen">
      <div className="flex flex-col justify-between">
        <div>
          <Link href="/buy">
            <div className="flex justify-start gap-4 items-center">
              <BiArrowBack /> Go back
            </div>
          </Link>
          <h1 className="text-center text-2xl">Auction for {auctionAddress}</h1>
          <NFTList />
          {loading ? "Loading..." : <Auction auction={auction} endTimestampEstimate={endTimestampEstimate}/>}
        </div>
      </div>
    </div>
  );
}

export default Page;
