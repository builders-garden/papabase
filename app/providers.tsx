"use client";

import { ModalProvider } from "@particle-network/connect-react-ui";
import { Base, BaseSepolia } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connect";
import { WalletEntryPosition } from "@particle-network/auth";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalProvider
      options={{
        projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
        clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string,
        appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string,
        chains: [Base, BaseSepolia],
        particleWalletEntry: {
          displayWalletEntry: true,
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains: [Base, BaseSepolia],
          customStyle: {},
        },
        securityAccount: {
          promptSettingWhenSign: 1,
          promptMasterPasswordSettingWhenLogin: 1,
        },
        wallets: evmWallets({
          projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
          showQrModal: false,
        }),
      }}
      theme={"auto"}
      language={"en"}
      walletSort={["Particle Auth", "Wallet"]}
      particleAuthSort={["email", "phone", "google", "apple", "facebook"]}
    >
      <NextUIProvider>
        <SessionProvider>{children}</SessionProvider>
      </NextUIProvider>
    </ModalProvider>
  );
}
