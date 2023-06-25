import Image from "next/image";
import Link from "next/link";
import { BLOCK_EXPLORER_URL, OPENSEA_URL } from "../../utils/constants";
import { GoCodescan } from 'react-icons/go'

function Page() {
  const auctions = [
    {
      tokenId: 1,
      auctionAddress: "0x123",
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
                key={`${activeAuction.auctionAddress}:${activeAuction.tokenId}`}
                imageUrl={activeAuction.imageUrl}
                title={activeAuction.title}
                auctionAddress={activeAuction.auctionAddress}
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
  auctionAddress: string;
  imageUrl: string;
  title: string;
  startBlock: number;
  endBlock: number;
  bidIncrement: number;
}

const AuctionCard = ({ auctionAddress, title, imageUrl, startBlock, endBlock, bidIncrement }: AuctionProps) => {
  return (
    <Link href={`/buy/${auctionAddress}`}>
      <div className="bg-gray-950 opacity-60 p-4 rounded-xl">
        <div className="mb-4">
          <h1 className="text-lg">
            {title}
          </h1>
        </div>
        <div className="flex mb-4">
          <Image src={imageUrl} width={150} height={150} alt="" />
        </div>
        <div className="flex justify-center">
          <Link
            href={`${BLOCK_EXPLORER_URL}/address/${auctionAddress}`}
            target="_blank"
          >
            <GoCodescan />
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default Page;
