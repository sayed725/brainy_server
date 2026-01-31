import { Router } from 'express';
import userRouter from '../modules/user/user.route';
import tutorRouter from '../modules/tutor/tutor.route';
import categoriesRouter from '../modules/categories/categories.route';
import bookingRouter from '../modules/booking/booking.route';
import reviewsRouter from '../modules/reviews/review.route';




const routes = Router()


routes.use('/user', userRouter)

routes.use('/tutor', tutorRouter)

routes.use('/categories', categoriesRouter)

routes.use('/booking',bookingRouter)

routes.use('/review', reviewsRouter)



export default routes;


