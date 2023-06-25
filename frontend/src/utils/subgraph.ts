import { getNFTContractDetails } from "./alchemy";

const LOOTBOX_IMAGE =
  "https://ipfs.io/ipfs/bafkreidlo5abmaabh36cxbt6o2i2jffdzq2ft2iwhsepheeh64hzlbuc3q";

export type Token = {
  title: string;
  description: string;
  contract: string;
  tokenId: number;
  imageUrl: string;
};

export const parseOwnedTokensResponse = async (
  response: any | undefined,
  chainId: number
): Promise<Token[]> => {
  if (!response) {
    return [];
  }
  if (response.owners.length === 0) {
    return [];
  }
  const ownedTokens = response.owners[0].ownedTokens;

  return Promise.all(
    ownedTokens.map(async (token: any) => {
      const [contract, tokenId] = token.id.split(":");
      const tokenUri = ipfsUrlToGatewayUrl(token.uri ?? "");

      const nftDetails = await fetch(tokenUri);
      const nftJson = await nftDetails.json();
      const { name, description, image } = nftJson;

      return {
        title: name,
        description: description,
        contract,
        tokenId: parseInt(tokenId),
        imageUrl: ipfsUrlToGatewayUrl(image),
      };
    })
  );
};

const ipfsUrlToGatewayUrl = (url: string): string => {
  const hash = url.replace("ipfs://", "");
  return `https://ipfs.io/ipfs/${hash}`;
};
