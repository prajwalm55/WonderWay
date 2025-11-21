import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FaqCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <motion.div
      onClick={toggle}
      className="w-full cursor-pointer rounded-xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        boxShadow: "0 0 15px rgba(0, 200, 150, 0.4), 0 0 25px rgba(0, 200, 150, 0.2)"
      }}
      style={{
        background: "rgba(0, 168, 107, 0.15)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(0,168,107,0.3)",
        color: "#e3f7e3",
        padding: "0.8rem",
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm sm:text-base md:text-base lg:text-lg font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
          {item.question}
        </h4>
        <span style={{ fontSize: "18px", color: "#00c27a" }}>{open ? "-" : "+"}</span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-2 overflow-hidden"
          >
            <p className="text-xs sm:text-sm md:text-sm leading-5 sm:leading-6 font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f4fff4" }}>
              {item.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqCard;
