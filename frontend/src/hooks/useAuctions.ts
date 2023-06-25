import Link from "next/link";
import {
  AFROPOLITAN_ADDRESS,
  AUCTION_FACTORY,
  BLOCK_EXPLORER_URL,
} from "../utils/constants";
import { GoCodescan } from "react-icons/go";
import { ethers } from "ethers";
import { Button } from "../components/Button";
import { useContractRead } from "wagmi";
import AuctionFactory from "../data/AuctionFactory.json";
import Auction from "../data/Auction.json";
import Fukuro from "../data/Fukuro.json";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { getTokenDetails } from "../utils/alchemy";
import { AlchemyProvider, Nft } from "alchemy-sdk";
import { fetchBlockNumber } from "wagmi/actions";
import { configureChains, mainnet } from "@wagmi/core";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { goerli } from "viem/chains";
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: "kG8PHNH-b9rteRpEk5g2Qz7KABaHF6g5" })]
);

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

const hydrateAuction = async (auctionAddress: string) => {
  const startBlock = await readContract({
    address: auctionAddress as any,
    abi: Auction.abi,
    functionName: "startBlock",
    chainId: 5,
  });
  const endBlock = await readContract({
    address: auctionAddress as any,
    abi: Auction.abi,
    functionName: "endBlock",
    chainId: 5,
  });
  const bidIncrement = await readContract({
    address: auctionAddress as any,
    abi: Auction.abi,
    functionName: "bidIncrement",
    chainId: 5,
  });

  // const canceled = await readContract({
  //   address: auctionAddress as any,
  //   abi: Auction.abi,
  //   functionName: 'canceled',
  //   chainId: 5,
  // })
  // const finalized = await readContract({
  //   address: auctionAddress as any,
  //   abi: Auction.abi,
  //   functionName: 'finalized',
  //   chainId: 5,
  // })
  const highestBindingBid = await readContract({
    address: auctionAddress as any,
    abi: Auction.abi,
    functionName: "highestBindingBid",
    chainId: 5,
  });
  const highestBid = await readContract({
    address: auctionAddress as any,
    abi: Auction.abi,
    functionName: "getHighestBid",
    chainId: 5,
  });
  const highestBidder = await readContract({
    address: auctionAddress as any,
    abi: Auction.abi,
    functionName: "highestBidder",
    chainId: 5,
  });
  const tokenboundContract = await readContract({
    address: auctionAddress as any,
    abi: Auction.abi,
    functionName: "tokenboundContract",
    chainId: 5,
  });

  const parent = await readContract({
    address: tokenboundContract as any,
    abi: Fukuro.abi,
    functionName: "token",
    chainId: 5,
  });

  const [chainId, parentContract, tokenId] = parent as any[];
  console.log(
    "~~~~~ tokenbound and parent",
    tokenboundContract,
    parent,
    chainId,
    parentContract,
    tokenId
  );

  const parentNFT = await getTokenDetails(
    parentContract,
    parseInt(tokenId),
    parseInt(chainId)
  );
  console.log("~~~~~ nftData", parentNFT);

  return {
    auctionAddress,
    startBlock,
    endBlock,
    bidIncrement,
    //   canceled,
    //   finalized,
    highestBindingBid,
    highestBidder,
    highestBid,
    parentNFT,
  };
};

export const useAuctions = () => {
  const [loadingAuctions, setLoadingAuctions] = useState<boolean>(true);
  const [hydratedAuctions, setHydratedAuctions] = useState<HydratedAuction[]>(
    []
  );
  const [activeAuctions, setActiveAuctions] = useState<HydratedAuction[]>([]);
  const [inactiveAuctions, setInactiveAuctions] = useState<HydratedAuction[]>(
    []
  );
  const { data: auctionAddresses, isError, isLoading } = useContractRead({
    address: AUCTION_FACTORY,
    abi: AuctionFactory.abi,
    functionName: "getAuctions",
  });

  useEffect(() => {
    const fetchAuctions = async () => {
      const _hydratedAuctions = await Promise.all(
        (auctionAddresses as any[]).map(async (auctionAddress: string) => {
          console.log("map");
          return await hydrateAuction(auctionAddress);
        })
      );
      setHydratedAuctions(_hydratedAuctions as HydratedAuction[]);
      console.log("hydratedAuctions", _hydratedAuctions);
    };

    fetchAuctions();
  }, [auctionAddresses]);

  useEffect(() => {
    const fetchAuctions = async () => {
      if (hydratedAuctions.length === 0) return;
      const block = await fetchBlockNumber();
      console.log({ block });
      const _activeAuctions = hydratedAuctions.filter(
        (auction) =>
          !auction.canceled &&
          !auction.finalized &&
          auction.startBlock <= block &&
          auction.endBlock > block
      );
      const _inactiveActions = hydratedAuctions.filter(
        (auction) =>
          auction.canceled ||
          auction.finalized ||
          auction.endBlock <= block ||
          auction.startBlock > block
      );

      setActiveAuctions(_activeAuctions);
      setInactiveAuctions(_inactiveActions);
      setLoadingAuctions(false);
    };
    fetchAuctions();
  }, [hydratedAuctions]);

  return {
    activeAuctions,
    inactiveAuctions,
    loading: loadingAuctions,
  };
};
