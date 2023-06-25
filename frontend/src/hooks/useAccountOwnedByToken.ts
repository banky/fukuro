import { TokenboundClient } from "@tokenbound/sdk";
import { useChainId } from "wagmi";

export const useAccountOwnedByToken = (
  tokenAddress: string,
  tokenId: string
) => {
  const chainId = useChainId();
  const tokenboundClient = new TokenboundClient({ chainId });

  const tokenBoundAccount = tokenboundClient.getAccount({
    tokenContract: tokenAddress,
    tokenId: tokenId,
  });

  return tokenBoundAccount;
};
