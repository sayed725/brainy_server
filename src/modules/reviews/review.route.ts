import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { reviewController } from "./review.controller";

const reviewsRouter = Router();


 reviewsRouter.post('/', auth(UserRole.ADMIN,UserRole.USER,UserRole.TUTOR),reviewController.addReview);
 reviewsRouter.get('/',reviewController.getAllReview)
 reviewsRouter.delete('/:reviewId', auth(UserRole.ADMIN,UserRole.USER,UserRole.TUTOR),reviewController.deleteReview);
 




export default reviewsRouter;