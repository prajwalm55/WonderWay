// --- src/pages/TourDetails.jsx ---
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.jpg";
import darkGreenBg from "../assets/images/bac4.png"; 
import {
  FaStar,
  FaMapPin,
  FaCity,
  FaDollarSign,
  FaUsers,
  FaLocationArrow,
} from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";
import Booking from "../components/Booking/Booking"; 
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import { toast, Slide } from "react-toastify"; 

// --- THEME CONSTANTS ---
const PREMIUM_ACCENT_GREEN = "#6ee7b7"; 
const SUCCESS_BG = "#004d33";
const ERROR_BG = "#8b0000";  
const SUBTLE_CARD_BG = "rgba(11, 61, 46, 0.90)"; 

const TourDetails = () => {
  const { user, token } = useContext(AuthContext);
  const reviewMsgRef = useRef();
  const [tourRating, setTourRating] = useState(null);
  const [localReviews, setLocalReviews] = useState([]);
  const { id } = useParams();
  const [navHeight, setNavHeight] = useState(0); 

  const { apiData: tour } = useFetch(`${BASE_URL}/tour/${id}`, { method: "GET" });

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) setNavHeight(header.offsetHeight);

    if (tour?.reviews) setLocalReviews(tour.reviews);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tour]);

  const {
    title = "",
    desc = "",
    price = "",
    city = "",
    distance = "",
    maxGroupSize = "",
    address = "",
    photo = "",
  } = tour || {};
  const { avgRating } = CalculateAvg(localReviews);
  const options = { day: "numeric", month: "long", year: "numeric" };
  
  // Toast helper
  const notify = (message, type) => {
    toast.dismiss("tour-detail-alert");
    const isSuccess = type === 'success';
    const isError = type === 'error' || type === 'warning';
    const baseStyle = {
      fontFamily: "'Cormorant Garamond', serif", 
      fontWeight: "600",
      borderRadius: "12px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
    };
    let customStyle = {};
    if (isSuccess) {
      customStyle = { background: SUCCESS_BG, color: "#f4fff4", border: "1px solid #00a86b" };
    } else if (isError) {
      customStyle = { background: ERROR_BG, color: "#f4fff4", border: "1px solid #ff4444" };
    } else {
      customStyle = { background: SUBTLE_CARD_BG, color: PREMIUM_ACCENT_GREEN, border: `1px solid ${PREMIUM_ACCENT_GREEN}` };
    }
    toast(message, { toastId: "tour-detail-alert", position: "top-right", autoClose: 2500, transition: Slide, type: type, style: { ...baseStyle, ...customStyle } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    if (!user) return notify("⚠️ Please sign in first!", "warning");
    if (!tourRating) return notify("Please select a rating before submitting!", "error");

    const newReview = { username: user.username, reviewText, rating: tourRating, createdAt: new Date().toISOString() };
    try {
      const response = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newReview),
      });
      const result = await response.json();
      if (response.ok) {
        notify("Review submitted successfully!", "success");
        setLocalReviews((prev) => [newReview, ...prev]); 
        reviewMsgRef.current.value = "";
        setTourRating(null);
      } else {
        notify(result.message || "Failed to submit review", "error"); 
      }
    } catch {
      notify("Server error! Please try again later.", "error"); 
    }
  };

  return (
    <section className="relative text-white min-h-screen overflow-hidden">

      {/* Fixed BG */}
      <div className="fixed inset-0 z-0" style={{ backgroundImage: `url(${darkGreenBg}), linear-gradient(145deg, rgba(0,41,31,0.95), rgba(0,70,40,0.9))`, backgroundBlendMode:'multiply', backgroundSize:"cover", backgroundAttachment:"fixed", backgroundPosition:"center center", backgroundRepeat:"no-repeat", filter:"blur(2px)", transform:"scale(1.02)"}} />
      <div className="absolute inset-0 bg-[#004d33]/60 z-0"></div>

      <motion.div
        className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-10 py-12 md:py-14"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ paddingTop: `${navHeight + 30}px` }}
      >

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          {/* Tour Details + Reviews */}
          <div className="w-full lg:w-2/5 space-y-6">

            {/* Image Card */}
            <motion.div className="rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-green-600/50 backdrop-blur-md" style={{ background: SUBTLE_CARD_BG }} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 80 }}>
              <img src={photo} alt={title} className="w-full h-[280px] sm:h-[320px] md:h-[340px] object-cover transition-all duration-500 hover:scale-[1.03]" />
            </motion.div>

            {/* Tour Info */}
            <div className="p-4 sm:p-6 rounded-xl border border-green-700/40 backdrop-blur-md shadow-xl shadow-black/40" style={{ background: SUBTLE_CARD_BG }}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 border-b pb-1 sm:pb-2 border-green-700/50" style={{ fontFamily:"'Cinzel', serif", color: PREMIUM_ACCENT_GREEN }}>{title}</h2>
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 text-white" style={{ fontFamily:"'Cormorant Garamond', serif" }}>
                <span className="flex items-center gap-1 sm:gap-2 text-green-300"><FaStar style={{ color: PREMIUM_ACCENT_GREEN }} /> <span className="text-white font-medium">{avgRating} ({localReviews.length})</span></span>
                <span className="flex items-center gap-1 sm:gap-2 text-green-300"><FaMapPin /> <span className="text-white font-medium">{address}</span></span>
                <span className="flex items-center gap-1 sm:gap-2 text-green-300"><FaCity /> <span className="text-white font-medium">{city}</span></span>
                <span className="flex items-center gap-1 sm:gap-2 text-green-300"><FaLocationArrow /> <span className="text-white font-medium">{distance} km</span></span>
                <span className="flex items-center gap-1 sm:gap-2 text-green-300"><FaDollarSign /> <span className="text-white font-medium">₹{price}/head</span></span>
                <span className="flex items-center gap-1 sm:gap-2 text-green-300"><FaUsers /> <span className="text-white font-medium">{maxGroupSize} Persons</span></span>
              </div>
              <p className="text-green-50 text-xs sm:text-sm md:text-base leading-relaxed pt-2 sm:pt-3 mt-2 border-t border-green-700/20" style={{ fontFamily:"'Cormorant Garamond', serif" }}>{desc}</p>
            </div>

            {/* Reviews */}
            <div className="p-4 sm:p-6 rounded-xl border border-green-700/40 backdrop-blur-md shadow-xl shadow-black/40" style={{ background: SUBTLE_CARD_BG }}>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 border-b pb-1 sm:pb-2 border-green-700/50" style={{ fontFamily:"'Cinzel', serif", color: PREMIUM_ACCENT_GREEN }}>Traveler Reviews <span className="text-green-300">({localReviews.length})</span></h3>

              <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex gap-1 mb-2 sm:mb-3 text-sm">
                  {[1,2,3,4,5].map((num)=>(
                    <span key={num} onClick={()=>setTourRating(num)} className={`cursor-pointer text-lg sm:text-xl transition-colors ${tourRating >= num ? "text-green-400" : "text-gray-600 hover:text-green-300"}`}><FaStar /></span>
                  ))}
                </div>
                <div className="flex border border-green-700/50 rounded-full overflow-hidden">
                  <input ref={reviewMsgRef} type="text" placeholder="Share your experience..." className="flex-1 bg-black/40 text-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none placeholder-green-200/70" style={{ fontFamily:"'Cormorant Garamond', serif" }} />
                  <motion.button type="submit" whileHover={{scale:1.05}} whileTap={{scale:0.95}} className="bg-gradient-to-r from-green-900 to-green-700 hover:from-green-700 hover:to-green-500 transition-all px-4 sm:px-6 text-white font-semibold text-xs sm:text-sm" style={{ fontFamily:"'Cinzel', serif" }}>Submit</motion.button>
                </div>
              </form>

              {localReviews.map((review,i)=>(
                <motion.div key={i} className="border-t border-green-700/30 py-2 sm:py-3" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:i*0.05}}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img src={avatar} alt="user" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-green-600/60 object-cover shadow-lg" />
                    <div>
                      <h5 className="font-semibold text-white text-sm sm:text-base" style={{ fontFamily:"'Cinzel', serif", color: PREMIUM_ACCENT_GREEN }}>{review.username}</h5>
                      <p className="text-xs sm:text-sm text-green-300" style={{ fontFamily:"'Cormorant Garamond', serif" }}>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                    </div>
                  </div>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-green-100 italic" style={{ fontFamily:"'Cormorant Garamond', serif" }}>"{review.reviewText}"</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div className="w-full lg:w-3/5 flex justify-center lg:sticky lg:top-20">
            <motion.div className="w-full p-0" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 80 }}>
              <Booking title={title} price={price} avgRating={avgRating} reviewsArray={localReviews} />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default TourDetails;
