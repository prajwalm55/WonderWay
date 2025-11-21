// --- src/components/FaqList.jsx ---
import React from "react";
import { motion } from "framer-motion";
import FaqCard from "./FaqCard";
import faqImg from "../../assets/images/Questions1.png";

// FAQ Data array - questions and their answers
const faqsData = [
  {
    question: "How to book a trip?",
    content:
      "You can book directly from our website by selecting your desired tour and following the checkout process.",
  },
  {
    question: "Are the tours customizable?",
    content:
      "Yes, our trips are highly flexible. You can request customizations according to your preferences.",
  },
  {
    question: "Do you provide travel insurance?",
    content:
      "Yes, we offer optional travel insurance for all trips to ensure peace of mind during your journey.",
  },
  {
    question: "What are the payment options?",
    content:
      "We accept all major credit/debit cards, UPI, net banking, and PayPal for convenient payments.",
  },
  {
    question: "Are group discounts available?",
    content:
      "Yes! We provide special group discounts for groups of 5 or more travelers.",
  },
  {
    question: "Do you arrange accommodations?",
    content:
      "Absolutely. Our trips include carefully selected accommodations depending on the package.",
  },
];

// Main FAQ List component
const FaqList = () => {
  return (
    <section
      className="flex flex-col lg:flex-row justify-center items-start w-full px-4 sm:px-6 md:px-12 py-12 lg:py-20 gap-8"
      style={{
        // Background gradient for FAQ section
        background: "linear-gradient(180deg, #00291F 0%, #004D2F 50%, #003223 100%)",
      }}
    >
      {/* Image Section (hidden on small screens) */}
      <div className="lg:w-5/12 hidden lg:flex justify-center items-center">
        <motion.div
          className="relative w-full max-w-[400px] rounded-xl"
          animate={{ rotate: [0, 1.5, -1.5, 0] }} // Slight continuous rotation
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }} // Scale slightly on hover
          style={{
            border: "4px solid #00a86b",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,255,150,0.25)",
            maxHeight: "500px",
          }}
        >
          {/* FAQ illustration image */}
          <img
            src={faqImg}
            alt="FAQ Illustration"
            className="w-full h-full object-contain rounded-xl"
          />
        </motion.div>
      </div>

      {/* FAQ Cards Section */}
      <div className="lg:w-7/12 flex flex-col w-full justify-start px-2 sm:px-4 md:px-6 space-y-4">
        {/* Section Heading */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-6 text-center lg:text-left drop-shadow-md"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#e3f7e3",
            lineHeight: "1.2",
          }}
        >
          <span>Frequently Asked </span>
          <span style={{ color: "#00a86b" }}>Questions</span>
        </h2>

        {/* Map through FAQ data and render FaqCard for each */}
        {faqsData.map((item, index) => (
          <FaqCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default FaqList;
