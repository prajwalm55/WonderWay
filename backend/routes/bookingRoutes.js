import express from 'express';
import { 
  createBooking, 
  getBooking, 
  getAllBookings, 
  completeBooking,
  createOrder,    
  verifyPayment    
} from '../controllers/bookingController.js';
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import Booking from '../models/Booking.js';

const router = express.Router();

// Payment routes
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

// Booking management
// Create booking (user)
router.post('/', verifyToken, createBooking);

// Get bookings (user-specific)
router.get('/', verifyToken, getAllBookings);

// Admin route: get all bookings
router.get('/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: bookings, count: bookings.length });
  } catch (error) {
    console.error("Admin getAllBookings error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get booking by ID (user or admin)
router.get('/:id', verifyToken, getBooking);

// Complete booking
router.patch('/:id/complete', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    if (booking.status === "cancelled") {
      return res.status(400).json({ success: false, message: "Cancelled booking cannot be completed" });
    }

    booking.status = "completed";
    booking.updatedAt = Date.now();
    await booking.save();

    res.status(200).json({ success: true, message: "Booking marked as completed" });
  } catch (error) {
    console.error("Complete booking error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Cancel booking (PATCH)
router.patch('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    if (booking.status === "cancelled") {
      return res.status(400).json({ success: false, message: "Booking already cancelled" });
    }

    booking.status = "cancelled";
    booking.updatedAt = Date.now();
    await booking.save();

    console.log("Booking cancelled:", booking._id);

    res.status(200).json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete booking (only cancelled or completed, admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    // Only ACTIVE bookings cannot be deleted
    if (booking.status === "active") {
      return res.status(400).json({ success: false, message: "Active bookings cannot be deleted" });
    }

    // Cancelled or Completed booking can be deleted
    await Booking.findByIdAndDelete(req.params.id);
    console.log("🗑️ Booking deleted:", booking._id);
    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get booking by bookingCode
router.get('/code/:bookingCode', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingCode: req.params.bookingCode });

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    if (booking.status === "cancelled") {
      return res.status(400).json({ success: false, message: "This booking has been cancelled" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("Error fetching booking by code:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
