import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { tutorController } from "./tutor.controller";

const tutorRouter = Router();

tutorRouter.post('/', auth(UserRole.ADMIN, UserRole.TUTOR,UserRole.USER),tutorController.addTutor);
tutorRouter.get('/', auth(UserRole.ADMIN),tutorController.getTutor);
tutorRouter.patch('/:tutorId', auth(UserRole.ADMIN,UserRole.TUTOR),tutorController.updateTutor);




export default tutorRouter;