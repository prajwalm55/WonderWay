// --- Register.jsx ---
import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../utils/config";
import PageWrapper from "../components/PageWrapper";
import back4 from "../assets/images/bac4.png";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dots, setDots] = useState([]);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const notifySuccess = (message) => {
    toast.dismiss("register-success");
    toast.success(message, {
      toastId: "register-success",
      position: "top-center",
      autoClose: 2500,
      style: {
        background: "#004d33",
        color: "#f4fff4",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: "600",
        border: "1px solid #00a86b",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        padding: "8px 16px",
        fontSize: "15px",
      },
    });
  };

  const notifyError = (message) => {
    toast.dismiss("register-error");
    toast.error(message, {
      toastId: "register-error",
      position: "top-center",
      autoClose: 2500,
      style: {
        background: "#8b0000",
        color: "#f4fff4",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: "600",
        border: "1px solid #ff4444",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        padding: "8px 16px",
        fontSize: "15px",
      },
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        notifySuccess("Account created successfully!");
        navigate("/login");
      } else {
        notifyError(result.message || "Registration failed!");
      }
    } catch {
      notifyError("Server not responding!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialDots = Array.from({ length: 10 }).map(() => ({
      top: Math.random() * 90 + 5,
      left: Math.random() * 90 + 5,
      size: Math.random() * 4 + 2,
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

  return (
    <PageWrapper>
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: "#00291f",
          backgroundImage: `linear-gradient(145deg, rgba(0,41,31,0.95), rgba(0,77,47,0.9)), url(${back4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
          filter: "blur(4px)",
          transform: "scale(1.04)",
        }}
      />

      <section className="relative z-20 flex justify-center items-center px-4 sm:px-6 min-h-screen sm:items-start sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative rounded-2xl overflow-hidden shadow-xl w-full max-w-[380px] sm:max-w-[480px] p-5 sm:p-6 cursor-pointer"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Desktop Dots */}
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

          <div className="px-1 sm:px-2">
            <h2
              className="text-xl sm:text-2xl font-bold mb-4 text-green-100 text-center"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Create <span className="text-[#00a86b]">Account</span>
            </h2>

            <form onSubmit={registerHandler} className="space-y-3">
              <input
                type="text"
                name="username"
                placeholder="Your Name"
                value={formData.username}
                onChange={handleInput}
                className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-30 placeholder-green-200 text-white border border-green-700 focus:ring-2 focus:ring-green-500"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInput}
                className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-30 placeholder-green-200 text-white border border-green-700 focus:ring-2 focus:ring-green-500"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-30 placeholder-green-200 text-white border border-green-700 focus:ring-2 focus:ring-green-500 pr-10"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-5 py-2 rounded-lg text-white font-semibold transition bg-[#004d33] hover:bg-[#00a86b] hover:scale-105 shadow-md"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>

              <p
                className="text-sm text-green-100 text-center mt-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#00a86b] hover:text-green-300 font-semibold"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Register;
