import Booking from "../models/Booking.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. CREATE RAZORPAY ORDER
const createOrder = async (req, res) => {
  console.log("💰 Order Request:", req.body);
  const { amount, currency = "INR", receipt } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount specified." });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("❌ Razorpay order error:", error);
    res.status(500).json({ message: "Internal Server Error (Order)" });
  }
};

// 2. VERIFY PAYMENT + SAVE BOOKING
const verifyPayment = async (req, res) => {
  console.log("🔒 Verification Request:", req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Missing verification details." });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  try {
    const newBooking = new Booking({
      ...bookingData,
      paymentStatus: "paid",
      paymentId: razorpay_payment_id,
    });

    await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Payment verified, booking saved",
      bookingId: newBooking.bookingCode,
      data: newBooking,
    });
  } catch (error) {
    console.error("❌ Save booking error:", error);
    res.status(500).json({ message: "DB save failed" });
  }
};

// 3. CREATE BOOKING (UNPAID)
const createBooking = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { fullName, phone, date, totalPrice, tourName, maxGroupSize } = req.body;

    const newBooking = new Booking({
      userId,
      fullName,
      phone,
      date,
      totalPrice,
      tourName,
      maxGroupSize,
      status: "active",
      paymentStatus: "pending",
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created (Pending Payment)",
      newBooking,
    });
  } catch (error) {
    console.error("❌ createBooking error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 4. GET ONE BOOKING
const getBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user?.id;

    const booking = await Booking.findOne({
      $or: [{ userId }, { bookingCode: id }],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("❌ getBooking error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 5. GET ALL BOOKINGS FOR USER
const getAllBookings = async (req, res) => {
  try {
    const userId = req.user?.id;

    const bookings = await Booking.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: bookings, count: bookings.length });
  } catch (error) {
    console.error("❌ getAllBookings error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 6. DELETE BOOKING (ADMIN ONLY)
// CANCELLED + COMPLETED allowed
const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // ADMIN CHECK
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete bookings",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "active") {
      return res.status(400).json({
        success: false,
        message: "Active bookings cannot be deleted",
      });
    }

    // COMPLETED or CANCELLED ALLOWED
    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully (Admin)",
    });

  } catch (error) {
    console.error("❌ deleteBooking error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 7. COMPLETE BOOKING
const completeBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Cancelled booking cannot be completed",
      });
    }

    booking.status = "completed";
    booking.updatedAt = Date.now();

    await booking.save();

    res.status(200).json({ success: true, message: "Booking marked as completed" });

  } catch (error) {
    console.error("❌ completeBooking error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createBooking,
  getBooking,
  getAllBookings,
  deleteBooking,
  completeBooking,
  createOrder,
  verifyPayment,
};
