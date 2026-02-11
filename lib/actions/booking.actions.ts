"use server";

import connectToDatabase from "../mongodb";
import { Booking } from "@/database";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectToDatabase();
    await Booking.create({ eventId, email });

    return { success: true};
  } catch (error) {
    console.error("create booking failed", error);
    return { success: false};
  }
};
