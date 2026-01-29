import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { UserRole } from "../../middlewares/auth";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  // Logic to get all users
  try {
    const result = await userService.getAllUsers();
     res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};
const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  // Logic to get all users
  try {
    const { userId } = req.params;

    const result = await userService.getSingleUser(userId as string);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const updateUser = async (req: Request, res: Response, next:NextFunction) => {
  try {
    // logic to update user
    const user = req.user;
    if (!user) {
      throw new Error ("UnAuthorized Action")
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
      res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const deleteUser = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error ("UnAuthorized Action")
    }

    const isAdmin = user.role === UserRole.ADMIN;
    const { userId } = req.params;

    const result = await userService.deleteUser(userId as string, user.id, isAdmin);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });

  } catch (error) {
   next(error)
  }
};


export const userController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
