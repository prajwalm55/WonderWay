import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import back4 from "../assets/images/bac4.png";

const Contact = () => {
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dots, setDots] = useState([]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !formData.subject || !formData.message) return false;
    if (!emailRegex.test(formData.email)) return false;
    if (formData.message.trim().length < 10) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: "5904e15a-503f-45e0-bf15-289621fca6ae", ...formData }),
      });
      const json = await res.json();
      if (json.success) {
        setFormData({ email: "", subject: "", message: "" });
        setShowPopup(true);
      } else alert("Failed to send message!");
    } catch {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialDots = Array.from({ length: 12 }).map(() => ({
      top: Math.random() * 90 + 5,
      left: Math.random() * 90 + 5,
      size: Math.random() * 6 + 2,
      dx: (Math.random() - 0.5) / 3,
      dy: (Math.random() - 0.5) / 3,
      opacity: Math.random() * 0.4 + 0.3,
    }));
    setDots(initialDots);

    const interval = setInterval(() => {
      setDots((prev) =>
        prev.map((d) => ({
          ...d,
          top: Math.min(Math.max(d.top + d.dy, 5), 95),
          left: Math.min(Math.max(d.left + d.dx, 5), 95),
        }))
      );
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <PageWrapper>
      {/* Background */}
      <section
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: "#00291e",
          backgroundImage: `linear-gradient(145deg, rgba(0,41,31,0.95), rgba(0,77,47,0.9)), url(${back4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          width: "100%",
          filter: "blur(4px)",
          transform: "scale(1.04)",
        }}
      />

      {/* Contact Card */}
      <section className="relative z-20 flex justify-center items-start px-4 sm:px-6 min-h-screen pt-36 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative rounded-3xl overflow-hidden shadow-2xl p-6 cursor-pointer w-full max-w-[500px]"
          style={{
            background: "rgba(0,0,0,0.50)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Dots Desktop */}
          <div className="hidden sm:block absolute inset-0 -z-10">
            {dots.map((d, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: `${d.top}%`,
                  left: `${d.left}%`,
                  width: `${d.size}px`,
                  height: `${d.size}px`,
                  backgroundColor: `rgba(0,255,128,${d.opacity})`,
                  borderRadius: "50%",
                  boxShadow: `0 0 4px rgba(0,255,128,${d.opacity}), 0 0 8px rgba(0,255,128,${d.opacity})`,
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>

          <div className="px-2 sm:px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4 text-green-100 text-center"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Contact <span style={{ color: "#00a86b" }}>Us</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black bg-opacity-40 placeholder-green-200 text-white border border-green-700 focus:ring-2 focus:ring-green-500"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black bg-opacity-40 placeholder-green-200 text-white border border-green-700 focus:ring-2 focus:ring-green-500"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black bg-opacity-40 placeholder-green-200 text-white border border-green-700 focus:ring-2 focus:ring-green-500"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-5 py-2 rounded-xl text-white font-semibold transition bg-[#004d33] hover:bg-[#00a86b] shadow-md hover:scale-105"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ email: "", subject: "", message: "" })}
                  className="flex-1 px-5 py-2 rounded-xl text-white font-semibold transition bg-[#004d33] hover:bg-[#00a86b] shadow-md hover:scale-105"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black/90 p-6 rounded-3xl shadow-2xl text-center mx-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <h3 className="text-2xl font-semibold mb-2 text-green-100" style={{ fontFamily: "'Cinzel', serif" }}>
                🎉 Message Sent!
              </h3>
              <p className="text-green-200" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Thank you for reaching out. We'll get back to you soon.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Contact;
