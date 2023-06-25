"use client";

import Link from "next/link";
import { useOwnedTokens } from "../../hooks/useOwnedTokens";

export function Page() {
  const { loading, error, tokens } = useOwnedTokens();

  return (
    <>
      <div className="max-w-4xl min-h-50 mx-auto ">
        <h1 className="text-center text-6xl">
          Select which of your bundles you&apos;d like to sell
        </h1>
        <div className="grid grid-cols-4 mt-8 gap-4 max-w-4xl mx-auto">
          {tokens.map((token) => {
            return (
              <TokenCard
                key={`${token.contract}${token.tokenId}`}
                imageUrl={token.imageUrl}
                title={token.title}
                description={token.description}
                tokenId={token.tokenId}
                tokenAddress={token.contract}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

type TokenCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  tokenId: number;
  tokenAddress: string;
};
const TokenCard = ({
  imageUrl,
  title,
  description,
  tokenId,
  tokenAddress,
}: TokenCardProps) => {
  return (
    <Link
      href={`/sell/${tokenAddress}:${tokenId}`}
      className="rounded-lg overflow-hidden border-white border-2 max-w-[300px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="" width={300} height={300} />
      <div className="flex flex-col px-4 py-2">
        <h1 className="text-lg">{title}</h1>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Page;
