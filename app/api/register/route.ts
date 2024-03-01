import { privy } from "@/app/lib/privy";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  const accessToken = req.cookies.get("privy-token");

  if (!accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const verifiedClaims = await privy.verifyAuthToken(accessToken.value);
    const { userId } = verifiedClaims;
    const privyUser = await privy.getUser(userId);

    const user = await prisma.privyUser.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      return new NextResponse(JSON.stringify({ user }), {
        status: 200,
      });
    }

    const createdUser = await prisma.privyUser.create({
      data: {
        id: userId,
        address: privyUser.wallet!.address,
      },
    });

    return new NextResponse(JSON.stringify({ user: createdUser }), {
      status: 201,
    });
  } catch (error) {
    console.log(`Token verification failed with error ${error}.`);
    return NextResponse.json(
      { error: "Token verification failed" },
      { status: 401 }
    );
  }
}
