import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";




const bookingRouter = Router();


bookingRouter.post('/', auth(UserRole.ADMIN,UserRole.USER,UserRole.TUTOR), bookingController.addBooking);
bookingRouter.get('/', auth(UserRole.ADMIN,UserRole.USER,UserRole.TUTOR), bookingController.getAllBooking);
bookingRouter.get('/:bookingId', auth(UserRole.ADMIN,UserRole.USER,UserRole.TUTOR), bookingController.getSingleBooking);
bookingRouter.patch('/:bookingId', auth(UserRole.ADMIN,UserRole.USER,UserRole.TUTOR), bookingController.updateBookingStatus);
bookingRouter.delete('/:bookingId', auth(UserRole.ADMIN,UserRole.USER,UserRole.TUTOR), bookingController.deleteBooking);








export default bookingRouter;