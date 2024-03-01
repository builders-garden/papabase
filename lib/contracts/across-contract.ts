import {ACROSS_V3_ABI} from './abi'

import { createWalletClient, custom, http } from 'viem'
import { base } from 'viem/chains'
 
const client = createWalletClient({
  chain: base,
  transport: http(),
})

// function to bridge tokens using Across api result
export const bridgeTokens = async ( account: string, depositor: string, recipient: string, inputToken: string, outputToken: string, inputAmount: bigint, outputAmount: bigint, destinationChainId: number, exclusiveRelayer: string, quoteTimestamp: number, fillDeadline: number, exclusivityDeadline: number, message: string) => {
    const bridge = await client.writeContract({
      address: "0x9295ee1d8C5b022Be115A2AD3c30C72E34e7F096",
      functionName: 'depositV3',
      args: [depositor, recipient, inputToken, outputToken, inputAmount, outputAmount, destinationChainId, exclusiveRelayer, quoteTimestamp, fillDeadline, exclusivityDeadline, message],
      abi: ACROSS_V3_ABI,
      account: account as `0x${string}`,
    })
}