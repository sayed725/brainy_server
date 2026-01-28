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

export const userService = {
  getAllUsers,
  getSingleUser
};
