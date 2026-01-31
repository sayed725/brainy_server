import { Categories } from "./../../generated/prisma/browser";
import { Booking } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const addBooking = async (data: Booking, reqId: string, isAdmin: boolean) => {
  // add booking logic here
  // console.log("working fine",data,userId,isAdmin)

  const { userId, tutorId, startTime, endTime } = data;

  if (reqId !== userId && !isAdmin) {
    throw new Error("You are not authorized for booking");
  }

  const existingTutor = await prisma.tutor.findUnique({
    where: { id: tutorId },
  });

  //   console.log(existingTutor)

  if (!existingTutor) {
    throw new Error("Tutor not found");
  }

  const existingBooking = await prisma.booking.findMany({
    where: {
      userId: userId,
      tutorId: tutorId,
    },
  });

  if(existingBooking.length > 0){
    throw new Error("You have already booked this tutor");
  }

  // Calculate Duration in Hours
  //   const start = new Date(startTime);
  //   const end = new Date(endTime);

  // Calculate difference in hours
  //   const durationInMs = end.getTime() - start.getTime();
  //   const durationInHours = durationInMs / (1000 * 60 * 60);

  //   if (durationInHours <= 0) {
  //     throw new Error("End time must be after start time");
  //   }

  // Calculate Total Price
  //   const totalPrice = Math.ceil(durationInHours * (existingTutor.rate || 0));

  //   console.log(data);

  const result = await prisma.booking.create({
    data,
  });

  return result;
};

const getAllBooking = async () => {
  // get booking logic here
  // console.log("booking hit")
  const [bookings, totalBooking] = await Promise.all([
    prisma.booking.findMany({
      include: {
        user: true,
        tutor: true,
      },
    }),
    prisma.booking.count(),
  ]);

  return {
    totalBooking,
    data: bookings,
  };
};

const getSingleBooking = async (
  bookingId: string,
  userId: string,
  isAdmin: boolean,
) => {
  // get single booking logic here
  // console.log("ok",bookingId,userId,isAdmin)
  const existingBooking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      user: true,
      tutor: true,
    },
  });

  if (!existingBooking) {
    throw new Error("Booking not found");
  }

  //   console.log(existingBooking)

  if (existingBooking.userId !== userId && !isAdmin) {
    throw new Error("You are not authorized for booking");
  }

  return existingBooking;
};

// type BookingStatusValue = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

const updateBookingStatus = async (
  bookingId: string,
  data: any,
  userId: string,
  isAdmin: boolean,
) => {
  // update booking status logic here
  //   console.log("ok", bookingId, data, userId, isAdmin);
  if (
    data.status !== "PENDING" &&
    data.status !== "CONFIRMED" &&
    data.status !== "CANCELLED"
  ) {
    throw new Error("Data must be valid");
  }

  const existingBooking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!existingBooking) {
    throw new Error("Booking not found");
  }

  //   console.log(existingBooking)

  if (existingBooking.userId !== userId && !isAdmin) {
    throw new Error("You are not authorized for booking");
  }

  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data,
  });

  return result;
};

const deleteBooking = async (
  bookingId: string,
  userId: string,
  isAdmin: boolean,
) => {
  // delete booking logic here
  // console.log("ok")

  const existingBooking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!existingBooking) {
    throw new Error("Booking not found");
  }

  //   console.log(existingBooking)

  if (existingBooking.userId !== userId && !isAdmin) {
    throw new Error("You are not authorized for booking");
  }

  const result = await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });

  return result;
};

export const bookingService = {
  addBooking,
  getAllBooking,
  getSingleBooking,
  updateBookingStatus,
  deleteBooking,
};
