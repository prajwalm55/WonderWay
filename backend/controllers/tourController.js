import Tour from "../models/Tour.js";

// create new tour
export const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "tour created successfully",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to create tour",
      error: err.message,
    });
  }
};

// update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({
        success: false,
        message: "tour not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "tour updated successfully",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update tour",
      error: err.message,
    });
  }
};

// delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({
        success: false,
        message: "tour not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "tour deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete tour",
      error: err.message,
    });
  }
};

// get single tour with reviews
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate("reviews");

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "tour not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "tour fetched successfully",
      data: tour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to fetch tour",
      error: err.message,
    });
  }
};

// get all tours (pagination)
export const getAllTours = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = 8;

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to fetch tours",
      error: err.message,
    });
  }
};

// get featured tours
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to fetch featured tours",
      error: err.message,
    });
  }
};

// search tour by city
export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");

  try {
    const tours = await Tour.find({ city }).populate("reviews");

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to search tours",
      error: err.message,
    });
  }
};

// get total tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: tourCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to count tours",
      error: err.message,
    });
  }
};
