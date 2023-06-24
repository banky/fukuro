"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../../../components/Button";

export function Page() {
  const token = {
    imageUrl: "https://picsum.photos/500/500",
    title: "Bundles",
    tokenAddress: "0x123",
    tokenId: 1,
  };

  const [minBid, setMinBid] = useState(0);
  const startAuction = async () => {};

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg">{token.title}</h1>
        <p>#{token.tokenId}</p>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <Image src={token.imageUrl} width={500} height={500} alt="" />
        </div>

        <div className="w-full">
          <h1 className="text-lg">Items in wallet</h1>
        </div>
        <div className=""></div>
      </div>

      <div className="my-8 flex gap-4 w-fit mx-auto">
        <input
          className="text-black px-4 py-2 rounded-md"
          value={minBid || ""}
          onChange={(e) => setMinBid(Number(e.target.value))}
          placeholder="Enter a minimum bid value"
        />
        <Button onClick={() => startAuction()}>Start auction</Button>
      </div>
    </div>
  );
}

type ChildERC721Props = {
  imageUrl: string;
  title: string;
  tokenId: number;
};
const ChildERC721 = ({ imageUrl, title, tokenId }: ChildERC721Props) => {
  return (
    <div className="bg-purple-950 opacity-60  rounded-xl">
      <div className="flex">
        <Image src={imageUrl} width={50} alt="" />
      </div>
    </div>
  );
};

type ChildERC20Props = {
  symbol: string;
  balance: BigInt;
};
const ChildERC20 = ({ symbol, balance }: ChildERC20Props) => {
  return (
    <div className="bg-purple-950 opacity-60  rounded-xl">
      <div className="flex">
        <Image />
      </div>
    </div>
  );
};

export default Page;
