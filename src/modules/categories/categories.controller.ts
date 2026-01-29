import { NextFunction, Request, Response } from "express";
import { categoriesService } from "./categories.service";

const addCategories = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    // console.log(req.body);
    const result = await categoriesService.addCategories(req.body);
     res.status(201).json({
      success: true,
      message: "Category added successfully!",
      data: result,
    });
  } catch (error) {
   next(error);
  }
};

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoriesService.getCategories();
    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully!",
      data: result,
    });
  } catch (error) {
   next(error);
  }
};

const deleteCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = Number(req.params.categoryId);

    if (isNaN(categoryId)) {
      throw new Error("category is must be a number")
    }

    const result = await categoriesService.deleteCategories(categoryId);

        res.status(200).json({
      success: true,
      message: "Categories deleted successfully!",
      data: result,
    });

  } catch (error) {
   next(error);
  }
};


export const categoriesController = {
  addCategories,
  getCategories,
  deleteCategories
};
