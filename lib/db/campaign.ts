import { CampaignStatus } from "@prisma/client";
import { prisma } from "../prisma";

export const createCampaign = async (data: {
  userId: number;
  name: string;
  description: string;
  recipientAddress: string;
  githubRepoUrl: string;
  githubRepoId: string;
  websiteUrl: string;
  imageUrl: string;
  xmtpGroupId: string;
}) => {
  return await prisma.campaign.create({ data });
};

export const updateCampaign = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    githubRepoUrl?: string;
    githubRepoId?: string;
    websiteUrl?: string;
    imageUrl?: string;
    status?: CampaignStatus;
  }
) => {
  return await prisma.campaign.update({ where: { id }, data });
};

export const getCampaignById = async (id: number) => {
  return await prisma.campaign.findUnique({ where: { id } });
};

export const getCampaignsByUserId = async (userId: number) => {
  return await prisma.campaign.findMany({ where: { userId } });
};

export const getCampaigns = async () => {
  return await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
  });
};
