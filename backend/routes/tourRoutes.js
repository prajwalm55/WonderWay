import express from "express";
import {
  getAllTours,
  getSingleTour,
  createTour,
  updateTour,
  deleteTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} from "../controllers/tourController.js";

import { verifyAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes

// Get all tours with pagination support
// Example: /api/tours?page=0
router.get("/", getAllTours);

// Search tours by city name (with pagination)
// Example: /api/tours/search?city=Goa&page=0
router.get("/search", getTourBySearch);

// Get top featured tours (limited to 8)
router.get("/featured", getFeaturedTour);

// Get total count of available tours
router.get("/count", getTourCount);

// Get detailed information of a single tour (includes reviews)
router.get("/:id", getSingleTour);

// Admin-Only Routes

// Create a new tour (accessible only to admins)
router.post("/", verifyToken, verifyAdmin, createTour);

// Update an existing tour (accessible only to admins)
router.put("/:id", verifyToken, verifyAdmin, updateTour);

// Delete a tour (accessible only to admins)
router.delete("/:id", verifyToken, verifyAdmin, deleteTour);

export default router;
