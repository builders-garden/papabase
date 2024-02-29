import { prisma } from "../prisma";

export const upsertUser = async (
  id: string,
  data: {
    address?: string;
    name?: string;
    imageUrl?: string;
  }
) => {
  return await prisma.user.upsert({
    where: { id },
    update: data,
    create: {
      address: data.address!,
      name: data.name,
      imageUrl: data.imageUrl,
    },
  });
};

export const createUser = async (
  id: string,
  data: {
    address: string;
    name: string;
    imageUrl: string;
  }
) => {
  return await upsertUser(id, data);
};

export const updateUser = async (
  id: string,
  data: {
    name?: string;
    imageUrl?: string;
  }
) => {
  return await upsertUser(id, data);
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getUserByAddress = async (address: string) => {
  return await prisma.user.findFirst({ where: { address } });
};
