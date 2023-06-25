"use client";

import Image from "next/image";
import { ethers } from "ethers";
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
import { Auction, hydrateAuction } from "../../../components/Auction";
import { NFTList } from "../../../components/NFTList";
import { AuctionsContext } from "../../../contexts/AuctionsContext";
import { fetchBlockNumber } from "wagmi/actions";
import { HydratedAuction } from "../../../hooks/useAuctions";

function Page() {
  const { activeAuctions, inactiveAuctions, loading } = useContext(
    AuctionsContext
  );
  const pathName = usePathname();
  const auctionAddress = pathName.replace("/buy/", "");

  const auction = useMemo(
    () =>
      [...activeAuctions, ...inactiveAuctions].find(
        (auction) => auction.auctionAddress === auctionAddress
      ),
    [activeAuctions, inactiveAuctions, auctionAddress]
  );
  const [startTimestampEstimate, setStartTimestampEstimate] = useState(
    BigInt(0)
  );
  const [endTimestampEstimate, setEndTimestampEstimate] = useState(BigInt(0));

  useEffect(() => {
    if (!auction) {
      return;
    }
    const getAuctionData = async () => {
      const block = await fetchBlockNumber();
      if (block < auction.startBlock) {
        setStartTimestampEstimate(
          BigInt(Date.now()) +
            (BigInt(auction.startBlock) - block) * BigInt(12) * BigInt(1000)
        );
      }
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_GOERLI_RPC_URL
      );
      const startTimestamp = Number(
        (await provider.getBlock(Number(auction.startBlock))).timestamp
      );
      const blockDiff = auction.endBlock - auction.startBlock;
      setStartTimestampEstimate(BigInt(startTimestamp) * BigInt(1000));
      setEndTimestampEstimate(
        BigInt(blockDiff) * BigInt(12) * BigInt(1000) +
          BigInt(startTimestamp) * BigInt(1000)
      );
    };
    if (!loading) {
      getAuctionData();
    }
  }, [setEndTimestampEstimate, auction, loading]);

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
          {loading ? (
            "Loading..."
          ) : (
            <Auction
              auction={auction as HydratedAuction}
              startTimestampEstimate={startTimestampEstimate}
              endTimestampEstimate={endTimestampEstimate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
