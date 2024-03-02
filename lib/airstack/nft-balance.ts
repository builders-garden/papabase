import { fetchQuery, init } from "@airstack/node";
import { NftTokenBalanceQuery } from "./types";

init(process.env.AIRSTACK_API_KEY!);

const query = /* GraphQL */ `
  query NFTTokenBalance($owner: Identity!, $token: Address!) {
    TokenBalances(
      input: {
        filter: { owner: { _eq: $owner }, tokenAddress: { _eq: $token } }
        blockchain: base
      }
    ) {
      TokenBalance {
        tokenId
        amount
      }
    }
    Tokens(input: { filter: { address: { _eq: $token } }, blockchain: base }) {
      Token {
        totalSupply
      }
    }
  }
`;

interface QueryResponse {
  data: NftTokenBalanceQuery | null;
  error: Error | null;
}

interface Error {
  message: string;
}

export const fetchNftTokenBalance = async (
  owner: string,
  token: string,
  campaignId: number
): Promise<{ balance: string | number; totalSupply: string | number }> => {
  const { data, error }: QueryResponse = await fetchQuery(query, {
    owner,
    token,
  });
  if (error || !data) {
    throw new Error(`Error fetching token balance: ${error?.message}`);
  }
  const tokenBalances = data.TokenBalances?.TokenBalance?.filter(
    (t) => t.tokenId?.toString() === campaignId.toString()
  );
  return {
    balance: tokenBalances ? tokenBalances[0]?.amount! : 0,
    totalSupply: data.Tokens?.Token ? data.Tokens.Token[0]?.totalSupply! : 0,
  };
};
