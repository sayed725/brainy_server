import { Router } from 'express';
import { userController } from './user.controller';
import auth, { UserRole } from '../../middlewares/auth';



const userRouter = Router();


 userRouter.get('/', auth(UserRole.ADMIN), userController.getAllUsers);
 userRouter.get('/:userId', userController.getSingleUser)


export default userRouter;