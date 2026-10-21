import Booking from "../models/Booking.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import { sendEmail, bookingConfirmedEmail, bookingCancelledEmail } from "../utils/email.js";

/* Razorpay integration is intentionally disabled for now.
   The original createOrder and verifyPayment handlers are kept out of the
   active runtime until payment credentials and the final payment flow are
   provided. */

// ----------------------------
// 3. CREATE BOOKING WITHOUT PAYMENT
// ----------------------------
const createBooking = async (req, res) => {
  console.log("🟡 [CREATE BOOKING] Body received:", req.body, "User:", req.user);

  const userId = req.user?.id;
  if (!userId) {
    console.log("❌ [CREATE BOOKING] User not authenticated");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const booking = new Booking({
      userId,
      ...req.body,
      status: "active",
      paymentStatus: "pending",
    });

    console.log("🔹 [CREATE BOOKING] Saving booking:", booking);
    await booking.save();
    console.log("✅ [CREATE BOOKING] Booking saved successfully");

    User.findById(userId)
      .then(user => {
        if (user?.email) {
          console.log("🔹 [CREATE BOOKING] Sending email to:", user.email);
          sendEmail(user.email, "Booking Created (Pending Payment)", bookingConfirmedEmail(booking)).catch(err =>
            console.error("❌ [CREATE BOOKING] Email error:", err)
          );
        } else {
          console.log("❌ [CREATE BOOKING] User email not found");
        }
      })
      .catch(err => console.error("❌ [CREATE BOOKING] User lookup error:", err));

    res.status(201).json({
      success: true,
      message: "Booking created (pending payment)",
      booking,
    });
  } catch (error) {
    console.error("❌ [CREATE BOOKING] Error saving booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ----------------------------
// 4. GET SINGLE BOOKING (Safe ObjectId Check)
// ----------------------------
const getBooking = async (req, res) => {
  const id = req.params.id;
  console.log("🟡 [GET BOOKING] ID:", id);

  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    const booking = await Booking.findOne({
      $or: [
        { bookingCode: id },
        ...(isValidObjectId ? [{ _id: id }] : []),
      ],
    });

    if (!booking) {
      console.log("❌ [GET BOOKING] Booking not found");
      return res.status(404).json({ message: "Not found" });
    }

    console.log("✅ [GET BOOKING] Found booking:", booking);
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("❌ [GET BOOKING] Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ----------------------------
// 5. GET ALL BOOKINGS FOR USER
// ----------------------------
const getAllBookings = async (req, res) => {
  console.log("🟡 [GET ALL BOOKINGS] User:", req.user?.id);

  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    console.log("✅ [GET ALL BOOKINGS] Found bookings:", bookings.length);
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("❌ [GET ALL BOOKINGS] Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ----------------------------
// 6. CANCEL BOOKING (Safe ObjectId Check)
// ----------------------------
const cancelBooking = async (req, res) => {
  const id = req.params.id;
  console.log("🟡 [CANCEL BOOKING] ID:", id);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("❌ [CANCEL BOOKING] Invalid ID");
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      console.log("❌ [CANCEL BOOKING] Booking not found");
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";
    booking.updatedAt = Date.now();
    await booking.save();
    console.log("✅ [CANCEL BOOKING] Booking cancelled");

    User.findById(booking.userId)
      .then(user => {
        if (user?.email) {
          console.log("🔹 [CANCEL BOOKING] Sending email to:", user.email);
          sendEmail(user.email, "Booking Cancelled ❌", bookingCancelledEmail(booking)).catch(err =>
            console.error("❌ [CANCEL BOOKING] Email error:", err)
          );
        } else {
          console.log("❌ [CANCEL BOOKING] User email not found");
        }
      })
      .catch(err => console.error("❌ [CANCEL BOOKING] User lookup error:", err));

    res.status(200).json({ success: true, message: "Booking cancelled", data: booking });
  } catch (error) {
    console.error("❌ [CANCEL BOOKING] Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ----------------------------
// 7. COMPLETE BOOKING (Safe ObjectId Check)
// ----------------------------
const completeBooking = async (req, res) => {
  const id = req.params.id;
  console.log("🟡 [COMPLETE BOOKING] ID:", id);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("❌ [COMPLETE BOOKING] Invalid ID");
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      console.log("❌ [COMPLETE BOOKING] Booking not found");
      return res.status(404).json({ message: "Not found" });
    }

    booking.status = "completed";
    booking.updatedAt = Date.now();
    await booking.save();
    console.log("✅ [COMPLETE BOOKING] Booking completed");

    User.findById(booking.userId)
      .then(user => {
        if (user?.email) {
          console.log("🔹 [COMPLETE BOOKING] Sending email to:", user.email);
          sendEmail(
            user.email,
            "Trip Completed 🎉",
            `<h2>Thanks for Traveling With Us!</h2><p><b>Booking Code:</b> ${booking.bookingCode}</p><p>Your trip is now marked as completed.</p>`
          ).catch(err => console.error("❌ [COMPLETE BOOKING] Email error:", err));
        } else {
          console.log("❌ [COMPLETE BOOKING] User email not found");
        }
      })
      .catch(err => console.error("❌ [COMPLETE BOOKING] User lookup error:", err));

    res.status(200).json({ success: true, message: "Booking completed", data: booking });
  } catch (error) {
    console.error("❌ [COMPLETE BOOKING] Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  createBooking,
  getBooking,
  getAllBookings,
  cancelBooking,
  completeBooking,
};
