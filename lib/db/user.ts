import { prisma } from "../prisma";

export const upsertUser = async (
  id: string,
  data: {
    address?: string;
    name?: string;
    image?: string;
  }
) => {
  return await prisma.user.upsert({
    where: { id },
    update: data,
    create: {
      address: data.address!,
      name: data.name,
      image: data.image,
    },
  });
};

export const createUser = async (
  address: string,
  data: {
    address: string;
    name: string;
    image: string;
  }
) => {
  return await upsertUser(address, data);
};

export const updateUser = async (
  address: string,
  data: {
    name?: string;
    image?: string;
  }
) => {
  return await upsertUser(address, data);
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getUserByAddress = async (address: string) => {
  return await prisma.user.findFirst({ where: { address } });
};
