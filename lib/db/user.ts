import { prisma } from "../prisma";

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getUserByAddress = async (address: string) => {
  return await prisma.user.findUnique({ where: { address } });
};
