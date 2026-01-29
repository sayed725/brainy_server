import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { UserRole } from "../../middlewares/auth";

const getAllUsers = async (req: Request, res: Response) => {
  // Logic to get all users
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({
      data: result,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to get all users",
      details: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  // Logic to get all users
  try {
    const { userId } = req.params;

    const result = await userService.getSingleUser(userId as string);
    res.status(200).json({
      data: result,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to get all users",
      details: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    // logic to update user
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }

    // console.log("fun hit");

    const { userId } = req.params;
    const isAdmin = user.role === UserRole.ADMIN;
    // console.log(isAdmin);
    const result = await userService.updateUser(
      userId as string,
      req.body,
      user.id,
      isAdmin,
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "User update  failed",
      details: e,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  // logic to delete user
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }

    const isAdmin = user.role === UserRole.ADMIN;

    const { userId } = req.params;
    const result = await userService.deleteUser(
      userId as string,
      user.id,
      isAdmin,
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "User delete failed",
      details: e,
    });
  }
};

export const userController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
