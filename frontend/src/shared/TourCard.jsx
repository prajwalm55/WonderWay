import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";
import { motion } from "framer-motion";

const TourCard = ({ tour }) => {
  const { photo, title, city, price, desc, _id, reviews, featured } = tour;
  const { avgRating } = CalculateAvg(reviews);

  return (
    <motion.div
      className="relative group rounded-2xl flex flex-col h-[400px] w-full bg-[#0b3d2e]/85 border border-[#065234]/30 shadow-sm overflow-hidden"
      whileHover={{ opacity: 0.98 }}
      transition={{ type: "spring", stiffness: 70, damping: 14 }}
    >
      {/* Neon Outline */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: "2px solid #00ff9c",
          opacity: 0,
          boxShadow: "0 0 10px rgba(0,255,160,0.3), 0 0 20px rgba(0,255,160,0.2) inset",
        }}
        animate={{ opacity: [0.25, 0.6, 0.25] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />

      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden rounded-t-2xl">
        <motion.img
          src={photo}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          whileHover={{ scale: 1.015 }}
        />
        {/* Light streak animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.0) 70%)",
            mixBlendMode: "overlay",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent rounded-t-2xl pointer-events-none"></div>

        {featured && (
          <p className="absolute pr-5 pl-3 text-white font-semibold py-1 top-3 right-0 rounded-l-full bg-[#00a86b] text-sm shadow-md">
            Featured
          </p>
        )}

        {/* Particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background:
              "radial-gradient(circle at 25% 25%, rgba(0,255,160,0.02) 0%, transparent 60%), radial-gradient(circle at 75% 75%, rgba(0,255,160,0.02) 0%, transparent 60%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 px-5 py-3 flex flex-col justify-between relative z-10">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between mb-1 text-sm text-gray-200">
            <p className="flex items-center gap-2 italic text-green-200">
              <FaMapMarkerAlt className="text-[#00ff9c]" /> {city}
            </p>
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <span className="text-gray-200 text-xs">
                {avgRating} ({reviews?.length ?? 0})
              </span>
            </div>
          </div>

          {/* Title */}
          <Link
            to={`/tours/${_id}`}
            className="block text-lg font-semibold tracking-wide text-white line-clamp-1 transition-colors duration-300 group-hover:text-[#00ff9c] group-hover:drop-shadow-[0_0_6px_rgba(0,255,160,0.7)]"
            style={{ fontFamily: "'Cinzel', serif" }}
            title={title}
          >
            {title}
          </Link>

          {/* Description */}
          <p
            className="text-gray-300 text-sm line-clamp-2 mt-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {desc}
          </p>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-3">
          <p
            className="text-sm font-semibold text-green-100"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            From <br />
            <span className="text-lg text-[#00ff9c] font-bold">₹{price}</span>
          </p>
          <Link
            to={`/tours/${_id}`}
            className="px-4 py-2 bg-gradient-to-r from-[#007a55] to-[#00a86b] text-white rounded-full transition-all duration-300 group-hover:brightness-125 text-sm font-semibold"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
