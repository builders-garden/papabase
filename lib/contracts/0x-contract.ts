import { baseStyles } from '@nextui-org/react'
import { createWalletClient, custom, http } from 'viem'
import { base } from 'viem/chains'
 
const client = createWalletClient({
  chain: base,
  transport: http(),
})

// function to swap tokens using 0xApi result
export const swapTokens = async (data: string, contractAddress: string, account: string) => {
  const hash = await client.sendTransaction({
    data: data as `0x${string}`, 
    account: account as `0x${string}`,
    to: contractAddress as `0x${string}`,
    value: BigInt(0)
  })
}