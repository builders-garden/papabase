import { privy } from "@/app/lib/privy";
import { getCampaignById, updateCampaign } from "@/lib/db/campaign";
import { uploadImage } from "@/lib/imagekit";
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

    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return Response.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const campaign = await getCampaignById(parseInt(params.id, 10));

    if (!campaign) {
      return Response.json(
        { result: "Campaign doesn't exist." },
        { status: 404 }
      );
    }

    const imageUpload = await uploadImage(buffer, `${campaign.name}_image`);

    // Update the profile with the provided data
    const updatedProfile = await updateCampaign(
      parseInt(params.id, 10),
      userId,
      {
        imageUrl: imageUpload.url,
      }
    );

    // Return a 200 OK response with the updated profile
    return Response.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.log(`Token verification failed with error ${error}.`);
    return NextResponse.json(
      { error: "Token verification failed" },
      { status: 401 }
    );
  }
};
