import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../middlewares/auth";
import { reviewService } from "./review.service";

const addReview = async (req: Request, res: Response, next: NextFunction) => {
  // add review logic here
  try {
    const user = req.user;

    if (!user) {
      throw new Error("UnAuthorized Action");
    }
    const isAdmin = user.role === UserRole.ADMIN;
    // console.log(req.body);
    const result = await reviewService.addReview(req.body, user.id, isAdmin);
    res.status(201).json({
      success: true,
      message: "Review added successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const getAllReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const result = await reviewService.getAllReview();
    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const deleteReview  = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
     const user = req.user;

    if (!user) {
      throw new Error("UnAuthorized Action");
    }
    const isAdmin = user.role === UserRole.ADMIN;

     const reviewId = Number(req.params.reviewId);

    if (isNaN(reviewId)) {
      throw new Error("category is must be a number")
    }
     
    const result = await reviewService.deleteReview(reviewId, user.id, isAdmin);
    res.status(200).json({
      success: true,
      message: "Review Deleted successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}








export const reviewController = {
  addReview,
  getAllReview,
  deleteReview  
};
