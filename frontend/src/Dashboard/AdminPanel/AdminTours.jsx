import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import AdminToursCards from "../../shared/AdminToursCards";
import back4 from "../../assets/images/bac4.png";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const AdminTours = () => {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [toursData, setToursData] = useState([]);

  const { apiData: tours, error: toursError } = useFetch(
    `${BASE_URL}/tour?page=${page}`
  );
  const { apiData: tourCount, error: countError } = useFetch(
    `${BASE_URL}/tour/count`
  );

  useEffect(() => {
    if (tours) setToursData(tours);
  }, [tours]);

  useEffect(() => {
    if (tourCount) setPageCount(Math.ceil(tourCount / 8));
    window.scrollTo(0, 0);
  }, [tourCount]);

  const removeTourFromUI = (id) => {
    setToursData((prev) => prev.filter((tour) => tour._id !== id));
  };

  return (
    <div className="min-h-screen flex items-start justify-center relative pt-28 px-4 md:px-0 overflow-x-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(145deg, rgba(0,41,31,0.95), rgba(0,77,47,0.9)), url(${back4})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      ></div>

      <motion.div
        className="w-full max-w-6xl bg-[#00391f]/90 p-4 md:p-10 rounded-2xl shadow-2xl overflow-y-auto"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {(toursError || countError) && (
          <p className="text-red-500 mb-4 text-center">
            Error loading tours. Please try again later.
          </p>
        )}

        {/* Header row for large screens */}
        <div
          className="hidden md:grid grid-cols-8 gap-2 mb-3 text-white font-semibold text-center"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <p>S.No</p>
          <p>Image</p>
          <p className="text-left">Title</p>
          <p>City</p>
          <p>Featured</p>
          <p>Max People</p>
          <p>Reviews</p>
          <p>Actions</p>
        </div>

        {/* Cards container */}
        <div className="flex flex-col gap-4 md:gap-2">
          {toursData && toursData.length > 0 ? (
            toursData.map((tour, idx) => (
              <AdminToursCards
                key={tour._id}
                tour={tour}
                index={idx + 1 + page * 8}
                removeTourFromUI={removeTourFromUI}
              />
            ))
          ) : (
            <p
              className="text-center text-gray-300 py-6 text-base"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              No tours found. Create some tours first.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-center mt-6 gap-3">
          {pageCount > 0 &&
            [...Array(pageCount).keys()].map((number) => (
              <motion.span
                key={number}
                onClick={() => setPage(number)}
                className={`cursor-pointer px-3 py-1 rounded transition-all text-sm sm:text-base ${
                  page === number
                    ? "bg-green-700 text-white"
                    : "bg-green-800 text-green-300 hover:bg-green-700 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {number + 1}
              </motion.span>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminTours;
