import { PAPABASE_ABI } from "@/lib/contracts/abi";
import { getCampaignById } from "@/lib/db/campaign";
import { createDonation } from "@/lib/db/donation";
import { getUserByAddress, getUserById } from "@/lib/db/user";
import { createClient } from "@/lib/xmtp/client";
import { sendMessageToGroup } from "@/lib/xmtp/server";
import { decodeEventLog } from "viem";

export interface Log {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  logIndex: string;
  removed: boolean;
  topics: string[];
  transactionHash: string;
  transactionIndex: string;
}

export interface Transaction {
  blockHash: string;
  blockNumber: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  from: string;
  gasUsed: string;
  logs: Log[];
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: string;
  type: string;
}

export const sendMessageInCampaign = async (
  campaignId: number,
  message: string
) => {
  const campaign = await getCampaignById(campaignId);
  if (!campaign) {
    console.error("Failed to find campaign", { campaignId, message });
    return;
  }
  const groupsClient = await createClient("converse.db");
  await sendMessageToGroup(groupsClient, campaign!.xmtpGroupId!, message);
};

export const DONATION_EVENT_TOPIC =
  "0x88602a1e404e11614d9cc5599a9b9121357b044076b3b25f08422975515da061";

export const processDonationEvent = async (event: Log) => {
  const data = decodeEventLog({
    abi: PAPABASE_ABI,
    data: event.data as `0x${string}`,
    topics: [DONATION_EVENT_TOPIC],
  });
  const { campaignId, user: userAddress, depositAmount } = data.args as any;
  console.log(
    `New donation for campaign "${campaignId.toLocaleString()}" of ${parseInt(
      depositAmount.toLocaleString(),
      10
    )} by ${userAddress}!`
  );
  const user = await getUserByAddress(userAddress);
  await createDonation({
    campaignId: parseInt(campaignId.toLocaleString(), 10),
    userId: user?.id!,
    amount: parseInt(depositAmount.toLocaleString(), 10),
    txHash: event.transactionHash,
  });
  await sendMessageInCampaign(
    parseInt(campaignId.toLocaleString(), 10),
    `New donation of ${parseInt(
      campaignId.toLocaleString(),
      10
    )} by ${userAddress}!`
  );
};

export const WITHDRAW_EVENT_TOPIC =
  "0xb2ba37e29f31c433c3ff9d0ea300f4b35ab932611a1da2e1ab9bc29ec43fd5d1";

export const processWithdrawEvent = async (event: Log) => {
  const data = decodeEventLog({
    abi: PAPABASE_ABI,
    data: event.data as `0x${string}`,
    topics: [WITHDRAW_EVENT_TOPIC],
  });
  const { campaignId, withdrawAmount } = data.args as any;
  console.log(
    `New withdraw for campaign "${campaignId.toLocaleString()}" of ${parseInt(
      withdrawAmount.toLocaleString(),
      10
    )}!`
  );
  await sendMessageInCampaign(
    parseInt(campaignId.toLocaleString(), 10),
    `New withdraw of ${parseInt(withdrawAmount.toLocaleString(), 10)}!`
  );
};
