import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const sellToken = searchParams.get("sellToken");
  const buyToken = searchParams.get("buyToken");
  const sellAmount = searchParams.get("sellAmount");
  //const quote = await getSwapQuote(sellToken, buyToken, Number(sellAmount));
  return NextResponse.json({});
}
