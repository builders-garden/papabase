import { prisma } from "../prisma";

export const upsertUser = async (
  address: string,
  data: {
    address?: string;
    name?: string;
    avatarUrl?: string;
  }
) => {
  return await prisma.user.upsert({
    where: { address },
    update: data,
    create: {
      address,
      ...data,
    },
  });
};

export const createUser = async (
  address: string,
  data: {
    address: string;
    name: string;
    avatarUrl: string;
  }
) => {
  return await upsertUser(address, data);
};

export const updateUser = async (
  address: string,
  data: {
    name?: string;
    avatarUrl?: string;
  }
) => {
  return await upsertUser(address, data);
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getUserByAddress = async (address: string) => {
  return await prisma.user.findUnique({ where: { address } });
};
