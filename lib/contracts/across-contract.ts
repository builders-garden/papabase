import { ACROSS_V3_ABI } from "./abi";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { ACROSS_ADDRESS_POLYGON } from "../constants";
const client = createWalletClient({
  chain: base,
  transport: http(),
});

// function to bridge tokens using Across api result
export const bridgeTokens = async (
  account: string,
  depositor: string,
  recipient: string,
  inputToken: string,
  outputToken: string,
  inputAmount: bigint,
  outputAmount: bigint,
  destinationChainId: number,
  exclusiveRelayer: string,
  quoteTimestamp: number,
  fillDeadline: number,
  exclusivityDeadline: number,
  campaignId: number
) => {
  // get the message parameters by encoding campaignId and address user
  const message = encodeAbiParameters(parseAbiParameters("uint256, address"), [
    BigInt(campaignId),
    account as `0x${string}`,
  ]);
  const bridge = await client.writeContract({
    address: ACROSS_ADDRESS_POLYGON as `0x${string}`,
    functionName: "depositV3",
    args: [
      depositor,
      recipient,
      inputToken,
      outputToken,
      inputAmount,
      outputAmount,
      destinationChainId,
      exclusiveRelayer,
      quoteTimestamp,
      fillDeadline,
      exclusivityDeadline,
      message,
    ],
    abi: ACROSS_V3_ABI,
    account: account as `0x${string}`,
  });
};
