import { createWalletClient, custom } from "viem";
import { base } from "viem/chains";

export const getViemClient = (provider: any) => {
  if (!provider) return null;
  return createWalletClient({
    chain: base,
    transport: custom(provider),
  });
};
