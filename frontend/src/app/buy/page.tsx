import Image from "next/image";
import Link from "next/link";
import { AFROPOLITAN_ADDRESS, BLOCK_EXPLORER_URL, OPENSEA_URL } from "../../utils/constants";
import { GoCodescan } from 'react-icons/go'
import { NFTList } from "../../components/NFTList";

function Page() {
  const auctions = [
    {
      tokenId: 26,
      auctionAddress: AFROPOLITAN_ADDRESS,
      imageUrl: "https://ipfs.io/ipfs/bafybeifcetut4fgnlmquws3c2jddt5i72vlculluw3tdyls7qiv2ixquum",
      title: "Auction",
      startBlock: 1,
      endBlock: 100,
      bidIncrement: 100000,
    },
    {
      tokenId: 26,
      auctionAddress: AFROPOLITAN_ADDRESS,
      imageUrl: "https://ipfs.io/ipfs/bafybeid4blrpjudmqu7eborxklbnonoopqmm7opymlpfrgubw5ctt7m2c4",
      title: "Auction",
      startBlock: 1,
      endBlock: 100,
      bidIncrement: 100000,
    },
    {
      tokenId: 26,
      auctionAddress: AFROPOLITAN_ADDRESS,
      imageUrl: "https://ipfs.io/ipfs/bafybeido3vjv6t2p7ijpdsa3qlpsejksv6js225g7bjt7zv67hfovjgqcq",
      title: "Auction",
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
        <div className="grid grid-cols-2 mt-8 mb-4 gap-4 max-w-4xl mx-auto">
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
    <div className="my-2">
      <Link href={`/buy/${auctionAddress}`}>
        <div className="bg-gray-950 opacity-60 p-4 rounded-xl">
          <div className="mb-4">
            <h1 className="text-lg">
              Open: {title}
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="flex mb-4">
              <Image src={imageUrl} width={200} height={200} alt="" />
            </div>
            <div className="text-xl">
              <div>
                Start time: {startBlock}
              </div>
              <br />
              <div>
                End time: {endBlock}
              </div>
              <br />
              <div>
                Bid increment: {bidIncrement}
              </div>
            </div>
          </div>
          <div className="justify-center">
            <Link
              href={`${BLOCK_EXPLORER_URL}/address/${auctionAddress}`}
              target="_blank"
            >
              <div className="flex gap-2 items-center justify-center">
                View on etherscan <GoCodescan />
              </div>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Page;
