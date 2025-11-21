import React from "react";
import { motion } from "framer-motion";

const PremiumLoader = ({ text = "Loading..." }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#00291e]/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Outer Glow */}
      <motion.div
        className="absolute w-52 h-52 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,180,0.25), rgba(0,255,130,0))",
          filter: "blur(40px)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* RING ORBIT */}
      <div className="relative w-32 h-32 premium-loader">
        <div className="ring neon"></div>
        <div className="ring neon"></div>
        <div className="ring neon"></div>

        {/* inner glow pulse */}
        <motion.div
          className="absolute w-10 h-10 rounded-full bg-[#00ffcc]/40 blur-xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Text bounce */}
      <motion.span
        className="mt-8 text-[#00ffbb] text-base tracking-widest font-semibold drop-shadow-[0_0_8px_#00ffbb]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default PremiumLoader;
