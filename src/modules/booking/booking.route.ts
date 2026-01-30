import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";




const bookingRouter = Router();


bookingRouter.post('/', auth(UserRole.ADMIN,UserRole.USER,UserRole.TUTOR), bookingController.addBooking);
bookingRouter.get('/', auth(UserRole.ADMIN,UserRole.USER,UserRole.TUTOR), bookingController.getAllBooking);
bookingRouter.get('/:bookingId', auth(UserRole.ADMIN,UserRole.USER,UserRole.TUTOR), bookingController.getSingleBooking);







export default bookingRouter;