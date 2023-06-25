
import Image from "next/image";
import { Token } from "../utils/subgraph";
import { OPENSEA_URL } from "../utils/constants";
import Link from "next/link";
import { SiOpensea } from "react-icons/si";


export const NFT = ({ token }: { token: Token }) => {
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