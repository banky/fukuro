import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";

const chains = [mainnet, polygon, optimism, arbitrum, goerli];

const walletConnectProjectId = "fd344170c03ad73d6eb7db84d991763d";

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "My wagmi + ConnectKit App",
    walletConnectProjectId,
    chains,
  })
);
