import { getCampaignById, updateCampaign } from "@/lib/db/campaign";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;
  const {
    name,
    description,
    githubRepoUrl,
    githubRepoId,
    websiteUrl,
    imageUrl,
  } = await req.json();

  if (
    !name ||
    !description ||
    !githubRepoUrl ||
    !githubRepoId ||
    !websiteUrl ||
    !imageUrl
  ) {
    return new NextResponse("Missing required fields", { status: 422 });
  }

  // TODO: Replace with the user ID from the session
  const userId = 0;
  const campaign = await updateCampaign(parseInt(id, 10), userId, {
    name,
    description,
    githubRepoUrl,
    githubRepoId,
    websiteUrl,
    imageUrl,
  });

  return NextResponse.json(campaign);
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { id } = params;
  const campaign = await getCampaignById(parseInt(id, 10));
  return NextResponse.json(campaign);
};
