export enum Chain {
  ETHEREUM_MAINNET = "",
  ETHEREUM_SEPOLIA = "sepolia",
  BASE = "base",
}

export enum Token {
  WETH = "WETH",
  DAI = "DAI",
  USDC = "USDC",
  USDT = "USDT",
}

export enum TokenAddress {
  WETH = "0x4200000000000000000000000000000000000006",
  DAI = "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
  USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7",
}

export const getTokenAddress = (token: Token) => {
  switch (token) {
    case Token.WETH:
      return TokenAddress.WETH;
    case Token.DAI:
      return TokenAddress.DAI;
    case Token.USDC:
      return TokenAddress.USDC;
    case Token.USDT:
      return TokenAddress.USDT;
  }
};

const API_URL = (chain: Chain) =>
  `https://${chain === Chain.ETHEREUM_MAINNET ? "" : chain + "."}api.0x.org`;

interface Quote {
  to: string;
  data: string;
  allowanceTarget: string;
  sellTokenAddress: string;
  buyTokenAddress: string;
  value: string;
  gasPrice: string;
  gas: number;
}

export const getSwapQuote = async (
  sellToken: Token,
  buyToken: Token,
  sellAmountWei: number,
  chain: Chain = Chain.BASE
): Promise<Quote> => {
  const response = await fetch(
    `${API_URL(chain)}/swap/v1/quote?sellToken=${getTokenAddress(
      sellToken
    )}&buyToken=${getTokenAddress(buyToken)}&sellAmount=${sellAmountWei}`,
    {
      headers: {
        "0x-api-key": process.env.ZERO_X_API_KEY!,
      },
    }
  );
  return await response.json();
};
