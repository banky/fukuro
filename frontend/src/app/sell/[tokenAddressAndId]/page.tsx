"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { usePathname } from "next/navigation";
import { useAccountOwnedByToken } from "../../../hooks/useAccountOwnedByToken";
import { SiOpensea } from 'react-icons/si'
import Link from "next/link";
import { OPENSEA_URL } from "../../../utils/constants";

export function Page() {
  const tokens = [
    {
      imageUrl: "https://ipfs.io/ipfs/bafybeido3vjv6t2p7ijpdsa3qlpsejksv6js225g7bjt7zv67hfovjgqcq",
      title: "Afropolitan",
      tokenAddress: "0x8E16e15381729fFEeDC4755f2Dcf6F5461f7F389",
      tokenId: 26,
    },
    {
      imageUrl: "https://ipfs.io/ipfs/bafybeid4blrpjudmqu7eborxklbnonoopqmm7opymlpfrgubw5ctt7m2c4",
      title: "Afropolitan",
      tokenAddress: "0x8E16e15381729fFEeDC4755f2Dcf6F5461f7F389",
      tokenId: 27,
    },
    {
      imageUrl: "https://ipfs.io/ipfs/bafybeiaq4xzwux7qw7mbp5jdz3xivac4s4y2uixqj3lzbxeomcyzw4paaq",
      title: "Afropolitan",
      tokenAddress: "0x8E16e15381729fFEeDC4755f2Dcf6F5461f7F389",
      tokenId: 28,
    }
  ];

  const pathName = usePathname();
  const tokenAddressAndId = pathName.replace("/sell/", "");
  const [tokenAddress, tokenId] = tokenAddressAndId.split(":");
  console.log({ tokenAddress, tokenId });

  const accountOwnedByToken = useAccountOwnedByToken(tokenAddress, tokenId);
  console.log({ accountOwnedByToken });

  // const tokenAddressAndId = router.query.tokenAddressAndId as string;
  // const [tokenAddress, id] = tokenAddressAndId.split(":");
  // console.log({ tokenAddress, id });

  const [minBid, setMinBid] = useState(0);
  const startAuction = async () => {

  };

  return (
    <div>
      <h1 className="text-center text-2xl">
        Items in wallet
      </h1>
      <div className="grid grid-cols-4 mt-8 gap-4 max-w-4xl mx-auto">
        {tokens.map((token) => {
          return (
            <ChildERC721
              key={`${token.tokenId}`}
              imageUrl={token.imageUrl}
              title={token.title}
              tokenId={token.tokenId}
              tokenAddress={token.tokenAddress}
            />
          );
        })}
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
  tokenAddress: string;
};
const ChildERC721 = ({ imageUrl, title, tokenId, tokenAddress }: ChildERC721Props) => {
  return (
    <div className="bg-gray-950 opacity-60 p-4 rounded-xl">
      <div className="mb-4">
        <h1 className="text-lg">{title} #{tokenId}</h1>
      </div>
      <div className="flex mb-4">
        <Image src={imageUrl} width={500} height={500} alt="" />
      </div>
      <div className="flex justify-center">
        <Link href={`${OPENSEA_URL}/${tokenAddress}/${tokenId}`} target="_blank">
          <SiOpensea />
        </Link>
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
        <div></div>
      </div>
    </div>
  );
};

export default Page;
