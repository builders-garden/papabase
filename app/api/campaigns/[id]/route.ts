import { authOptions } from "@/app/lib/auth";
import { getCampaignById, updateCampaign } from "@/lib/db/campaign";
import { getUserById, updateUser, upsertUser } from "@/lib/db/user";
import { uploadImage } from "@/lib/imagekit";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const campaign = await getCampaignById(parseInt(params.id, 10));

  if (!campaign) {
    return Response.json(
      { result: "Campaign doesn't exist." },
      { status: 404 }
    );
  }

  const {
    name,
    description,
    githubRepoUrl,
    githubRepoId,
    websiteUrl,
    imageUrl,
    status,
  } = await req.json();

  if (
    !name ||
    !description ||
    !githubRepoUrl ||
    !githubRepoId ||
    !websiteUrl ||
    !imageUrl ||
    !status
  ) {
    return new NextResponse("Missing required fields", { status: 422 });
  }

  const updatedCampaign = await updateCampaign(
    parseInt(params.id, 10),
    session.user.id,
    {
      name,
      description,
      status,
      githubRepoUrl,
      githubRepoId,
      websiteUrl,
      imageUrl,
    }
  );

  // Return a 200 OK response with the updated profile
  return Response.json(updatedCampaign, { status: 200 });
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { id } = params;
  const campaign = await getCampaignById(parseInt(id, 10));
  return NextResponse.json(campaign);
};
