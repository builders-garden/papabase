import { authOptions } from "@/app/lib/auth";
import { getCampaignById, updateCampaign } from "@/lib/db/campaign";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
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

  const userId = session.user.id.toString();
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
