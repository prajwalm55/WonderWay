import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    bookingCode: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "completed"],
      default: "active",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    paymentId: {
      type: String,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate human-readable bookingCode
bookingSchema.pre("save", function (next) {
  if (!this.bookingCode) {
    const random = Math.floor(10000 + Math.random() * 90000);
    this.bookingCode = `TRVL-${random}`;
  }
  next();
});

export default mongoose.model("Booking", bookingSchema);
