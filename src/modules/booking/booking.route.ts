import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";




const bookingRouter = Router();


bookingRouter.post('/', auth(UserRole.ADMIN,UserRole.USER), bookingController.addBooking);





export default bookingRouter;