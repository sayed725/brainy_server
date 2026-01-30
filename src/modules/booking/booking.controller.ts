import { NextFunction, Request, Response } from "express";
import { bookingService } from "./bokking.service";




const addBooking = async(req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(req.body);
        const result = await bookingService.addBooking(req.body);
         res.status(201).json({
          success: true,
          message: "Booking added successfully!",
          data: result,
        });
      } catch (error) {
       next(error);
      }
}





export const bookingController = {
  addBooking,
};