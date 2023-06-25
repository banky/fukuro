"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { usePathname } from "next/navigation";
import { useAccountOwnedByToken } from "../../../hooks/useAccountOwnedByToken";
import { useAccount, useChainId } from "wagmi";
import { fetchERC721Balances } from "../../../utils/alchemy";
import { Token } from "../../../utils/subgraph";

export function Page() {
  const token = {
    imageUrl: "https://picsum.photos/500/500",
    title: "Bundles",
    tokenAddress: "0x123",
    tokenId: 1,
  };
  const pathName = usePathname();
  const tokenAddressAndId = pathName.replace("/sell/", "");
  const [tokenAddress, tokenId] = tokenAddressAndId.split(":");

  const accountOwnedByToken = useAccountOwnedByToken(tokenAddress, tokenId);

  const { address } = useAccount();
  const chainId = useChainId();

  const [ownedTokens, setOwnedTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchBalances = async () => {
      // const erc20Balances = await fetchERC20Balances(address, chainId);
      const erc721Balances = await fetchERC721Balances(
        accountOwnedByToken,
        chainId
      );

      const tokens: Token[] = erc721Balances.ownedNfts.map((nft) => {
        return {
          title: nft.title,
          description: nft.description,
          contract: nft.contract.address,
          imageUrl: nft.media[0].gateway,
          tokenId: Number(nft.tokenId),
        };
      });

      setOwnedTokens(tokens);
    };

    fetchBalances();
  }, [address, chainId]);

  console.log("ownedTokens", ownedTokens);

  // const tokenAddressAndId = router.query.tokenAddressAndId as string;
  // const [tokenAddress, id] = tokenAddressAndId.split(":");
  // console.log({ tokenAddress, id });

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
          {ownedTokens.map((ownedToken) => {
            return (
              <ChildERC721
                key={`${ownedToken.contract}:${ownedToken.tokenId}`}
                token={ownedToken}
              />
            );
          })}
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

const ChildERC721 = ({ token }: { token: Token }) => {
  const { imageUrl, title, tokenId, description } = token;
  return (
    <div className="bg-purple-950 opacity-60  rounded-xl">
      <div className="flex">
        <Image src={imageUrl} width={50} height={50} alt="" />
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
