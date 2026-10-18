import React, { useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import avatar1 from "../../assets/images/ava-3.jpg";

const Testimonials = () => {
  // Fix slick overflow for parallax effect
  useEffect(() => {
    const slickTrack = document.querySelectorAll(".slick-track, .slick-list");
    slickTrack.forEach((el) => (el.style.overflow = "visible"));
  }, []);

  // Testimonials content
  const testimonialsData = [
    { name: "Yash Patil", description: "WanderWay made our trip unforgettable! Everything was perfectly organized." },
    { name: "Harish Mahajan", description: "Amazing experience! Friendly team, smooth process, and breathtaking destinations." },
    { name: "Yogesh Bhai", description: "Professional staff and smooth travel. Highly recommended for stress-free vacations." },
    { name: "Bhavesh Patil", description: "Effortless journey from planning to execution. Truly enjoyable experience!" },
    { name: "Vivek Patil", description: "Perfectly managed trip. Activities, timing, and accommodations were top-notch." },
    { name: "Om Marwadi", description: "Premium travel experience! Excellent service and unforgettable memories." },
  ];

  // Custom next arrow
  const SampleNextArrow = ({ onClick }) => (
    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-400 hover:to-green-400 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
        ➤
      </div>
    </div>
  );

  // Custom previous arrow
  const SamplePrevArrow = ({ onClick }) => (
    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
      <div className="bg-gradient-to-l from-green-500 to-emerald-500 hover:from-emerald-400 hover:to-green-400 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 rotate-180">
        ➤
      </div>
    </div>
  );

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 2200,
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    cssEase: "cubic-bezier(0.55, 0.08, 0.68, 0.53)",
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-10 overflow-visible relative"
    >
      <Slider {...settings}>
        {testimonialsData.map((data, index) => (
          <div key={index} className="px-4">
            <motion.div
              whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.4 } }}
              className="rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500"
              style={{
                background: "linear-gradient(145deg, rgba(0,60,40,0.7), rgba(0,90,60,0.8))",
                color: "#e3f7e3",
                boxShadow: "0 6px 18px rgba(0,0,0,0.35), 0 0 12px rgba(0,168,107,0.2)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(0,168,107,0.2)",
                minHeight: "220px",
              }}
            >
              {/* Testimonial Text */}
              <p
                className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 flex-grow break-words"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f4fff4" }}
              >
                “{data.description}”
              </p>

              {/* User Info & Stars */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mt-auto gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={avatar1}
                      className="w-full h-full object-cover rounded-full border-[2px] border-green-400/70 shadow-md"
                      alt={data.name}
                    />
                  </div>
                  <div className="truncate min-w-0">
                    <h5 className="mb-0 font-semibold text-sm sm:text-base truncate" style={{ fontFamily: "'Cinzel', serif", color: "#00c27a" }}>
                      {data.name}
                    </h5>
                    <p className="text-[10px] sm:text-xs opacity-80 truncate" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e3f7e3" }}>
                      Premium Traveler
                    </p>
                  </div>
                </div>

                {/* Stars with shimmer animation */}
                <motion.div
                  className="flex text-base sm:text-lg star-glow mt-2 sm:mt-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.span key={i} whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }} className="mx-[1px]" style={{ fontFamily: "'Cinzel', serif" }}>
                      ★
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>

      {/* Extra styles for shimmer stars & hover glow */}
      <style>{`
        .slick-track, .slick-list { overflow: visible !important; }
        .rounded-3xl:hover {
          box-shadow: 0 12px 28px rgba(0,0,0,0.45), 0 0 25px rgba(0,255,150,0.25);
          border-color: rgba(0,255,150,0.3);
        }
        .star-glow span {
          background: linear-gradient(90deg, #FFD700, #00FFAA, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default Testimonials;
