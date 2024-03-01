import { Token, getSwapQuote } from "@/lib/0xapi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const sellToken = searchParams.get("sellToken");
  const buyToken = Token.USDC;
  const sellAmount = searchParams.get("sellAmount");
  const quote = await getSwapQuote(
    sellToken as Token,
    buyToken as Token,
    Number(sellAmount)
  );
  return NextResponse.json(quote);
}
