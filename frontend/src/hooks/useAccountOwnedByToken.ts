import { getCreationCode } from "@tokenbound/sdk";
import { useChainId } from "wagmi";
import { ERC6551_REGISTRY_ADDRESS, FUKURO_ADDRESS } from "../utils/constants";
import { getContractAddress, pad } from "viem";

export const useAccountOwnedByToken = (
  tokenAddress: string,
  tokenId: string
) => {
  const chainId = useChainId();

  /**
   * Sorry tokenbound, I'd love to use your SDK, but there's no way to get the 
   * right owned address if we use a custom address implementation contract
   */

  const code = getCreationCode(
    FUKURO_ADDRESS,
    chainId,
    tokenAddress,
    tokenId,
    "0"
  );
  const bigIntZero = BigInt("0").toString(16) as `0x${string}`
  const saltHex = pad(bigIntZero, { size: 32 })
  const tokenBoundAccount = getContractAddress({
    bytecode: code,
    from: ERC6551_REGISTRY_ADDRESS,
    opcode: 'CREATE2',
    salt: saltHex,});

  return tokenBoundAccount;
};
