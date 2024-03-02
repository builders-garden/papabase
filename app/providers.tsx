"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { SmartAccountProvider } from "@/lib/hooks/smart-account-context";
import { useRouter } from "next/navigation";
import { PrivyProvider } from "@privy-io/react-auth";
import { chain } from "@/lib/constants";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base, baseSepolia } from "viem/chains";
import { http } from "wagmi";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [baseSepolia, base],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["wallet", "email", "farcaster"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          noPromptOnSignature: true,
        },
        defaultChain: chain,
      }}
    >
      <SmartAccountProvider>
        <NextUIProvider>
          <SessionProvider>
            <QueryClientProvider client={queryClient}>
              <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
            </QueryClientProvider>
          </SessionProvider>
        </NextUIProvider>
      </SmartAccountProvider>
    </PrivyProvider>
  );
}
