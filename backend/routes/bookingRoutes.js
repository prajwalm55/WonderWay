import Booking from "../models/Booking.js";
import express from "express";
import {
  createBooking,
  getBooking,
  getAllBookings,
  completeBooking,
  createOrder,
  verifyPayment,
  cancelBooking
} from "../controllers/bookingController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Payment
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

// Booking routes
router.post("/", verifyToken, createBooking);            // Create booking + confirm email
router.get("/", verifyToken, getAllBookings);           // Get user-specific bookings
router.get("/:id", verifyToken, getBooking);            // Get single booking
router.patch("/:id/cancel", verifyToken, cancelBooking);// Cancel + cancel email
router.patch("/:id/complete", verifyToken, verifyAdmin, completeBooking); // Complete booking

// Admin route: get all bookings
router.get("/admin/all", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: bookings, count: bookings.length });
  } catch (error) {
    console.error("Admin getAllBookings error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
