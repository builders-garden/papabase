"use client";
import { Button, Link } from "@nextui-org/react";
import { ConnectButton } from "@particle-network/connect-react-ui";
import { sliceAddress } from "../lib/utils";

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between py-2 px-4">
      <Link href="/donate">
        <h1 className="font-clash-display text-primary text-2xl">papabase</h1>
      </Link>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openConnectModal,
          openChainModal,
          accountLoading,
        }) => {
          console.log(account);
          if (account) {
            return (
              <div className="flex flex-row items-center space-x-2">
                <Button as={Link} href="/campaigns/new" color="primary">
                  Create campaign
                </Button>
                <Button
                  color="primary"
                  onClick={() => openAccountModal!()}
                  variant="flat"
                >
                  {sliceAddress(account)}
                </Button>
              </div>
            );
          }
          return (
            <Button color="primary" onPress={() => openConnectModal!()}>
              Connect wallet
            </Button>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
