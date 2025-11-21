import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../utils/config";
import profileLogo from "../assets/images/profilelogo1.png";

const ReviewSection = ({ tourId }) => {
  const { user, token } = useContext(AuthContext);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("");

  // fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/reviews/${tourId}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit new review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setType("error");
      setMessage("Please sign in to write a review.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/reviews/${tourId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviewText, rating }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setType("success");
      setMessage("Review submitted successfully!");
      setReviewText("");
      setRating(5);
      fetchReviews();
    } catch (err) {
      setType("error");
      setMessage(err.message || "Something went wrong!");
    }

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="relative bg-white shadow-md rounded-2xl p-5 mt-6">
      <h2 className="text-xl font-semibold mb-3">Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
        <textarea
          className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-400"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        ></textarea>

        <input
          type="number"
          min="1"
          max="5"
          className="border rounded-xl p-2 w-24"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-[-50px] left-0 right-0 mx-auto w-fit px-4 py-2 rounded-xl text-white ${
              type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review List */}
      <div className="space-y-3">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div
              key={r._id}
              className="border p-3 rounded-xl bg-gray-50 shadow-sm flex gap-3 items-start"
            >
              {/* Profile Image */}
              <img
                src={r.profileImg || profileLogo}
                alt={r.username || "Anonymous"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{r.username || "Anonymous"}</p>
                <p className="text-sm text-gray-600">⭐ {r.rating}/5</p>
                <p>{r.reviewText}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;

