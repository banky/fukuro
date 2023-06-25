"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { usePathname } from "next/navigation";
import { useAccountOwnedByToken } from "../../../hooks/useAccountOwnedByToken";
import {
  useAccount,
  useBlockNumber,
  useChainId,
  useContractWrite,
} from "wagmi";
import { fetchERC721Balances } from "../../../utils/alchemy";
import { Token } from "../../../utils/subgraph";
import { SiOpensea } from "react-icons/si";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { OPENSEA_URL } from "../../../utils/constants";
import { Input } from "../../../components/Input";
import AuctionFactory from "../../../../abi/AuctionFactory.json";

const NUM_BLOCKS_IN_A_DAY = (24 * 60 * 60) / 12;

export function Page() {
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
  }, [accountOwnedByToken, address, chainId]);

  // const tokenAddressAndId = router.query.tokenAddressAndId as string;
  // const [tokenAddress, id] = tokenAddressAndId.split(":");
  // console.log({ tokenAddress, id });

  const [minBidIncrement, setMinBidIncrement] = useState(0);
  const [bidDuration, setBidDuration] = useState(0); // In days

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    address: "0xb16916Fc4c5bCb989b9e2c1e73Ed56b74003dbE2",
    abi: AuctionFactory.abi,
    functionName: "createAuction",
  });
  const { refetch: refetchBlockNumber } = useBlockNumber();

  const startAuction = async () => {
    const blockNumberResult = await refetchBlockNumber();
    // if it's not available, use a bigg number lol
    const blockNumber = blockNumberResult.data ?? BigInt(10000000);

    // Block buffer for processing
    const startBlock = blockNumber + BigInt(10);
    const endBlock = startBlock + BigInt(bidDuration * NUM_BLOCKS_IN_A_DAY);

    await writeAsync({
      args: [minBidIncrement, startBlock, endBlock, accountOwnedByToken],
    });
  };

  return (
    <div className=" min-h-screen">
      <div className="flex flex-col justify-between">
        <div>
          <Link href="/sell">
            <div className="flex justify-start gap-4 items-center">
              <BiArrowBack /> Go back
            </div>
          </Link>
          <h1 className="text-center text-2xl">
            Artifacts owned by Tokenbound Account
          </h1>
          <div className="grid grid-cols-4 mt-8 gap-4 max-w-4xl mx-auto">
            {ownedTokens.length > 0 &&
              ownedTokens.map((token) => {
                return <ChildERC721 key={`${token.tokenId}`} token={token} />;
              })}
          </div>
          {ownedTokens.length === 0 && (
            <>
              <div className="text-center text-xl mb-10">
                This tokenbound compound account does not own any artifacts
              </div>
            </>
          )}
        </div>
        {ownedTokens.length > 0 && (
          <div className="my-8 flex flex-col gap-4 w-fit mx-auto">
            <Input
              value={minBidIncrement || ""}
              onChange={(e) => setMinBidIncrement(Number(e.target.value))}
              placeholder="69420"
              label="Minimum bid increment (in wei)"
              type="number"
            />
            <Input
              value={bidDuration || ""}
              onChange={(e) => setBidDuration(Number(e.target.value))}
              type="number"
              placeholder="1"
              label="Auction duration in days"
            />
            <Button onClick={() => startAuction()}>Start auction</Button>
          </div>
        )}
      </div>
    </div>
  );
}

const ChildERC721 = ({ token }: { token: Token }) => {
  const {
    imageUrl,
    title,
    tokenId,
    description,
    contract: tokenAddress,
  } = token;
  return (
    <div className="bg-gray-950 opacity-60 p-4 rounded-xl">
      <div className="mb-4">
        <h1 className="text-lg">
          {title} #{tokenId}
        </h1>
      </div>
      <div className="flex mb-4">
        <Image src={imageUrl} width={500} height={500} alt="" />
      </div>
      <div className="flex justify-center">
        <Link
          href={`${OPENSEA_URL}/${tokenAddress}/${tokenId}`}
          target="_blank"
        >
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
