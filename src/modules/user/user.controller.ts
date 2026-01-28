import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";


const getAllUsers = async(req: Request, res: Response) => {
  // Logic to get all users
  try {

    const result = await userService.getAllUsers();
    res.status(200).json({
      data: result,
      message: "Users fetched successfully"
    });
    
  } catch (error) {
     res.status(400).json({
      error: "Failed to get all users",
      details: error,
    });
  }
}
const getSingleUser = async(req: Request, res: Response) => {
  // Logic to get all users
  try {

    const { userId } = req.params;  


    const result = await userService.getSingleUser( userId as string );
    res.status(200).json({
      data: result,
      message: "Users fetched successfully"
    });
    
  } catch (error) {
     res.status(400).json({
      error: "Failed to get all users",
      details: error,
    });
  }
}



export const userController = {
  getAllUsers,
  getSingleUser
}