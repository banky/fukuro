"use client";

import { useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { fetchERC20Balances, fetchERC721Balances } from "../utils/alchemy";

export function Page() {
  const { address } = useAccount();
  const chainId = useChainId();
  useEffect(() => {
    const fetchBalances = async () => {
      if (address === undefined) {
        return;
      }
      // const erc20Balances = await fetchERC20Balances(address, chainId);
      const erc721Balances = await fetchERC721Balances(
        "0x1e57CdcbF15551744aee01ab016219E0C03C174b",
        chainId
      );
      console.log("erc721Balances", erc721Balances);
    };

    fetchBalances();
  }, [address, chainId]);

  return (
    <>
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-8xl mt-40 flex flex-wrap w-fit items-center justify-center">
          <div className="my-4">Buy and sell token</div>
          <div className="bg-purple-600 mx-4 my-4 p-4 py-2 rounded-xl">
            {" "}
            bundles{" "}
          </div>
          <div className="my-4"> with ease</div>
        </h1>
        <p className="text-center">
          The worlds first marketplace that natively supports ERC 6551 token
          bound accounts. Cheaply trade accounts with unlimited possiblility
        </p>
      </div>

      <div>
        <h1></h1>
      </div>
    </>
  );
}

export default Page;
