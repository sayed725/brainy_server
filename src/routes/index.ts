import { Router } from 'express';
import userRouter from '../modules/user/user.route';
import tutorRouter from '../modules/tutor/tutor.route';
import categoriesRouter from '../modules/categories/categories.route';




const routes = Router()


routes.use('/user', userRouter)

routes.use('/tutor', tutorRouter)

routes.use('/categories', categoriesRouter)



export default routes;


