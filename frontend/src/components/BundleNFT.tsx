import Link from "next/link";
import { OPENSEA_URL } from "../utils/constants";
import { SiOpensea } from "react-icons/si";

type TokenCardProps = {
    imageUrl: string;
    title: string;
    description: string;
    tokenId: number;
    tokenAddress: string;
  };
export const TokenCard = ({
    imageUrl,
    title,
    description,
    tokenId,
    tokenAddress,
  }: TokenCardProps) => {
    return (
      <>
        <div className="rounded-lg overflow-hidden border-white border-2 max-w-[300px]">
          <Link
            href={`/buy/${tokenAddress}:${tokenId}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="" width={300} height={300} />
            <div className="flex flex-col px-4 py-2">
              <h1 className="text-lg">{title} #{tokenId}</h1>
              <p>{description}</p>
            </div>
  
          </Link>
          <div className="flex justify-center mb-4">
            <Link
              href={`${OPENSEA_URL}/${tokenAddress}/${tokenId}`}
              target="_blank"
            >
              <SiOpensea />
            </Link>
          </div>
        </div>
  
      </>
  
    );
  };