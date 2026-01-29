import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { categoriesController } from "./categories.controller";

const categoriesRouter = Router();


 categoriesRouter.post('/', auth(UserRole.ADMIN), categoriesController.addCategories);
 categoriesRouter.get('/', auth(UserRole.ADMIN), categoriesController.getCategories);
 categoriesRouter.delete('/:categoryId', auth(UserRole.ADMIN), categoriesController.deleteCategories);




export default categoriesRouter;