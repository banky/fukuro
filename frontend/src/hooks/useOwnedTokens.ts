import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { Token, parseOwnedTokensResponse } from "../utils/subgraph";

const GET_OWNED_TOKENS = gql`
  query GetOwnedTokens($id: ID!) {
    owners(where: { id: $id }) {
      ownedTokens {
        id
        uri
      }
      balance
    }
  }
`;

export const useOwnedTokens = () => {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const chainId = useChainId();

  const { loading: gqlFetchLoading, error, data } = useQuery(GET_OWNED_TOKENS, {
    variables: { id: address?.toLowerCase() },
    onCompleted: async (data) => {
      const parsedTokens = await parseOwnedTokensResponse(data, chainId);
      setTokens(parsedTokens);
    },
  });

  return { loading, error, tokens };
};
