const API_URL = "https://api.0x.org";

export enum Token {
  WETH = "WETH",
  DAI = "DAI",
  USDC = "USDC",
  USDT = "USDT",
}

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
  sellAmountWei: number
): Promise<Quote> => {
  const response = await fetch(
    `${API_URL}/swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${sellAmountWei}`,
    {
      headers: {
        "0x-api-key": process.env.ZERO_X_API_KEY!,
      },
    }
  );
  return await response.json();
};
