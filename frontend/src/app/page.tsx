"use client";

import { useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { fetchERC20Balances, fetchERC721Balances } from "../utils/alchemy";
import Image from "next/image";

function Page() {
  const { address } = useAccount();
  const chainId = useChainId();

  return (
    <>
      <div className="max-w-4xl min-h-50 mx-auto ">
        <h1 className="text-8xl mt-40 flex flex-wrap w-fit items-center justify-center">
          <div className="my-4">Buy and sell token</div>
          <div className="bg-purple-600 mx-4 my-4 p-4 py-2 rounded-xl">
            {" "}
            bundles{" "}
          </div>
          <div className="my-4"> with ease</div>
        </h1>
        <p className="text-center mt-4 text-2xl">
          The worlds first marketplace that natively supports ERC 6551
          tokenbound accounts. Trade and explore tokenbound accounts with
          unlimited possiblility
        </p>
      </div>

      <div>
        <h1 className="text-4xl mt-32 text-center">Sponsors</h1>
        <div className="grid grid-cols-4 mt-8">
          <SponsorSlot
            imageUrl="https://storage.googleapis.com/ethglobal-api-production/organizations%2Fbmhmf%2Flogo%2F1687364386273_Mask%20group.svg"
            name="Tokenbound"
          />
          <SponsorSlot
            imageUrl="https://cryptologos.cc/logos/the-graph-grt-logo.png?v=025"
            name="The Graph"
          />
          <SponsorSlot
            imageUrl="https://storage.googleapis.com/ethglobal-api-production/organizations%2F536ub%2Fimages%2FWhite%20on%20Gradient%20Square.png"
            name="Polygon"
          />
          <SponsorSlot
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
            name="Metamask / Linea"
          />
        </div>
      </div>
    </>
  );
}

const SponsorSlot = ({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image src={imageUrl} width={200} height={200} alt="" />
      <p>{name}</p>
    </div>
  );
};

export default Page;
