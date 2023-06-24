import Image from "next/image";
import Link from "next/link";

export function Page() {
  const tokens = [
    {
      imageUrl: "https://picsum.photos/300/300",
      title: "Bundles",
      tokenAddress: "0x123",
      tokenId: 1,
    },
  ];
  return (
    <>
      <h1 className="text-center text-4xl">
        Select which of your tokens you&apos;d like to sell
      </h1>
      <div className="grid grid-cols-4">
        {tokens.map((token) => {
          return (
            <TokenCard
              key={token.imageUrl}
              imageUrl={token.imageUrl}
              title={token.title}
              tokenId={token.tokenId}
              tokenAddress={token.tokenAddress}
            />
          );
        })}
      </div>
    </>
  );
}

type TokenCardProps = {
  imageUrl: string;
  title: string;
  tokenId: number;
  tokenAddress: string;
};
const TokenCard = ({
  imageUrl,
  title,
  tokenId,
  tokenAddress,
}: TokenCardProps) => {
  return (
    <Link
      href={`/sell/${tokenAddress}:${tokenId}`}
      className="rounded-lg overflow-hidden border-white border-2"
    >
      <Image src={imageUrl} alt="" width={300} height={300} />
      <div className="flex flex-col px-4 py-2">
        <h1 className="text-lg">{title}</h1>
        <p>#{tokenId}</p>
      </div>
    </Link>
  );
};

export default Page;
