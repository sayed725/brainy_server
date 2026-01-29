import { Tutor } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/auth";

const addTutor = async (data: Tutor, reqId: string, isAdmin: boolean) => {
  // tutor add logic here
  //    console.log(data)

  const { userId } = data;

  if (reqId !== userId && !isAdmin) {
    throw new Error("You are not authorized to update this user");
  }
  //   console.log(data)

  const userInfo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userInfo) {
    throw new Error("User not found");
  }

  if (userInfo.role === UserRole.TUTOR) {
    throw new Error("Tutor already exists");
  }

  const result = await prisma.$transaction(async (tx) => {
    // 1. Create the Tutor Profile
    const newTutor = await tx.tutor.create({
      data,
    });

    // 2. Update the User's role to TUTOR
    await tx.user.update({
      where: { id: userId },
      data: { role: UserRole.TUTOR },
    });

    return newTutor;
  });

  return result;
};

const getTutor = async () => {
  // logic to get user here

  // console.log("get route hit")

  const result = await prisma.tutor.findMany();

  return result;
};

const updateTutor = async (
  paramsId: string,
  data: Tutor,
  reqId: string,
  isAdmin: boolean,
) => {
  const { id, userId, createdAt, updatedAt, ...updateData } = data;

  if (reqId !== userId && !isAdmin) {
    throw new Error("You are not authorized to update this user");
  }

  const existingTutor = await prisma.tutor.findFirst({
    where: { userId: userId },
  });

  // console.log(existingTutor)

  if (!existingTutor) {
    throw new Error("Tutor not found");
  }

  const existingCategory = await prisma.categories.findUnique({
    where: {
      id: data.categoryId as number,
    },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  // console.log(paramsId,updateData, reqId, isAdmin)

  const result = await prisma.tutor.update({
    where: {
      id: paramsId,
    },
    data: updateData,
  });

  return result;
};

export const tutorService = {
  addTutor,
  getTutor,
  updateTutor,
};
