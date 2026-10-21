// --- src/pages/Payment.jsx ---
import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

// Theme Colors
const PREMIUM_ACCENT_GREEN = "#6ee7b7";
const DARK_GREEN_BG = "#00291e";
const DARK_CARD_BG = "rgba(18,55,42,0.98)";

const FALLBACK_AMOUNT = 1;

const Payment = () => {
  const location = useLocation();
  const initialBookingData = location.state || {};

  const [bookingDetails] = useState({
    amount: initialBookingData.amount || FALLBACK_AMOUNT,
    tourName: initialBookingData.tourName,
    maxGroupSize: initialBookingData.maxGroupSize,
  });

  // Razorpay checkout is intentionally commented out until the payment
  // provider credentials and the final payment flow are confirmed.

  return (
    <PageWrapper>
      <section
        className="relative flex flex-col items-center justify-center min-h-screen pt-36 pb-12 px-6"
        style={{ backgroundColor: DARK_GREEN_BG }}
      >
        <motion.div
          className="p-10 rounded-3xl border border-green-700/40 shadow-2xl backdrop-blur-sm text-white max-w-lg w-full"
          style={{ background: DARK_CARD_BG }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <FaCreditCard size={60} className="mx-auto mb-6" style={{ color: PREMIUM_ACCENT_GREEN }} />

          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: PREMIUM_ACCENT_GREEN }}>
            Secure Payment Gateway
          </h2>

          <h5 className="text-lg text-gray-300 text-center mb-8">
            Total Amount: ₹{bookingDetails.amount.toFixed(2)}
          </h5>

          <p className="text-center text-yellow-300 mb-4">
            Payment gateway temporarily unavailable. Razorpay integration is disabled.
          </p>
          <motion.button
            disabled
            className="w-full py-3 rounded-lg font-bold text-lg bg-gray-500/50 text-gray-300 cursor-not-allowed"
          >
            Payment unavailable
          </motion.button>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Payment;
