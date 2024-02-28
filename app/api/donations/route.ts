import {
  createDonation,
  getDonationsByCampaignId,
  getDonationsByUserId,
} from "@/lib/db/donation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { userId, campaignId, amount, txHash } = await req.json();

  if (!userId || !campaignId || !amount || !txHash) {
    return new NextResponse("Missing required fields", {
      status: 422,
    });
  }

  const donation = await createDonation({
    userId,
    campaignId,
    amount,
    txHash,
  });
  return NextResponse.json(donation, {
    status: 201,
  });
};

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  // TODO: Replace with the user ID from the session
  const userId = 10;
  const donations = await getDonationsByUserId(userId);
  return NextResponse.json(donations);
};
