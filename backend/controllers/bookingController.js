import Booking from "../models/Booking.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User.js";
import { sendEmail, bookingConfirmedEmail, bookingCancelledEmail } from "../utils/email.js";

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ----------------------------
// 1. CREATE ORDER
// ----------------------------
const createOrder = async (req, res) => {
  console.log("🟡 [ORDER REQUEST BODY] =", req.body);
  const { amount, currency = "INR" } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt: "receipt_" + Date.now(),
    });
    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.log("❌ Razorpay Error:", error);
    res.status(500).json({ message: "Razorpay error" });
  }
};

// ----------------------------
// 2. VERIFY PAYMENT + SAVE BOOKING + SEND CONFIRMATION EMAIL
// ----------------------------
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  try {
    const newBooking = new Booking({
      ...bookingData,
      paymentStatus: "paid",
      paymentId: razorpay_payment_id,
      status: "active",
    });

    await newBooking.save();

    const user = await User.findById(newBooking.userId);
    if (user?.email) {
      await sendEmail(user.email, "Booking Confirmed ✔", bookingConfirmedEmail(newBooking));
    }

    res.status(200).json({
      success: true,
      message: "Payment verified, booking saved",
      bookingId: newBooking.bookingCode,
      data: newBooking,
    });
  } catch (error) {
    console.log("❌ Save booking error:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// ----------------------------
// 3. CREATE BOOKING WITHOUT PAYMENT
// ----------------------------
const createBooking = async (req, res) => {
  const userId = req.user?.id;

  try {
    const booking = new Booking({
      userId,
      ...req.body,
      status: "active",
      paymentStatus: "pending",
    });

    await booking.save();

    const user = await User.findById(userId);
    if (user?.email) {
      await sendEmail(user.email, "Booking Created (Pending Payment)", bookingConfirmedEmail(booking));
    }

    res.status(201).json({
      success: true,
      message: "Booking created (pending payment)",
      booking,
    });
  } catch (error) {
    console.log("❌ createBooking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------
// 4. GET SINGLE BOOKING
// ----------------------------
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      $or: [{ bookingCode: req.params.id }, { _id: req.params.id }],
    });

    if (!booking) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------
// 5. GET ALL BOOKINGS FOR USER
// ----------------------------
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------
// 6. CANCEL BOOKING
// ----------------------------
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    booking.updatedAt = Date.now();
    await booking.save();

    const user = await User.findById(booking.userId);
    const recipientEmail = user?.email;
    if (recipientEmail) {
      await sendEmail(recipientEmail, "Booking Cancelled ❌", bookingCancelledEmail(booking));
    }

    res.status(200).json({ success: true, message: "Booking cancelled", data: booking });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------
// 7. COMPLETE BOOKING
// ----------------------------
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });

    booking.status = "completed";
    booking.updatedAt = Date.now();
    await booking.save();

    const user = await User.findById(booking.userId);
    if (user?.email) {
      await sendEmail(
        user.email,
        "Trip Completed 🎉",
        `<h2>Thanks for Traveling With Us!</h2><p><b>Booking Code:</b> ${booking.bookingCode}</p><p>Your trip is now marked as completed.</p>`
      );
    }

    res.status(200).json({ success: true, message: "Booking completed", data: booking });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {
  createOrder,
  verifyPayment,
  createBooking,
  getBooking,
  getAllBookings,
  cancelBooking,
  completeBooking,
};
