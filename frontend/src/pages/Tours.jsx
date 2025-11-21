// Tours.jsx 
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import TourCard from "../shared/TourCard";
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import back4 from "../assets/images/bac4.png";

const PREMIUM_ACCENT_GREEN = "#6ee7b7";
const DARK_GREEN_BG = "#00291e";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [navHeight, setNavHeight] = useState(0);

  const { apiData: tours = [], error } = useFetch(`${BASE_URL}/tour?page=${page}`);
  const { apiData: tourCount = 0 } = useFetch(`${BASE_URL}/tour/count`);
  const navigate = useNavigate();

  useEffect(() => {
    setPageCount(Math.ceil((tourCount || 0) / 8));
    window.scrollTo(0, 0);
  }, [page, tourCount]);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) setNavHeight(header.offsetHeight);
  }, []);

  const notifyError = (msg) =>
    toast.error(msg, {
      toastId: "tour-search-error",
      autoClose: 2500,
      transition: Slide,
      style: {
        background: "#8b0000",
        color: "#f4fff4",
        border: "1px solid #ff4444",
        borderRadius: "12px",
      },
    });

  const notifyWarning = (msg) =>
    toast.warning(msg, {
      toastId: "tour-search-warning",
      autoClose: 2500,
      transition: Slide,
      style: {
        background: "#004d33",
        color: "#f4fff4",
        border: "1px solid #00a86b",
        borderRadius: "12px",
      },
    });

  const SubmitHandler = async (searchTerm) => {
    if (!searchTerm) return notifyError("Please enter a destination ✈️");

    try {
      const response = await fetch(
        `${BASE_URL}/tour/search?city=${encodeURIComponent(searchTerm)}&page=0`
      );
      const result = await response.json();

      if (!response.ok || !result.data?.length) {
        notifyWarning("No tours found!");
        return;
      }

      navigate(`/tours/search?city=${encodeURIComponent(searchTerm)}`, {
        state: { tours: result.data, total: result.count },
      });
    } catch {
      notifyError("Something went wrong!");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative text-white min-h-screen overflow-hidden">

      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: DARK_GREEN_BG,
          backgroundImage: `linear-gradient(145deg, rgba(0,41,31,0.95), rgba(0,77,47,0.9)), url(${back4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          backgroundAttachment: "fixed",
          filter: "blur(4px)",
          transform: "scale(1.04)",
        }}
      />

      {/* CONTENT */}
      <motion.div
        className="relative z-20 max-w-[1400px] mx-auto px-4 pb-16"
        style={{ paddingTop: `${navHeight + 40}px` }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        {/* Search Bar */}
        <motion.div
          className="max-w-full sm:max-w-[650px] mx-auto flex flex-col sm:flex-row items-center bg-[#0b3d2e]/70 backdrop-blur-md border border-[#00ff9c]/50 rounded-full px-4 py-2 shadow-sm hover:shadow-[0_0_20px_rgba(0,255,160,0.25)] transition-all duration-300 mb-12 gap-2 sm:gap-0"
          variants={cardVariants}
        >
          <Search className="text-[#00ff9c] ml-2" size={22} />
          <input
            type="search"
            placeholder="Search tours or destinations..."
            className="flex-1 bg-transparent text-white placeholder:text-green-200 px-3 py-2 focus:outline-none text-[14px] sm:text-[15px] text-center sm:text-left"
            onKeyDown={(e) => e.key === "Enter" && SubmitHandler(e.target.value)}
          />
          <button
            onClick={() => {
              const val = document.querySelector("input[type=search]").value;
              SubmitHandler(val);
            }}
            className="bg-gradient-to-r from-[#007a55] to-[#00a86b] text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:brightness-110 mt-2 sm:mt-0"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Search
          </button>
        </motion.div>

        {/* Heading */}
        <motion.div className="text-center mb-12" variants={cardVariants}>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-md"
            style={{ fontFamily: "'Cinzel', serif", color: "#e3f7e3" }}
          >
            Explore <span style={{ color: "#00a86b" }}>Our Tours</span>
          </h1>
        </motion.div>

        {/* Tours Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {error && <h4 className="text-red-400 w-full text-center">{error}</h4>}

          {!error && tours.length > 0 ? (
            tours.map((tour) => (
              <motion.div
                key={tour._id}
                variants={cardVariants}
                whileHover={{ scale: window.innerWidth > 768 ? 1.015 : 1 }}
                transition={{ type: "spring", stiffness: 70 }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))
          ) : (
            <p className="text-white text-center w-full text-lg">No tours found.</p>
          )}
        </motion.div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex flex-wrap items-center justify-center mt-12 gap-3">
            {[...Array(pageCount).keys()].map((number) => (
              <span
                key={number}
                onClick={() => setPage(number)}
                className={`px-4 py-2 rounded-md cursor-pointer transition-all duration-300 ${
                  page === number
                    ? "bg-[#00a86b] text-white shadow-md scale-105"
                    : "bg-white/20 text-green-100 hover:bg-[#00a86b]/70 hover:text-white"
                }`}
              >
                {number + 1}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      <style>
        {`
          html, body {
            background-color: ${DARK_GREEN_BG} !important;
          }
        `}
      </style>
    </section>
  );
};

export default Tours;
