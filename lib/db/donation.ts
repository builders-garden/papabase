import { prisma } from "../prisma";

export const createDonation = async (data: {
  userId: string;
  campaignId: number;
  amount: number;
  txHash: string;
}) => {
  return await prisma.donation.create({ data });
};

export const getDonationsByCampaignId = async (campaignId: number) => {
  return await prisma.donation.findMany({
    where: { campaignId },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
};

export const getDonationsByUserId = async (userId: string) => {
  return await prisma.donation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { campaign: true },
  });
};


