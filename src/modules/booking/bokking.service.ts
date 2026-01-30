import { Booking } from "../../generated/prisma/client";




const addBooking = async(data: Booking) => {
    // add booking logic here 

    console.log("working fine",data)
}





export const bookingService = {
  addBooking,
};
