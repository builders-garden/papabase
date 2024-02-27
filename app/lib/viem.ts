import { createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";

export const getViemClient = (provider: any) => {
  if (!provider) return null;
  return createWalletClient({
    chain: baseSepolia,
    transport: custom(provider),
  });
};
