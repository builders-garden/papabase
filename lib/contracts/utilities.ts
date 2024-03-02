import { WalletClient, erc20Abi } from "viem";
import { chain } from "../constants";

// function to approve the contract
export const approveContract = async (
  client: WalletClient,
  contractAddress: string,
  account: string,
  spender: string,
  amount: bigint
) => {
  return await client.writeContract({
    address: contractAddress as `0x${string}`,
    functionName: "approve",
    args: [spender as `0x${string}`, amount],
    abi: erc20Abi,
    account: account as `0x${string}`,
    chain: chain,
  });
};
