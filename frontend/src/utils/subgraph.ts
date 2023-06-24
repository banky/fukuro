import { getNFTContractDetails } from "./alchemy";

const LOOTBOX_IMAGE =
  "https://ipfs.io/ipfs/bafkreidlo5abmaabh36cxbt6o2i2jffdzq2ft2iwhsepheeh64hzlbuc3q";

export type Token = {
  title: string;
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
  const ownedTokens = response.owners[0].ownedTokens;

  return Promise.all(
    ownedTokens.map(async (token: any) => {
      const [contract, tokenId] = token.id.split(":");
      let tokenUri = "";
      if (tokenUri.startsWith("ipfs://")) {
        tokenUri = ipfsUrlToGatewayUrl(tokenUri);
      } else if (tokenUri.length === 0) {
        tokenUri = LOOTBOX_IMAGE;
      } else {
        tokenUri = token.uri;
      }

      const contractDetails = await getNFTContractDetails(contract, chainId);
      const title = contractDetails.name;

      return {
        title,
        contract,
        tokenId: parseInt(tokenId),
        imageUrl: tokenUri,
      };
    })
  );
};

const ipfsUrlToGatewayUrl = (url: string): string => {
  const urlObj = new URL(url);
  return `https://ipfs.io/ipfs/${urlObj.host}`;
};
