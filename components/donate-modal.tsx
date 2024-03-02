import {
  Token,
  TokenAddress,
  getSwapQuote,
  getTokenAddress,
} from "@/lib/0xapi";
import { PAPABASE_ADDRESS, chain } from "@/lib/constants";
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
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { useSendTransaction, useWriteContract } from "wagmi";

export default function DonateModal({
  isOpen,
  onOpenChange,
  campaignId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  campaignId: number;
}) {
  const tokens = [
    {
      name: Token.USDC,
      address: getTokenAddress(Token.USDC),
    },
    {
      name: Token.DAI,
      address: getTokenAddress(Token.DAI),
    },
    {
      name: Token.WETH,
      address: getTokenAddress(Token.WETH),
    },
  ];
  const [token, setToken] = useState(TokenAddress.USDC);
  const [balance, setBalance] = useState<number>(0);
  const [decimals, setDecimals] = useState<number>(6);
  const { user } = usePrivy();
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const { wallets } = useWallets();

  const { smartAccountAddress, smartAccountClient } = useSmartAccount();
  const { writeContractAsync } = useWriteContract({});
  const [recurring, setRecurring] = useState<boolean>(false);
  const { sendTransactionAsync } = useSendTransaction();

  useEffect(() => {
    if (isOpen && user && token) {
      fetchBalance();
    }
  }, [isOpen, user, token]);

  const fetchBalance = async () => {
    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });

    const balance = await publicClient.readContract({
      address: token as `0x${string}`,
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

    const decimals = await publicClient.readContract({
      address: token as `0x${string}`,
      functionName: "decimals",
      abi: [
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [
            {
              name: "",
              type: "uint8",
            },
          ],
          payable: false,
          type: "function",
        },
      ],
    });
    setBalance(Number(balance as bigint) / 10 ** Number(decimals));
    setDecimals(Number(decimals));
  };

  const donate = async () => {
    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });

    const multiplier = recurring ? 3 : 1;
    const depositAmount = BigInt(amount * multiplier * 10 ** decimals);
    const usdcDepositAmount = BigInt(amount * multiplier * 10 ** 6);

    if (token !== TokenAddress.USDC) {
      const { to, data } = await getSwapQuote(
        token,
        TokenAddress.USDC,
        amount * multiplier * 10 ** 18
      );
      console.log(to, data);

      let approve0xTx: `0x${string}` = "0x";
      if (smartAccountClient) {
        approve0xTx = await smartAccountClient.writeContract({
          chain: chain,
          account: smartAccountAddress!,
          address: token as `0x${string}`,
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
          args: [to, depositAmount],
        });
      } else {
        approve0xTx = await writeContractAsync({
          address: token as `0x${string}`,
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
          args: [to, depositAmount],
        });
      }

      await publicClient.waitForTransactionReceipt({ hash: approve0xTx });

      let tx: `0x${string}` = "0x";

      if (smartAccountClient) {
        tx = await smartAccountClient.sendTransaction({
          chain: chain,
          account: smartAccountAddress!,
          to: to as `0x${string}`,
          data: data as `0x${string}`,
        });
      } else {
        tx = (await sendTransactionAsync({
          to: to as `0x${string}`,
          data: data as `0x${string}`,
        })) as `0x${string}`;
      }

      await publicClient.waitForTransactionReceipt({
        hash: tx as `0x${string}`,
      });
    }

    let txHash: `0x${string}` = "0x";
    if (smartAccountClient) {
      txHash = await smartAccountClient.writeContract({
        chain: chain,
        account: smartAccountAddress!,
        address: TokenAddress.USDC,
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
        args: [PAPABASE_ADDRESS, usdcDepositAmount],
      });
    } else {
      txHash = await writeContractAsync({
        address: TokenAddress.USDC,
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
        args: [PAPABASE_ADDRESS, usdcDepositAmount],
      });
    }

    await publicClient.waitForTransactionReceipt({ hash: txHash });

    let depositTx: `0x${string}` = "0x";
    if (!recurring) {
      if (smartAccountClient) {
        depositTx = await smartAccountClient.writeContract({
          account: smartAccountAddress!,
          chain,
          address: PAPABASE_ADDRESS,
          abi: PAPABASE_ABI,
          functionName: "depositFunds",
          args: [campaignId, usdcDepositAmount],
        });
      } else {
        depositTx = await writeContractAsync({
          address: PAPABASE_ADDRESS,
          abi: PAPABASE_ABI,
          functionName: "depositFunds",
          args: [campaignId, usdcDepositAmount],
        });
      }
    } else {
      const monthInSeconds = 60 * 60 * 24 * 30;
      if (smartAccountClient) {
        depositTx = await smartAccountClient.writeContract({
          account: smartAccountAddress!,
          chain,
          address: PAPABASE_ADDRESS,
          abi: PAPABASE_ABI,
          functionName: "depositFundsRecurring",
          args: [
            user?.wallet?.address,
            campaignId,
            usdcDepositAmount,
            3,
            monthInSeconds,
          ],
        });
      } else {
        depositTx = await writeContractAsync({
          address: PAPABASE_ADDRESS,
          abi: PAPABASE_ABI,
          functionName: "depositFundsRecurring",
          args: [
            user?.wallet?.address,
            campaignId,
            usdcDepositAmount,
            3,
            monthInSeconds,
          ],
        });
      }
    }

    await publicClient.waitForTransactionReceipt({ hash: depositTx });

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
    <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Donate</ModalHeader>
            <ModalBody>
              {loading && <Skeleton className="w-[100px] h-6" />}
              {!loading && (
                <>
                  <Select
                    label="Select token"
                    placeholder="Select a token"
                    selectedKeys={token ? [token] : []}
                    // @ts-ignore
                    onChange={(e) => setToken(e.target.value)}
                  >
                    <SelectItem
                      key={TokenAddress.USDC}
                      value={TokenAddress.USDC}
                    >
                      {Token.USDC}
                    </SelectItem>
                    <SelectItem key={TokenAddress.DAI} value={TokenAddress.DAI}>
                      {Token.DAI}
                    </SelectItem>
                    <SelectItem
                      key={TokenAddress.WETH}
                      value={TokenAddress.WETH}
                    >
                      ETH
                    </SelectItem>
                  </Select>
                  {token && (
                    <>
                      <Input
                        label="Amount"
                        type="number"
                        min={0}
                        value={amount.toString()}
                        onValueChange={(val: string) =>
                          setAmount(parseInt(val))
                        }
                      />
                      <p className="text-xs">
                        <span className="font-bold">
                          {tokens.find((t) => t.address === token)?.name}
                        </span>{" "}
                        balance is: ${balance.toFixed(2)}
                      </p>

                      <Checkbox
                        checked={recurring}
                        onValueChange={(val) => setRecurring(recurring)}
                        color="primary"
                      >
                        Repeat this donation each month for three months
                      </Checkbox>
                    </>
                  )}
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
                    isDisabled={!token || !amount || balance < amount}
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
