import Image from "next/image";
import Link from "next/link";
import { OPENSEA_URL } from "../../utils/constants";

function Page() {
  const auctions = [
    {
      tokenId: 1,
      tokenAddress: "0x123",
      imageUrl: "https://ipfs.io/ipfs/bafybeifcetut4fgnlmquws3c2jddt5i72vlculluw3tdyls7qiv2ixquum",
      title: "My first bundle",
      startBlock: 1,
      endBlock: 100,
      bidIncrement: 100000,
    }
  ]

  const activeAuctions = auctions;

  return (
    <>
      <div className="max-w-4xl min-h-50 mx-auto ">
        <h1 className="text-center text-6xl">
          Buy and sell token bundles with ease
        </h1>

        <div className="my-4">
          {activeAuctions.map((activeAuction) => (
            <>
              <AuctionCard
                key={`${activeAuction.tokenAddress}:${activeAuction.tokenId}`}
                imageUrl={activeAuction.imageUrl}
                title={activeAuction.title}
                tokenId={activeAuction.tokenId}
                tokenAddress={activeAuction.tokenAddress}
                startBlock={activeAuction.startBlock}
                endBlock={activeAuction.endBlock}
                bidIncrement={activeAuction.bidIncrement}
              />
            </>))}
        </div>
      </div>
    </>
  );
}

interface AuctionProps {
  tokenId: number;
  tokenAddress: string;
  imageUrl: string;
  title: string;
  startBlock: number;
  endBlock: number;
  bidIncrement: number;
}

const AuctionCard = ({ tokenId, tokenAddress, title, imageUrl, startBlock, endBlock, bidIncrement }: AuctionProps) => {
  return (
    <div className="bg-gray-950 opacity-60 p-4 rounded-xl">
      <div className="mb-4">
        <h1 className="text-lg">
          {title} #{tokenId}
        </h1>
      </div>
      <div className="flex mb-4">
        <Image src={imageUrl} width={150} height={150} alt="" />
      </div>
      <div className="flex justify-center">
        <Link
          href={`${OPENSEA_URL}/${tokenAddress}/${tokenId}`}
          target="_blank"
        >
        </Link>
      </div>
    </div>
  );
};

export default Page;
