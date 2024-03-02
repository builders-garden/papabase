import { getCampaignsByXMTPGroupId } from "@/lib/db/campaign";
import { createClient } from "@/lib/xmtp/client";
import { addGroupMember, shouldAddGroupMember } from "@/lib/xmtp/server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const { groupLinkId, topic: groupId, walletAddress } = await req.json();

  const groupsClient = await createClient("converse.db");
  console.log(
    `Received a join query for groupId ${groupId} - wallet ${walletAddress}`
  );

  const campaign = await getCampaignsByXMTPGroupId(groupId);

  if (await shouldAddGroupMember(groupId, campaign!.id!, walletAddress)) {
    try {
      await addGroupMember(groupsClient, groupId, walletAddress);
      return NextResponse.json({
        status: "SUCCESS",
      });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: e }, { status: 500 });
    }
  } else {
    return NextResponse.json({
      status: "DENIED",
      reason: "You are not allowed to join this group",
    });
  }
}
