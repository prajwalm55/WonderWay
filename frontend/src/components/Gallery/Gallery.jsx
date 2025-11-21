import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

Modal.setAppElement("#root");

// --- THEME CONSTANTS ---
const PREMIUM_ACCENT_GREEN = "#07925aff";
const DARK_GREEN_BG = "#00291e";

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const ImagesGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [navHeight, setNavHeight] = useState(0);
  const location = useLocation();
  const isGalleryPage = location.pathname === "/gallery";

  const Images = [
    {
      url: "https://images.unsplash.com/photo-1527824404775-dce343118ebc?auto=format&fit=crop&q=60&w=600",
      title: "Misty Mountains",
      place: "Himachal Pradesh, India",
    },
    {
      url: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&q=60&w=600",
      title: "Golden Desert",
      place: "Jaisalmer, Rajasthan",
    },
    {
      url: "https://media.istockphoto.com/id/668729904/photo/jahaz-mahal-ship-palace-in-mandu-india.jpg?s=612x612&w=0&k=20&c=YCpYeBw9mBjcI-AOHg8oM3DaZWiQiKe4QZ1bTF-VSHg=",
      title: "Jahaz Mahal",
      place: "Mandu, Madhya Pradesh",
    },
    {
      url: "https://media.gettyimages.com/id/905049262/photo/varanasi-at-sunrise.jpg?s=612x612&w=0&k=20&c=ooiOJzZ4vYe8paql2eHINqyIW_3JX9Hm1FelZ9kBkZ8=",
      title: "Sunrise Reflections",
      place: "Varanasi, Uttar Pradesh",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1676550901098-ef91a54010af?auto=format&fit=crop&q=60&w=600",
      title: "Emerald Forest",
      place: "Kerala, India",
    },
    {
      url: "https://images.pexels.com/photos/1140923/pexels-photo-1140923.jpeg",
      title: "Azure Coast",
      place: "Goa, India",
    },
    {
      url: "https://media.istockphoto.com/id/1307189136/photo/gateway-of-india-mumbai-maharashtra-monument-landmark-famous-place-magnificent-view-without.jpg?s=612x612&w=0&k=20&c=gGzzkXY5bAVbRbokzrjvkt7Ve-Z3yzSVN04NaMqyBB8=",
      title: "Gateway of India",
      place: "Mumbai, Maharashtra",
    },
    {
      url: "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg",
      title: "Lakeside Reflections",
      place: "Nainital, Uttarakhand",
    },
  ];

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) setNavHeight(header.offsetHeight);
  }, []);

  const openModal = (index) => setSelectedImage(index);
  const closeModal = () => setSelectedImage(null);

  return (
    <div
      className="w-full min-h-screen"
      style={{
        background: `linear-gradient(180deg, ${DARK_GREEN_BG} 0%, #004d33 50%, #003523 100%)`,
        paddingTop: isGalleryPage ? `${navHeight + 40}px` : "2rem",
        paddingBottom: "2rem",
      }}
    >
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[1400px] mx-auto px-4"
      >
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-center relative z-20 mb-8"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-5xl font-bold tracking-wide mb-6 text-center drop-shadow-md"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#e3f7e3",
              lineHeight: "1.2",
            }}
          >
            Explore <span style={{ color: PREMIUM_ACCENT_GREEN }}>Our Gallery</span>
          </h2>

          <p
            className="mt-2 text-base md:text-lg lg:text-xl max-w-2xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#e3f7e3",
              letterSpacing: "0.5px",
            }}
          >
            Discover mesmerizing destinations and their untold stories.
          </p>
        </motion.div>

        {/* Masonry Layout */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 992: 4 }}>
          <Masonry gutter="20px">
            {Images.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.1 * index}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative group rounded-xl cursor-pointer overflow-hidden shadow-[12px_17px_51px_rgba(0,0,0,0.25)]"
                onClick={() => openModal(index)}
                style={{ height: "230px" }}
              >
                <motion.img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 12 }}
                />

                {/* Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover:translate-x-[180%] transition-transform duration-[2s] ease-in-out"></div>

                {/* Hover Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex items-end justify-center pb-4"
                >
                  <div
                    className="w-[85%] p-2 rounded-lg text-white text-center backdrop-blur-sm"
                    style={{
                      background: "rgba(0, 0, 0, 0.55)",
                      border: `1px solid ${PREMIUM_ACCENT_GREEN}40`,
                    }}
                  >
                    <p
                      className="text-lg font-medium"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-sm mt-1 italic opacity-80"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.place}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        {/* Modal Animation */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center p-4 bg-black/70 z-[1000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
              >
                <button
                  onClick={closeModal}
                  className="absolute -top-8 right-0 text-white text-3xl font-bold"
                >
                  &times;
                </button>
                <img
                  src={Images[selectedImage].url}
                  alt="Preview"
                  className="max-h-[85vh] max-w-full mx-auto rounded-xl shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ImagesGallery;
