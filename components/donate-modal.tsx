import { USDC_ADDRESS, chain } from "@/lib/constants";
import { depositToCampaign } from "@/lib/contracts/papaBase-contract";
import { useSmartAccount } from "@/lib/hooks/smart-account-context";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Skeleton,
  Button,
  Input,
} from "@nextui-org/react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";

export default function DonateModal({
  isOpen,
  onOpenChange,
  campaignId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: number;
}) {
  const [balance, setBalance] = useState<number>(0);
  const { user } = usePrivy();
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const res = useSmartAccount();
  const { wallets } = useWallets();

  console.log(wallets);

  useEffect(() => {
    if (isOpen && user) {
      fetchBalance();
    }
  }, [isOpen, user]);

  const fetchBalance = async () => {
    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });

    const balance = await publicClient.readContract({
      address: USDC_ADDRESS,
      functionName: "balanceOf",
      args: [user?.wallet?.address],
      abi: [
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              name: "balance",
              type: "uint256",
            },
          ],
          payable: false,
          type: "function",
        },
      ],
    });
    setBalance(Number(balance as bigint) / 10 ** 6);
  };

  const donate = async () => {
    const wallet = wallets[0];
    if (wallet) {
      const walletClient = createWalletClient({
        chain: chain,
        transport: custom(await wallet.getEthereumProvider()),
      });

      //   await approveContract(
      //     walletClient,
      //     USDC_ADDRESS,
      //     user?.wallet?.address!,
      //     PAPABASE_ADDRESS,
      //     BigInt(amount * 10 ** 6)
      //   );

      await depositToCampaign(
        walletClient,
        user?.wallet?.address!,
        1,
        BigInt(amount * 10 ** 6)
      );
    }
  };

  return (
    <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Donate</ModalHeader>
            <ModalBody>
              {loading && <Skeleton className="w-[100px] h-6" />}
              {!loading && (
                <>
                  <Input
                    label="Amount"
                    type="number"
                    min={0}
                    value={amount.toString()}
                    onValueChange={(val: string) => setAmount(parseInt(val))}
                  />
                  <p className="text-xs">
                    <span className="font-bold">USDC</span> balance is: $
                    {balance.toFixed(2)}
                  </p>
                </>
              )}
              {/* <CoinbaseButton
                destinationWalletAddress={user?.wallet?.address!}
              /> */}
            </ModalBody>
            <ModalFooter>
              {!loading && (
                <>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => donate()}
                    isDisabled={!amount || balance < amount}
                  >
                    Donate
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
