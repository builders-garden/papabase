import { baseStyles } from '@nextui-org/react'
import { createWalletClient, custom, http } from 'viem'
import { base } from 'viem/chains'
 
const client = createWalletClient({
  chain: base,
  transport: http(),
})

// function to approve the contract
export const swap = async (contractAddress: string, account: string, spender: string, amount: bigint ) => {
  await client.writeContract({
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', 
    address: contractAddress as `0x${string}`,
    functionName: 'approve',
    args: [spender as `0x${string}`, amount],
    account: account as `0x${string}`,
  })
}