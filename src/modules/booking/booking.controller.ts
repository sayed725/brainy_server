import { NextFunction, Request, Response } from "express";
import { bookingService } from "./bokking.service";
import { UserRole } from "../../middlewares/auth";

const addBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("UnAuthorized Action");
    }
    const isAdmin = user.role === UserRole.ADMIN;
    // console.log(req.body);
    const result = await bookingService.addBooking(req.body, user?.id, isAdmin);
    res.status(201).json({
      success: true,
      message: "Booking added successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const result = await bookingService.getAllBooking();
    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const user = req.user;

    if (!user) {
      throw new Error("UnAuthorized Action");
    }
    const isAdmin = user.role === UserRole.ADMIN;

    const { bookingId } = req.params;
     
    const result = await bookingService.getSingleBooking(bookingId as string,user?.id, isAdmin);
    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
     const user = req.user;

    if (!user) {
      throw new Error("UnAuthorized Action");
    }
    const isAdmin = user.role === UserRole.ADMIN;

    const { bookingId } = req.params;
     
    const result = await bookingService.updateBookingStatus(bookingId as string, req.body, user.id, isAdmin);
    res.status(200).json({
      success: true,
      message: "Booking Status updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
     const user = req.user;

    if (!user) {
      throw new Error("UnAuthorized Action");
    }
    const isAdmin = user.role === UserRole.ADMIN;

    const { bookingId } = req.params;
     
    const result = await bookingService.deleteBooking(bookingId as string, user.id, isAdmin);
    res.status(200).json({
      success: true,
      message: "Booking Deleted successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}





export const bookingController = {
  addBooking,
  getAllBooking,
  getSingleBooking,
  updateBookingStatus,
  deleteBooking
};
