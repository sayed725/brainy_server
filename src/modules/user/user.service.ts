import { User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  // Logic to get all users

  const users = await prisma.user.findMany();

  return users;
};


const getSingleUser = async (userId: string ) => {
  // Logic to get a single user by ID

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
}

const updateUser = async(paramsId: string, data:User, userId: string, isAdmin: boolean) => {

  if (paramsId !== userId && !isAdmin) {
    throw new Error("You are not authorized to update this user");
  }

  // console.log(paramsId,data,userId,isAdmin)

  const result = await prisma.user.update({
    where: {
      id: paramsId,
    },
    data,
  });

  return result;
}



const deleteUser = async (paramsId: string, userId: string, isAdmin: boolean) => {
  // logic to delete user here
  // console.log(paramsId, userId, isAdmin)

   if (paramsId !== userId && !isAdmin) {
    throw new Error("You are not authorized to update this user");
  }

   const user = await prisma.user.findUnique({
    where: { id: paramsId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const result = await prisma.user.delete({
    where: {
      id: paramsId
    }
  })

  return result;

}

export const userService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
