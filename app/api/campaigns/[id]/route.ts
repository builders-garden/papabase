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
    session.user.id,
    {
      imageUrl: imageUpload.url,
    }
  );

  // Return a 200 OK response with the updated profile
  return Response.json(updatedProfile, { status: 200 });
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { id } = params;
  const campaign = await getCampaignById(parseInt(id, 10));
  return NextResponse.json(campaign);
};
