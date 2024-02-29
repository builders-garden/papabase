interface FeeDetail {
  pct: string;
  total: string;
}

interface Fees {
  totalRelayFee: FeeDetail;
  relayerCapitalFee: FeeDetail;
  relayerGasFee: FeeDetail;
  lpFee: FeeDetail;
}

export interface TransactionDetails {
  fees: Fees;
  capitalFeePct: string;
  capitalFeeTotal: string;
  relayerGasFeePct: string;
  relayerGasFeeTotal: string;
  relayFeePct: string;
  relayFeeTotal: string;
  lpFeePct: string;
  timestamp: string;
  isAmountTooLow: boolean;
  quoteBlock: string;
  spokePoolAddress: string;
}

export const getAcrossSuggestedFees = async (
  token: string,
  destinationChainId: string,
  amount: string,
  message: string
): Promise<TransactionDetails> => {
  const url = new URL("https://across.to/api/suggested-fees");
  url.searchParams.append("token", token);
  url.searchParams.append("destinationChainId", destinationChainId);
  url.searchParams.append("amount", amount);
  const response = await fetch(url);
  return response.json();
};
