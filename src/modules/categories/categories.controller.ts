import { Request, Response } from "express";
import { categoriesService } from "./categories.service";

const addCategories = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const result = await categoriesService.addCategories(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Category creation failed",
      details: e,
    });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await categoriesService.getCategories();
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Category fetching failed",
      details: e,
    });
  }
};

const deleteCategories = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.params.categoryId);

    if (isNaN(categoryId)) {
      return res.status(400).json({
        error: "Invalid category id",
      });
    }

    const result = await categoriesService.deleteCategories(categoryId);

    return res.status(204).json(result); // No Content

  } catch (e: any) {
    if (e.message === "Category not found") {
      return res.status(404).json({ error: e.message });
    }

    return res.status(500).json({
      error: "Category delete failed",
    });
  }
};


export const categoriesController = {
  addCategories,
  getCategories,
  deleteCategories
};
