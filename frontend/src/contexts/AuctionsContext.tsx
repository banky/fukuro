import { createContext } from 'react';
import { HydratedAuction } from '../hooks/useAuctions';

export interface AuctionsContextAPI {
    activeAuctions: HydratedAuction[];
    inactiveAuctions: HydratedAuction[];
    loading: boolean;
}

const DEFAULT_CONTEXT = {
    activeAuctions: [],
    inactiveAuctions: [],
    loading: true,
}

export const AuctionsContext = createContext<AuctionsContextAPI>(DEFAULT_CONTEXT);
