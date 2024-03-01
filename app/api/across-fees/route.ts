import { getAcrossSuggestedFees } from "@/lib/across-api";
import { chain } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

const USDC_ON_ETHEREUM = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount");
  const originChainId = searchParams.get("originChainId");
  const quote = await getAcrossSuggestedFees(
    USDC_ON_ETHEREUM,
    originChainId!,
    chain.id.toString(),
    amount!
  );
  return NextResponse.json(quote);
}
