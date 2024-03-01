import { privy } from "@/app/lib/privy";
import { getCampaignById, updateCampaign } from "@/lib/db/campaign";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const accessToken = req.cookies.get("privy-token");

  if (!accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const verifiedClaims = await privy.verifyAuthToken(accessToken.value);
    const { userId } = verifiedClaims;

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
      userId,
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
  } catch (error) {
    console.log(`Token verification failed with error ${error}.`);
    return NextResponse.json(
      { error: "Token verification failed" },
      { status: 401 }
    );
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { id } = params;
  const campaign = await getCampaignById(parseInt(id, 10));
  return NextResponse.json(campaign);
};
