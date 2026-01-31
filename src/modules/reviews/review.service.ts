import { Review } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const addReview = async (data: Review, reqId: string, isAdmin: boolean) => {
  // add review logic here
  // console.log("ok", data, userId, isAdmin)
  const { rating, comment, userId, tutorId, bookingId } = data;

  if (reqId !== userId && !isAdmin) {
    throw new Error("You are not authorized for add review");
  }

  const existingBooking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  //   console.log(existingBooking);

  if (!existingBooking) {
    throw new Error("You do not have any booking to add review");
  }

  const result = await prisma.review.create({
    data,
  });

  return result;
};

const getAllReview = async () => {
  // get all review logic here
  const [reviews, totalReviews] = await Promise.all([
    prisma.review.findMany({
      include: {
        booking: true,
        user: true,
        tutor: true,
      },
    }),
    prisma.review.count(),
  ]);

  return {
    totalReviews,
    data: reviews,
  };
};

const deleteReview = async(  reviewId: number,
  userId: string,
  isAdmin: boolean) => {
    // delete review logic here
      const existingReview = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!existingReview) {
    throw new Error("Review not found");
  }

  //   console.log(existingBooking)

  if (existingReview.userId !== userId && !isAdmin) {
    throw new Error("You are not authorized to perform this action");
  }

  const result = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return result;
}

export const reviewService = {
  addReview,
  getAllReview,
  deleteReview 
};
