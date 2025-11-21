import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TourCard from "../shared/TourCard";
import { toast } from "react-toastify";
import BASE_URL from "../utils/config";
import { motion } from "framer-motion";
import back4 from "../assets/images/bac4.png";

const SearchResultList = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city") || "";

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) setNavHeight(header.offsetHeight);
  }, []);

  // Fetching Tours
  useEffect(() => {
    const fetchData = async () => {
      if (!city) return setData([]);

      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/tour/search?city=${city}&page=${page}`);
        const result = await res.json();

        if (!res.ok || !Array.isArray(result.data) || result.data.length === 0) {
          toast.warning("No tours found!");
          setData([]);
          setTotal(0);
        } else {
          setData(result.data);
          setTotal(result.count);
        }
      } catch (err) {
        toast.error("Something went wrong!");
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [city, page]);

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const totalPages = Math.ceil(total / 8);

  return (
    <section className="relative text-white min-h-screen overflow-hidden">

      {/*  PREMIUM BG  */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(160deg, rgba(0,30,20,0.92), rgba(0,90,55,0.88)),
            url(${back4})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "blur(4px)",
          transform: "scale(1.07)",
        }}
      />

      {/* Green Overlay */}
      <div className="absolute inset-0 bg-[#003322]/40 z-0"></div>

      {/*  MAIN CONTENT  */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 pb-16"
        style={{ paddingTop: `${navHeight + 55}px` }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        <motion.h1
          variants={cardVariants}
          className="
            text-[30px] 
            sm:text-[38px] 
            md:text-[50px] 
            font-bold 
            font-[Poppins]
            text-center 
            mb-12
            tracking-wide
          "
        >
          <span className="text-[#e6ffe6]">Search</span>{" "}
          <span className="text-[#00a86b]">Results</span>
        </motion.h1>

        {/* Tours Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {loading ? (
            <p className="text-center text-lg col-span-full">Loading tours...</p>
          ) : data.length === 0 ? (
            <p className="text-center text-lg col-span-full">No tours found.</p>
          ) : (
            data.map((tour) => (
              <motion.div
                key={tour._id}
                variants={cardVariants}
                whileHover={{
                  scale: window.innerWidth > 768 ? 1.03 : 1,
                }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center mt-12 gap-3">
            {[...Array(totalPages).keys()].map((number) => (
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
    </section>
  );
};

export default SearchResultList;
