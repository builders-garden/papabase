import { chain } from "@/lib/constants";
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
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";

export default function DonateModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [balance, setBalance] = useState<number>(0);
  const { user } = usePrivy();
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

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
      address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
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
    setBalance(Number(balance as bigint));
  };

  const donate = async () => {};

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
                  {/* <CoinbaseButton
                    destinationWalletAddress={user?.wallet?.address!}
                  /> */}
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => {}}>
                    Donate
                  </Button>
                </>
              )}
              {/* <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
