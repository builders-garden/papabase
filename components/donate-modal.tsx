import { PAPABASE_ADDRESS, USDC_ADDRESS, chain } from "@/lib/constants";
import { PAPABASE_ABI } from "@/lib/contracts/abi";
import { useSmartAccount } from "@/lib/hooks/smart-account-context";
import { generateOnRampURL } from "@coinbase/cbpay-js";
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
import { createPublicClient, http } from "viem";
import { useWriteContract } from "wagmi";

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
  const { writeContractAsync, isPending } = useWriteContract();

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
    const tx = await writeContractAsync({
      address: USDC_ADDRESS,
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: "_spender",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          type: "function",
        },
      ],
      functionName: "approve",
      args: [PAPABASE_ADDRESS, BigInt(amount * 10 ** 6)],
    });

    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });

    await publicClient.waitForTransactionReceipt({ hash: tx });

    const depositTx = await writeContractAsync({
      address: PAPABASE_ADDRESS,
      abi: PAPABASE_ABI,
      functionName: "depositFunds",
      args: [campaignId, BigInt(amount * 10 ** 6)],
    });

    await publicClient.waitForTransactionReceipt({ hash: depositTx });

    await fetch("/api/donations", {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        campaignId,
        amount,
        txHash: depositTx,
      }),
    });

    onOpenChange(false);
  };

  const onRamp = () => {
    const onRampURL = generateOnRampURL({
      appId: "4cf9d8ee-7529-40a6-8c8e-7672ec71c3b9",
      destinationWallets: [
        { address: user?.wallet?.address!, assets: ["ETH", "USDC"] },
      ],
    });

    typeof window !== undefined && window.open(onRampURL, "_blank");
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
            </ModalBody>
            <ModalFooter>
              {!loading && (
                <>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => onRamp()}>
                    Buy USDC
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
