// src/components/Booking/Booking.jsx
import React, { useState, useContext, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { toast, Slide } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ticketImg from "../../assets/images/tickets.png";

// --- Theme & color constants ---
const PREMIUM_ACCENT = "#6ee7b7";
const DARK_GREEN_CARD_BG = "rgba(18, 55, 42, 0.95)";
const SUCCESS_BG = "#004d33";
const ERROR_BG = "#8b0000";
const ACCENT_GREEN = "#00a86b";
const ACCENT_RED = "#ff4444";
const ACCENT_WARNING = "#facc15";

// Helper function to show toast notifications
const notify = (message, type = "success", id = "booking-alert") => {
  toast.dismiss(id);
  let styleProps = {};
  let toastFn = toast.success;

  switch (type) {
    case "error":
      toastFn = toast.error;
      styleProps = { background: ERROR_BG, border: `1px solid ${ACCENT_RED}` };
      break;
    case "warning":
      toastFn = toast.warn;
      styleProps = {
        background: DARK_GREEN_CARD_BG,
        border: `1px solid ${ACCENT_WARNING}`,
        color: ACCENT_WARNING,
      };
      break;
    case "success":
    default:
      toastFn = toast.success;
      styleProps = { background: SUCCESS_BG, border: `1px solid ${ACCENT_GREEN}` };
      break;
  }

  // Show the toast
  toastFn(message, {
    toastId: id,
    position: "top-right",
    autoClose: 2500,
    transition: Slide,
    style: {
      ...styleProps,
      color: styleProps.color || "#f4fff4",
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: "600",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    },
  });
};

// Booking component
const Booking = ({ price, title, reviewsArray, avgRating }) => {
  const currentDate = new Date().toISOString().split("T")[0]; 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 

  // Booking form state
  const [data, setData] = useState({
    userId: user ? user._id : null,
    tourName: title,
    fullName: "",
    totalPrice: price,
    phone: "",
    maxGroupSize: 1,
    bookAt: currentDate,
    date: "",
  });

  const numericPrice = parseFloat(price) || 0; // Convert price to number
  const calculatedPrice = data.maxGroupSize * numericPrice; // Calculate total price

  // Update total price whenever number of people or tour title changes
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      tourName: title,
      totalPrice: calculatedPrice,
    }));
  }, [title, calculatedPrice]);

  // Handle input changes
  const handleChange = (e) => {
    let value = e.target.value;
    const { id } = e.target;

    // Ensure maxGroupSize is an integer
    if (id === "maxGroupSize") value = parseInt(value) || 1;

    setData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!user) return notify("⚠️ Please Sign In first", "error");
    if (data.maxGroupSize <= 0) return notify("Number of persons must be at least 1.", "error");
    if (!data.date) return notify("Please select a date for booking.", "error");
    if (!data.fullName || !data.phone) return notify("Please fill in Full Name and Contact No.", "error");

    try {
      // Prepare booking data for payment page
      const bookingDataToSend = {
        amount: calculatedPrice,
        tourName: data.tourName,
        maxGroupSize: data.maxGroupSize,
        phone: data.phone,
        date: data.date,
        fullName: data.fullName,
      };

      // Show success notification & redirect to payment page
      notify("Proceeding to Payment Gateway...", "success");
      navigate("/payment", { state: bookingDataToSend });
    } catch (err) {
      console.error("Booking submission error:", err);
      notify("An unexpected error occurred during redirection.", "error");
    }
  };

  return (
    <section className="relative">
      {/* Booking Card container */}
      <motion.div
        className="p-8 md:p-10 rounded-2xl border border-green-800/40 shadow-2xl shadow-black/80 backdrop-blur-md text-white"
        style={{ background: DARK_GREEN_CARD_BG }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Booking Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold drop-shadow-md tracking-wider"
            style={{ fontFamily: "'Cinzel', serif", color: "white" }}
          >
            Confirm Your <span style={{ color: PREMIUM_ACCENT }}>Booking</span>
          </h1>
          <p
            className="mt-3 text-gray-300 text-base md:text-lg italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Reservation for: <span style={{ color: PREMIUM_ACCENT }}>{title}</span>
          </p>
        </div>

        {/* Price & Ratings */}
        <div className="flex justify-between items-center pb-4 border-b border-green-700/40 mb-8">
          <h3
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Cinzel', serif", color: PREMIUM_ACCENT }}
          >
            ₹{numericPrice}{" "}
            <span className="text-base font-normal text-gray-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              / per person
            </span>
          </h3>
          <div className="flex items-center gap-2 text-green-400">
            <FaStar />
            <span className="flex gap-1 font-semibold text-gray-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <div>{avgRating}</div>
              <div>({reviewsArray.length})</div>
            </span>
          </div>
        </div>

        {/* Booking Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Full Name & Contact Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg bg-black/40 placeholder-gray-400 text-white border border-green-700/50 focus:ring-2 focus:ring-green-400 focus:outline-none transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
            <input
              type="text"
              placeholder="Contact No."
              id="phone"
              required
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg bg-black/40 placeholder-gray-400 text-white border border-green-700/50 focus:ring-2 focus:ring-green-400 focus:outline-none transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
          </div>

          {/* Number of Persons & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="number"
              placeholder="Number of Persons"
              id="maxGroupSize"
              required
              min="1"
              value={data.maxGroupSize}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg bg-black/40 placeholder-gray-400 text-white border border-green-700/50 focus:ring-2 focus:ring-green-400 focus:outline-none transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
            <input
              type="date"
              id="date"
              required
              min={currentDate}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-lg bg-black/40 placeholder-gray-400 text-white border border-green-700/50 focus:ring-2 focus:ring-green-400 focus:outline-none transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            />
          </div>

          {/* Price Summary */}
          <div className="mt-8 space-y-3 text-gray-300 pt-4 border-t border-green-700/30" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <div className="flex justify-between pb-2">
              <span className="text-lg">Price Per Person:</span>
              <span className="font-semibold text-xl text-white">₹{numericPrice}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-green-700/30">
              <span className="text-lg">Total Persons:</span>
              <span className="font-semibold text-xl text-white">{data.maxGroupSize}</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-3" style={{ color: PREMIUM_ACCENT }}>
              <span>Total Payable:</span>
              <span>₹{calculatedPrice}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 italic">
              <span>(Includes all applicable taxes)</span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 bg-gradient-to-r from-green-900 to-green-700 hover:from-green-700 hover:to-green-500 text-white font-bold text-lg px-6 py-3 rounded-lg shadow-xl transition duration-300 tracking-wider"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Proceed to Payment
          </motion.button>
        </motion.form>

        {/* Ticket Preview */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Cinzel', serif", color: PREMIUM_ACCENT }}>
            Your Reservation Preview
          </h2>
          <motion.img
            src={ticketImg}
            alt="WanderWay Ticket"
            className="rounded-xl shadow-2xl shadow-black/50 mx-auto w-full max-w-[500px] sm:max-w-[400px] xs:max-w-[300px] border border-green-700/40"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 80 }}
          />
          <p className="mt-4 text-gray-300 text-base italic font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            ✈️ Secure Booking – WanderWay | Today's Date: {currentDate}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Booking;
