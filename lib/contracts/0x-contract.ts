import { WalletClient } from "viem";
import { chain } from "../constants";

// function to swap tokens using 0xApi result
export const swapTokens = async (
  client: WalletClient,
  data: string,
  contractAddress: string,
  account: string
) => {
  return await client.sendTransaction({
    data: data as `0x${string}`,
    account: account as `0x${string}`,
    to: contractAddress as `0x${string}`,
    value: BigInt(0),
    chain: chain

  });
};