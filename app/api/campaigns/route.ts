import { NextRequest, NextResponse } from "next/server";
import { createCampaign, getCampaigns } from "@/lib/db/campaign";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const {
    name,
    description,
    recipientAddress,
    githubRepoUrl,
    githubRepoId,
    websiteUrl,
    imageUrl,
    xmtpGroupId,
  } = await req.json();

  if (
    !name ||
    !description ||
    !recipientAddress ||
    !githubRepoUrl ||
    !githubRepoId ||
    !websiteUrl ||
    !imageUrl ||
    !xmtpGroupId
  ) {
    return new NextResponse("Missing required fields", { status: 422 });
  }

  const campaign = await createCampaign({
    // TODO: Replace with the user ID from the session
    userId: 1,
    name,
    description,
    recipientAddress,
    githubRepoUrl,
    githubRepoId,
    websiteUrl,
    imageUrl,
    xmtpGroupId,
  });

  return NextResponse.json(campaign, { status: 201 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const campaigns = await getCampaigns();
  return NextResponse.json(campaigns);
}
