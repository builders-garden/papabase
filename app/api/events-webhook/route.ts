import { PAPABASE_ABI } from "@/lib/contracts/abi";
import { NextRequest, NextResponse } from "next/server";
import { decodeEventLog, http } from "viem";
import {
  DONATION_EVENT_TOPIC,
  Transaction,
  WITHDRAW_EVENT_TOPIC,
  processDonationEvent,
  processWithdrawEvent,
  sendMessageInCampaign,
} from "./utils";

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const webhook: Transaction[] = await req.json();
  if (!webhook) {
    return NextResponse.json({ message: "No data" });
  }
  for (let i = 0; i < webhook.length; i++) {
    const donationEvent = webhook[i]?.logs.find(
      (event) =>
        event.topics[0] ===
        // topic for the donation event
        DONATION_EVENT_TOPIC
    );
    const withdrawEvent = webhook[i]?.logs.find(
      (event) =>
        event.topics[0] ===
        // topic for the withdraw event
        WITHDRAW_EVENT_TOPIC
    );

    if (donationEvent) {
      await processDonationEvent(donationEvent);
    }

    if (withdrawEvent) {
      await processWithdrawEvent(withdrawEvent);
    }
  }
  return NextResponse.json({ message: "Ok" });
}
