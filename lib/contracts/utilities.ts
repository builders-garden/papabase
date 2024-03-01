import { createWalletClient, erc20Abi, http } from 'viem'
import { base } from 'viem/chains'
 
const client = createWalletClient({
  chain: base,
  transport: http(),
})

// function to approve the contract
export const approveContract = async (contractAddress: string, account: string, spender: string, amount: bigint ) => {
  const approve = await client.writeContract({
    address: contractAddress as `0x${string}`,
    functionName: 'approve',
    args: [spender as `0x${string}`, amount],
    abi: erc20Abi,
    account: account as `0x${string}`,
  })
}