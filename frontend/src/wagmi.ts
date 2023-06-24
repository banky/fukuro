import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";

const chains = [mainnet, polygon, optimism, arbitrum, goerli];

const walletConnectProjectId = "E2Tz_Lz5Ydn66IoGgI4fmc52XiGQlzsu";

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "My wagmi + ConnectKit App",
    walletConnectProjectId,
    chains,
  })
);
