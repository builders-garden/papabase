"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { sliceAddress } from "../app/lib/utils";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { authenticated, user, logout, createWallet } = usePrivy();
  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      await fetch("/api/register", { method: "POST" });
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (authenticated && !user?.wallet) {
      createWallet();
    }
  }, [authenticated]);

  return (
    <div className="w-full flex items-center justify-between py-2 px-4">
      <Link href="/donate" isExternal={false}>
        <h1 className="font-clash-display text-primary text-2xl">papabase</h1>
      </Link>
      {authenticated && (
        <div className="flex flex-row items-center space-x-2">
          <Button color="primary" as={Link} href="/campaigns/new">
            <span className="hidden md:block">Create campaign</span>
            <span className="md:hidden">Create</span>
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button color="primary" variant="flat">
                {sliceAddress(user?.wallet?.address || "")}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions">
              {/* <DropdownItem key={"profile"} color={"primary"} className={""}>
                Profile
              </DropdownItem>
              <DropdownItem key={"donations"} color={"primary"} className={""}>
                Donations
              </DropdownItem> */}
              <DropdownItem
                key={"logout"}
                color={"danger"}
                className={"text-danger"}
                onClick={() => {
                  logout();
                  router.push("/donate");
                }}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
      {!authenticated && (
        <Button
          color="primary"
          onPress={() => {
            login();
            router.refresh();
          }}
        >
          Connect wallet
        </Button>
      )}
    </div>
  );
}
