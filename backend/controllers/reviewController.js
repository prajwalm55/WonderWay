import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

// create review
export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });

  try {
    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "review added",
      data: savedReview,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get single review
export const getSingleReview = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "review not found",
      });
    }

    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// delete review
export const deleteReview = async (req, res) => {
  const id = req.params.id;

  try {
    await Review.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "review deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
