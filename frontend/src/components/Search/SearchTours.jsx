import React, { useRef } from "react";
import BASE_URL from "../../utils/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const SearchTours = () => {
  const cityRef = useRef();
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const navigate = useNavigate();

  const SubmitHandler = () => {
    const searchTerm = cityRef.current.value.trim();
    const minPrice = minPriceRef.current?.value || 0;
    const maxPrice = maxPriceRef.current?.value || 1000000;

    if (!searchTerm) {
      toast.error("Please enter a destination ✈️");
      return;
    }

    navigate(
      `/tours/search?search=${encodeURIComponent(searchTerm)}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") SubmitHandler();
  };

  return (
    <motion.div
      className="w-full py-10 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className="text-3xl md:text-4xl font-bold mb-3 tracking-wide"
        style={{ fontFamily: "'Cinzel', serif", color: "#e2f4e9" }}
      >
        Find Your <span style={{ color: "#00a86b" }}>Next Adventure</span>
      </h2>
      <p
        className="text-green-100 text-sm md:text-base italic mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Discover the world, one journey at a time 🌍
      </p>

      <div className="max-w-[650px] mx-auto flex items-center bg-white/10 backdrop-blur-md border border-[#00a86b]/40 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300">
        <Search className="text-[#00a86b] ml-2" size={22} />
        <input
          type="search"
          ref={cityRef}
          onKeyPress={handleKeyPress}
          placeholder="Search tours or destinations..."
          className="flex-1 bg-transparent text-white placeholder:text-green-200 px-3 py-2 focus:outline-none text-[15px]"
        />
        <button
          onClick={SubmitHandler}
          className="bg-[#00a86b] hover:bg-[#00945f] text-white font-semibold px-6 py-2 rounded-full transition-all duration-300"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Search
        </button>
      </div>
    </motion.div>
  );
};

export default SearchTours;
