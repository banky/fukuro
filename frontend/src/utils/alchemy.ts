import { Alchemy, Network } from "alchemy-sdk";

const chainIdMap = {
  1: Network.ETH_MAINNET,
  5: Network.ETH_GOERLI,
} as any;

const getAlchemySdk = (chainId: number) => {
  if (chainIdMap[chainId] === undefined) {
    throw new Error("Invalid chainId for alchemy request");
  }

  const config = {
    apiKey: process.env.ALCHEMY_ID,
    network: chainIdMap[chainId],
  };
  const alchemy = new Alchemy(config);
  return alchemy;
};

export const fetchERC20Balances = async (address: string, chainId: number) => {
  const alchemy = getAlchemySdk(chainId);

  const balances = await alchemy.core.getTokenBalances(address);
  return balances;
};

export const fetchERC721Balances = async (address: string, chainId: number) => {
  const alchemy = getAlchemySdk(chainId);

  const balances = await alchemy.nft.getNftsForOwner(address);
  return balances;
};

export const getNFTContractDetails = async (
  address: string,
  chainId: number
) => {
  const alchemy = getAlchemySdk(chainId);

  const contractDetails = await alchemy.nft.getContractMetadata(address);
  return contractDetails;
};
