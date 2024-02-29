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

  try {
    const groupsClient = await createClient("converse.db");
    const { groupId, groupLinkId } = await createGroupLink(
      groupsClient,
      name,
      `Stay tuned with ${name}'s updates`
    );
  } catch (e) {
    console.error(e);
    return new NextResponse("Failed to create group", { status: 500 });
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
    xmtpGroupId: "groupId", // TODO: replace with "groupId"
    xmtpGroupLinkId: "groupLinkId", // TODO: replace with "groupLinkId"
  });

  return NextResponse.json(campaign, { status: 201 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const campaigns = await getCampaigns();
  return NextResponse.json(campaigns);
}
