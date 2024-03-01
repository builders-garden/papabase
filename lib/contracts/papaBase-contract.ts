import { PAPABASE_ABI } from "./abi";
import { WalletClient } from "viem";
import { PAPABASE_ADDRESS, chain } from "../constants";

// function to bridge tokens using Across api result
export const createContractCampaign = async (
  client: WalletClient,
  account: string,
  name: string,
  description: string,
  endDate: number
) => {
  return await client.writeContract({
    address: PAPABASE_ADDRESS as `0x${string}`,
    functionName: "createCampaign",
    args: [name, description, endDate],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
    chain: chain,
  });
};

// function to end a campaign
export const endCampaign = async (
  client: WalletClient,
  account: string,
  campaignId: number
) => {
  const campaign = await client.writeContract({
    address: PAPABASE_ADDRESS as `0x${string}`,
    functionName: "endCampaign",
    args: [campaignId],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
    chain: chain,
  });
};

// function to make deposit in a campaign
export const depositToCampaign = async (
  client: WalletClient,
  account: string,
  campaignId: number,
  amount: bigint
) => {
  return await client.writeContract({
    address: PAPABASE_ADDRESS as `0x${string}`,
    functionName: "depositFunds",
    args: [campaignId, amount],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
    chain: chain,
  });
};

// function to withdraw funds from a campaign
export const withdrawFromCampaign = async (
  client: WalletClient,
  account: string,
  campaignId: number,
  amount: bigint
) => {
  const withdraw = await client.writeContract({
    address: PAPABASE_ADDRESS as `0x${string}`,
    functionName: "campaignWithdrawFunds",
    args: [campaignId, amount],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
    chain: chain,
  });
};

// function to make recurring deposit in a campaign
export const recurringDepositToCampaign = async (
  client: WalletClient,
  account: string,
  campaignId: number,
  recurringAmount: bigint,
  donationTimes: number,
  frequency: number
) => {
  const deposit = await client.writeContract({
    address: PAPABASE_ADDRESS as `0x${string}`,
    functionName: "depositFundsRecurring",
    args: [account, campaignId, recurringAmount, donationTimes, frequency],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
    chain: chain,
  });
};

// function to withdraw recurring funds from a campaign
export const recurringWithdrawFromCampaign = async (
  client: WalletClient,
  account: string,
  depositId: number
) => {
  const withdraw = await client.writeContract({
    address: PAPABASE_ADDRESS as `0x${string}`,
    functionName: "withdrawRecurringDeposit",
    args: [depositId],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
    chain: chain,
  });
};
