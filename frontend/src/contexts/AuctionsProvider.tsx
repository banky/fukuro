import { ReactNode } from "react";
import { useAuctions } from "../hooks/useAuctions";
import { AuctionsContext } from "./AuctionsContext";

export const AuctionsProvider = ({ children }: { children: ReactNode }) => {
  const auctionsResponse = useAuctions();
  return (
    <AuctionsContext.Provider value={auctionsResponse}>
      {children}
    </AuctionsContext.Provider>
  );
};
