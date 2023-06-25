"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { usePathname } from "next/navigation";
import { useAccountOwnedByToken } from "../../../hooks/useAccountOwnedByToken";
import { useAccount, useChainId } from "wagmi";
import { fetchERC721Balances } from "../../../utils/alchemy";
import { Token } from "../../../utils/subgraph";
import { SiOpensea } from "react-icons/si";
import { BiArrowBack } from 'react-icons/bi'
import Link from "next/link";
import { OPENSEA_URL } from "../../../utils/constants";
import { Auction } from "../../../components/Auction";
import { NFTList } from "../../../components/NFTList";

const MOCK_AUCTION_DATA = {
  state: 'active',
  highestBid: 400,
  highestBidder: '0x123',
}

export function Page() {
  const pathName = usePathname();
  const auctionAddress = pathName.replace("/buy/", "");

  const { address } = useAccount();
  const chainId = useChainId();

  const [minBid, setMinBid] = useState(0);
  const startAuction = async () => { };

  return (
    <div className=" min-h-screen">
      <div className="flex flex-col justify-between">
        <div>
          <Link href="/buy">
            <div className="flex justify-start gap-4 items-center">
              <BiArrowBack /> Go back
            </div>
          </Link>
          <h1 className="text-center text-2xl">
            Auction for {auctionAddress}
          </h1>
          <NFTList />
          <Auction auction={MOCK_AUCTION_DATA} />

        </div>

      </div>
    </div>
  );
}

export default Page;
