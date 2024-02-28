import { NextRequest, NextResponse } from "next/server";
import { createCampaign, getCampaigns } from "@/lib/db/campaign";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

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
    userId: session.user.id,
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
