"use client";

import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  // Pre finalist demo
  uri: "https://api.studio.thegraph.com/query/48907/fukuro-demo/version/latest",
  // uri:
  //   "https://api.studio.thegraph.com/query/48907/fukuro-finalist/version/latest",
  cache: new InMemoryCache(),
});

import { config } from "../wagmi";
import { AuctionsProvider } from "../contexts/AuctionsProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <ApolloProvider client={client}>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <AuctionsProvider>{mounted && children}</AuctionsProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}
