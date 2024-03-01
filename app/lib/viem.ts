import { chain } from "@/lib/constants";
import { createWalletClient, custom } from "viem";

export const getViemClient = (provider: any) => {
  if (!provider) return null;
  return createWalletClient({
    chain: chain,
    transport: custom(provider),
  });
};
