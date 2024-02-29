import { NextRequest, NextResponse } from "next/server";
import { createCampaign, getCampaigns } from "@/lib/db/campaign";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { createClient } from "@/lib/xmtp/client";
import { createGroupLink } from "@/lib/xmtp/server";

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const {
    name,
    description,
    recipientAddress,
    githubRepoUrl,
    githubRepoId,
    websiteUrl,
    imageUrl,
    endDate,
  } = await req.json();

  if (
    !name ||
    !description ||
    !recipientAddress ||
    !githubRepoUrl ||
    !githubRepoId ||
    !websiteUrl ||
    !imageUrl
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
    userId: session.user.id.toString(),
    name,
    description,
    recipientAddress,
    githubRepoUrl,
    githubRepoId,
    websiteUrl,
    imageUrl,
    endDate: new Date(endDate),
    xmtpGroupId: groupId,
    xmtpGroupLinkId: groupLink, 
  });

  return NextResponse.json(campaign, { status: 201 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const campaigns = await getCampaigns();
  return NextResponse.json(campaigns);
}
