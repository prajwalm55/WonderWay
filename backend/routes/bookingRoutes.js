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

// ----------------------------
// PAYMENT ROUTES
// ----------------------------
router.post("/create-order", (req, res) => {
  console.log("🟡 [ROUTER] /create-order called, body:", req.body);
  createOrder(req, res);
});
router.post("/verify-payment", (req, res) => {
  console.log("🟡 [ROUTER] /verify-payment called, body:", req.body);
  verifyPayment(req, res);
});

// ----------------------------
// BOOKING ROUTES
// ----------------------------
router.post("/", verifyToken, (req, res) => {
  console.log("🟡 [ROUTER] POST / booking creation, body:", req.body, "user:", req.user);
  createBooking(req, res);
});

router.get("/", verifyToken, (req, res) => {
  console.log("🟡 [ROUTER] GET / all user bookings, user:", req.user?.id);
  getAllBookings(req, res);
});

router.get("/:id", verifyToken, (req, res) => {
  console.log("🟡 [ROUTER] GET /:id single booking, id:", req.params.id);
  getBooking(req, res);
});

router.patch("/:id/cancel", verifyToken, (req, res) => {
  console.log("🟡 [ROUTER] PATCH /:id/cancel booking, id:", req.params.id);
  cancelBooking(req, res);
});

router.patch("/:id/complete", verifyToken, verifyAdmin, (req, res) => {
  console.log("🟡 [ROUTER] PATCH /:id/complete booking, id:", req.params.id);
  completeBooking(req, res);
});

// ----------------------------
// DELETE BOOKING (ADMIN)
// ----------------------------
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  console.log("🟡 [ROUTER] DELETE /:id booking, id:", req.params.id);
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      console.log("❌ [DELETE] Booking not found");
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    await booking.deleteOne();
    console.log("✅ [DELETE] Booking deleted:", req.params.id);
    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("❌ [DELETE] Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ----------------------------
// ADMIN: GET ALL BOOKINGS
// ----------------------------
router.get("/admin/all", verifyToken, verifyAdmin, async (req, res) => {
  console.log("🟡 [ROUTER] GET /admin/all bookings");
  try {
    const bookings = await Booking.find().sort({ updatedAt: -1 });
    console.log("✅ [ROUTER] Found bookings:", bookings.length);
    res.status(200).json({ success: true, data: bookings, count: bookings.length });
  } catch (error) {
    console.error("❌ [ADMIN GET ALL] Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

// ----------------------------
// GET BOOKING BY BOOKING CODE
// ----------------------------
router.get("/code/:bookingCode", async (req, res) => {
  console.log("🟡 [ROUTER] GET /code/:bookingCode, code:", req.params.bookingCode);
  try {
    const booking = await Booking.findOne({ bookingCode: req.params.bookingCode });

    if (!booking) {
      console.log("❌ [CODE] Booking not found");
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      console.log("⚠️ [CODE] Booking cancelled:", req.params.bookingCode);
      return res.status(400).json({ success: false, message: "This booking has been cancelled" });
    }

    console.log("✅ [CODE] Booking found:", booking.bookingCode);
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("❌ [CODE] Error fetching booking by code:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

export default router;
