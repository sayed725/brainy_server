import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { tutorController } from "./tutor.controller";

const tutorRouter = Router();

tutorRouter.post('/', auth(UserRole.ADMIN, UserRole.TUTOR,UserRole.USER),tutorController.addTutor);
tutorRouter.get('/',tutorController.getTutor);
tutorRouter.get('/:tutorId',tutorController.getSingleTutor);
tutorRouter.patch('/:tutorId', auth(UserRole.ADMIN,UserRole.TUTOR),tutorController.updateTutor);
tutorRouter.delete('/:tutorId', auth(UserRole.ADMIN,UserRole.TUTOR),tutorController.deleteTutor);





export default tutorRouter;