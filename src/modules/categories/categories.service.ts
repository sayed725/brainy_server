import { Categories } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const addCategories = async (data: Categories) => {
  // logic to add categories
  const result = await prisma.categories.create({
    data,
  });

  return result;
};



const getCategories = async () => {
 
  const [categories, totalCategories] = await Promise.all([
    prisma.categories.findMany({
      orderBy: {
        id: 'asc',
      },
    }),
    prisma.categories.count(),
  ]);

  return {
    totalCategories,
    data: categories,
  };
};

const deleteCategories = async(categoryId: number) =>{
    
const category = await prisma.categories.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const result =  prisma.categories.delete({
    where: { id: categoryId },
  });

  return result

}

export const categoriesService = {
  addCategories,
  getCategories,
  deleteCategories
};
