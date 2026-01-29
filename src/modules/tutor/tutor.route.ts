import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";

const tutorRouter = Router();


 tutorRouter.get('/', auth(UserRole.ADMIN),);


export default tutorRouter;