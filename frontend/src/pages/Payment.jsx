// --- src/pages/Payment.jsx ---
import React, { useEffect, useState, useContext } from "react";
import { FaCreditCard, FaSpinner } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../utils/config";
import { toast, Slide } from "react-toastify";

// Theme Colors
const PREMIUM_ACCENT_GREEN = "#6ee7b7";
const DARK_GREEN_BG = "#00291e";
const DARK_CARD_BG = "rgba(18,55,42,0.98)";

const SUCCESS_BG = "#004d33";
const ERROR_BG = "#8b0000";
const ACCENT_GREEN = "#00a86b";
const ACCENT_RED = "#ff4444";
const ACCENT_WARNING = "#facc15";

const RAZORPAY_KEY_ID = "rzp_test_SMLeSfbDIdFyFa";
const FALLBACK_AMOUNT = 1;

// Toast Function
const notify = (message, type = "success", id = "payment-popup") => {
  toast.dismiss(id);

  let styleProps = {};
  let toastFn = toast.success;

  if (type === "error") {
    toastFn = toast.error;
    styleProps = { background: ERROR_BG, border: `1px solid ${ACCENT_RED}` };
  } else if (type === "warning") {
    toastFn = toast.warn;
    styleProps = { background: DARK_CARD_BG, border: `1px solid ${ACCENT_WARNING}`, color: ACCENT_WARNING };
  } else if (type === "info") {
    toastFn = toast.info;
    styleProps = { background: DARK_CARD_BG, border: `1px solid ${ACCENT_GREEN}` };
  } else {
    styleProps = { background: SUCCESS_BG, border: `1px solid ${ACCENT_GREEN}` };
  }

  toastFn(message, {
    toastId: id,
    position: "top-right",
    autoClose: 2500,
    transition: Slide,
    style: {
      ...styleProps,
      color: styleProps.color || "#f4fff4",
      borderRadius: "12px",
    },
  });
};

// Load Razorpay Script
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const location = useLocation();
  const initialBookingData = location.state || {};
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Simple validation
  if (!initialBookingData.amount) {
    notify("Booking data missing.", "error");
    return null;
  }

  const [bookingDetails] = useState({
    amount: initialBookingData.amount || FALLBACK_AMOUNT,
    tourName: initialBookingData.tourName,
    maxGroupSize: initialBookingData.maxGroupSize,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  // Prevent multiple verification
  const [verificationLock, setVerificationLock] = useState(false);

  // Load Razorpay + Create Order
  useEffect(() => {
    const setupOrder = async () => {
      const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!scriptLoaded) {
        setError("Razorpay SDK failed to load.");
        return;
      }

      setIsRazorpayLoaded(true);
      setIsLoading(true);

      try {
        const res = await fetch(`${BASE_URL}/booking/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: bookingDetails.amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setOrder({
            id: data.orderId,
            amount: data.amount,
            currency: data.currency,
          });
        } else {
          notify(data.message || "Order creation failed.", "error");
        }
      } catch (err) {
        notify("Server error, try again.", "error");
      }

      setIsLoading(false);
    };

    setupOrder();
  }, [bookingDetails.amount]);

  // Razorpay Open
  const displayRazorpay = () => {
    if (!order) {
      notify("Wait… payment is still loading.", "warning");
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "WanderWay — Veelgen Tech",
      description: `Payment for ${bookingDetails.tourName}`,
      order_id: order.id,

      handler: function (response) {
        if (verificationLock) return;
        setVerificationLock(true);

        notify("Verifying payment…", "info");

        const bookingData = {
          userId: user?._id || "guest",
          fullName: initialBookingData.fullName || user?.username || "Guest User",
          tourName: initialBookingData.tourName,
          totalPrice: initialBookingData.amount,
          maxGroupSize: initialBookingData.maxGroupSize,
          phone: initialBookingData.phone || user?.phone,
          date: initialBookingData.date,
        };

        fetch(`${BASE_URL}/booking/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...response, bookingData }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              notify("Payment successful!", "success");

              navigate("/booked", {
                state: {
                  booking: bookingData,
                  bookingId: data.bookingId || "TRVL-" + Date.now(),
                },
              });
            } else {
              notify(data.message || "Booking failed.", "error");
            }
          })
          .catch(() => notify("Verification error.", "error"));
      },

      prefill: {
        name: initialBookingData.fullName || user?.username,
        email: user?.email || "guest@example.com",
        contact: initialBookingData.phone || user?.phone,
      },

      theme: { color: PREMIUM_ACCENT_GREEN },

      modal: {
        ondismiss: () => notify("Payment cancelled.", "info"),
      },
    };

    new window.Razorpay(options).open();
  };

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

          <motion.button
            onClick={displayRazorpay}
            disabled={isLoading || !order}
            whileHover={{ scale: 1.05 }}
            className={`w-full py-3 rounded-lg font-bold text-lg ${
              isLoading || !order ? "bg-gray-500/50 text-gray-300" : "bg-green-700 hover:bg-green-600"
            }`}
          >
            {isLoading ? <FaSpinner className="animate-spin mx-auto" /> : "Pay Now with Razorpay"}
          </motion.button>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Payment;
