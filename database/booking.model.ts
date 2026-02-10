import mongoose, { Schema, Document, Model, Types } from "mongoose";

/**
 * TypeScript interface representing a Booking document in MongoDB
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema Definition
 * Defines the structure and validation rules for Booking documents
 */
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true, // Index for faster queries
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          // RFC 5322 compliant email validation regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

/**
 * Pre-save hook to validate that the referenced Event exists
 * Prevents orphaned bookings by ensuring eventId points to a real event
 */
BookingSchema.pre("save", async function () {
  const booking = this as IBooking;

  // Only validate eventId if it's new or modified
  if (booking.isModified("eventId")) {
    try {
      // Dynamically import Event model to avoid circular dependency
      const Event =
        mongoose.models.Event || (await import("./event.model")).default;

      // Check if the event exists
      const eventExists = await Event.exists({ _id: booking.eventId });

      if (!eventExists) {
        throw new Error(`Event with ID ${booking.eventId} does not exist`);
      }
    } catch (error) {
      throw new Error(
        `Failed to validate event reference: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
});

/**
 * Create and export the Booking model
 * Uses mongoose.models to prevent model recompilation in development
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
