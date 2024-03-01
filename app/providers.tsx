"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { SmartAccountProvider } from "@/lib/hooks/smart-account-context";
import { useRouter } from "next/navigation";
import { PrivyProvider } from "@privy-io/react-auth";
import { base } from "viem/chains";

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
        defaultChain: base,
      }}
    >
      <SmartAccountProvider>
        <NextUIProvider>
          <SessionProvider>{children}</SessionProvider>
        </NextUIProvider>
      </SmartAccountProvider>
    </PrivyProvider>
  );
}
