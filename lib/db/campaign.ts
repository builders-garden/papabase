import { CampaignStatus } from "@prisma/client";
import { prisma } from "../prisma";

export const createCampaign = async (data: {
  userId: string;
  name: string;
  description: string;
  recipientAddress: string;
  githubRepoUrl: string;
  githubRepoId: string;
  websiteUrl: string;
  imageUrl: string;
  xmtpGroupId: string;
  xmtpGrouLinkId: string;
}) => {
  return await prisma.campaign.create({ data });
};

export const updateCampaign = async (
  id: number,
  userId: string,
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
  return await prisma.campaign.update({ where: { id, userId }, data });
};

export const getCampaignById = async (id: number) => {
  return await prisma.campaign.findUnique({
    where: { id },
    include: { user: true, donations: { include: { user: true } } },
  });
};

export const getCampaignsByUserId = async (userId: string) => {
  return await prisma.campaign.findMany({
    where: { userId },
    include: { donations: true },
  });
};

export const getCampaigns = async () => {
  return await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
    include: { donations: true, user: true },
  });
};
