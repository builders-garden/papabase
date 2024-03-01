import { PAPABASE_ABI } from "./abi";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";
import { PAPABASE_BASE_ADDRESS } from "../constants";

const client = createWalletClient({
  chain: base,
  transport: http(),
});

// function to bridge tokens using Across api result
export const createCampaign = async (
  account: string,
  name: string,
  description: string,
  endDate: number
) => {
  const campaign = await client.writeContract({
    address: PAPABASE_BASE_ADDRESS as `0x${string}`,
    functionName: "createCampaign",
    args: [name, description, endDate],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
  });
};

// function to end a campaign
export const endCampaign = async (account: string, campaignId: number) => {
  const campaign = await client.writeContract({
    address: PAPABASE_BASE_ADDRESS as `0x${string}`,
    functionName: "endCampaign",
    args: [campaignId],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
  });
};

// function to make deposit in a campaign
export const depositToCampaign = async (
  account: string,
  campaignId: number,
  amount: bigint
) => {
  const deposit = await client.writeContract({
    address: PAPABASE_BASE_ADDRESS as `0x${string}`,
    functionName: "depositFunds",
    args: [campaignId, amount],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
  });
};

// function to withdraw funds from a campaign
export const withdrawFromCampaign = async (
  account: string,
  campaignId: number,
  amount: bigint
) => {
  const withdraw = await client.writeContract({
    address: PAPABASE_BASE_ADDRESS as `0x${string}`,
    functionName: "campaignWithdrawFunds",
    args: [campaignId, amount],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
  });
};

// function to make recurring deposit in a campaign
export const recurringDepositToCampaign = async (
  account: string,
  campaignId: number,
  recurringAmount: bigint,
  donationTimes: number,
  frequency: number
) => {
  const deposit = await client.writeContract({
    address: PAPABASE_BASE_ADDRESS as `0x${string}`,
    functionName: "depositFundsRecurring",
    args: [account, campaignId, recurringAmount, donationTimes, frequency],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
  });
};

// function to withdraw recurring funds from a campaign
export const recurringWithdrawFromCampaign = async (
  account: string,
  depositId: number
) => {
  const withdraw = await client.writeContract({
    address: PAPABASE_BASE_ADDRESS as `0x${string}`,
    functionName: "withdrawRecurringDeposit",
    args: [depositId],
    abi: PAPABASE_ABI,
    account: account as `0x${string}`,
  });
};
