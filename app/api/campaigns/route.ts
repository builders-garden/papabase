import { NextRequest, NextResponse } from "next/server";
import { createCampaign, getCampaigns } from "@/lib/db/campaign";
import { createClient } from "@/lib/xmtp/client";
import { createGroupLink } from "@/lib/xmtp/server";
import { privy } from "@/app/lib/privy";

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const accessToken = req.cookies.get("privy-token");

  if (!accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const verifiedClaims = await privy.verifyAuthToken(accessToken.value);
    const { userId } = verifiedClaims;

    const {
      id,
      name,
      description,
      recipientAddress,
      githubRepoUrl,
      githubRepoId,
      websiteUrl,
      endDate,
    } = await req.json();

    if (
      !id ||
      !name ||
      !description ||
      !recipientAddress ||
      !githubRepoUrl ||
      !githubRepoId ||
      !websiteUrl
    ) {
      return new NextResponse("Missing required fields", { status: 422 });
    }

    let groupId, groupLink;

    try {
      console.log("creating group");
      const groupsClient = await createClient("converse.db");
      const groupData = await createGroupLink(
        groupsClient,
        name,
        `Stay tuned with ${name}'s updates`
      );
      groupId = groupData.topic;
      groupLink = groupData.link;
    } catch (e) {
      console.error(e);
      return new NextResponse("Failed to create XMTP group", { status: 500 });
    }
    const campaign = await createCampaign({
      id,
      userId,
      name,
      description,
      recipientAddress,
      githubRepoUrl,
      githubRepoId,
      websiteUrl,
      endDate: new Date(endDate),
      xmtpGroupId: groupId,
      xmtpGroupLinkId: groupLink,
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.log(`Token verification failed with error ${error}.`);
    return NextResponse.json(
      { error: "Token verification failed" },
      { status: 401 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const campaigns = await getCampaigns();
  return NextResponse.json(campaigns);
}
