import { authOptions } from "@/app/lib/auth";
import { getCampaignById, updateCampaign } from "@/lib/db/campaign";
import { getUserById, updateUser, upsertUser } from "@/lib/db/user";
import { uploadImage } from "@/lib/imagekit";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: Request) => {
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

  // Retrieve the Profile address
  const user = await getUserById(session.user.id.toString());

  if (!user) {
    // If the profile doesn't exist, return a 404 Not Found response
    return Response.json({ result: "Profile doesn't exist." }, { status: 404 });
  }

  const imageUpload = await uploadImage(
    buffer,
    `${user.address.toLowerCase()}_avatar`
  );

  // Update the profile with the provided data
  const updatedProfile = await updateUser(user.address, {
    image: imageUpload.url,
  });

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
