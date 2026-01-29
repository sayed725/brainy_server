import { Router } from 'express';
import userRouter from '../modules/user/user.route';
import tutorRouter from '../modules/tutor/tutor.route';




const routes = Router()


routes.use('/user', userRouter)

routes.get('tutor', tutorRouter)



export default routes;


