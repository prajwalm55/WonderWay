import express from "express";
import {
  createReview,
  deleteReview,
  getReviews,
  getSingleReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Review Routes

// Add a new review for a specific tour (tourId is passed in the URL)
router.post("/:tourId", createReview);

// Get all reviews
router.get("/", getReviews);

// Get a single review by its ID
router.get("/:id", getSingleReview);

// Delete a review by its ID
router.delete("/:id", deleteReview);

export default router;
