import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../utils/config";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const PREMIUM_ACCENT_GREEN = "#6ee7b7";
const CARD_BG = "rgba(0,57,31,0.8)";

const UpdateToursComp = ({ tour, id }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    city: "",
    desc: "",
    address: "",
    price: 0,
    maxGroupSize: 1,
    photo: "",
    distance: 0,
    featured: false,
  });

  useEffect(() => {
    if (tour) {
      const { title, city, desc, address, price, maxGroupSize, photo, distance, featured } = tour;
      setFormData({
        title: title || "",
        city: city || "",
        desc: desc || "",
        address: address || "",
        price: price || 0,
        maxGroupSize: maxGroupSize || 1,
        photo: photo || "",
        distance: distance || 0,
        featured: featured || false,
      });
    }
  }, [tour]);

  const handleInput = (e) => {
    let value = e.target.value;
    if (e.target.name === "featured") value = value === "true";
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/tour/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await response.json();

      if (response.ok) {
        toast.success(message, {
          position: "top-right",
          autoClose: 2500,
          style: {
            background: "#004d33",
            color: "#f4fff4",
            fontWeight: "600",
            borderRadius: "12px",
          },
        });

        setTimeout(() => navigate("/admin/tours"), 2500);
      } else {
        toast.error(message, {
          position: "top-right",
          autoClose: 2500,
          style: {
            background: "#8b0000",
            color: "#f4fff4",
            fontWeight: "600",
            borderRadius: "12px",
          },
        });
      }
    } catch {
      toast.error("Server not responding", {
        position: "top-right",
        autoClose: 2500,
        style: {
          background: "#8b0000",
          color: "#f4fff4",
          fontWeight: "600",
          borderRadius: "12px",
        },
      });
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      className="p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-3xl mb-10 mx-auto"
      style={{
        background: CARD_BG,
        backdropFilter: "blur(8px)",
        minHeight: "70%",
        border: `1px solid ${PREMIUM_ACCENT_GREEN}40`,
      }}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {/* Header */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white mb-4 text-center drop-shadow-lg"
        style={{ fontFamily: "'Cinzel', serif" }}
        variants={fadeUp}
        custom={0.1}
      >
        Update <span style={{ color: PREMIUM_ACCENT_GREEN }}>Tour</span>
      </motion.h2>
      <motion.p
        className="text-green-200 text-center mb-8 text-lg md:text-xl"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        variants={fadeUp}
        custom={0.2}
      >
        Update tour details by filling all fields.
      </motion.p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Title & City */}
        <div className="md:grid grid-cols-2 gap-3">
          {["title", "city"].map((field, idx) => (
            <motion.div key={field} variants={fadeUp} custom={0.3 + idx * 0.1}>
              <label className="block text-green-200 font-medium mb-1 capitalize">
                {field === "title" ? "Title" : "City"}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInput}
                placeholder={field === "title" ? "Tour Name" : "City Name"}
                className="w-full px-4 py-3 rounded-xl border border-green-700 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 hover:scale-[1.01]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                required
              />
            </motion.div>
          ))}
        </div>

        {/* Price, Max Group, Distance */}
        <div className="md:grid grid-cols-3 gap-3">
          {["price", "maxGroupSize", "distance"].map((field, idx) => (
            <motion.div key={field} variants={fadeUp} custom={0.5 + idx * 0.1}>
              <label className="block text-green-200 font-medium mb-1 capitalize">
                {field === "maxGroupSize" ? "Max People" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleInput}
                placeholder={field === "price" ? "Price" : field === "maxGroupSize" ? "Max People" : "Distance"}
                className="w-full px-4 py-3 rounded-xl border border-green-700 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 hover:scale-[1.01]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                required={field !== "distance"}
              />
            </motion.div>
          ))}
        </div>

        {/* Address, Description, Photo */}
        {["address", "desc", "photo"].map((field, idx) => (
          <motion.div key={field} variants={fadeUp} custom={0.8 + idx * 0.1}>
            <label className="block text-green-200 font-medium mb-1 capitalize">
              {field === "desc" ? "Description" : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleInput}
              placeholder={field === "desc" ? "Description" : field === "photo" ? "Photo URL" : "Destination Address"}
              className="w-full px-4 py-3 rounded-xl border border-green-700 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 hover:scale-[1.01]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              required={field !== "desc"}
            />
          </motion.div>
        ))}

        {/* Featured */}
        <motion.div variants={fadeUp} custom={1.2}>
          <label className="block text-green-200 font-medium mb-1">
            Featured
            <select
              name="featured"
              value={formData.featured}
              onChange={handleInput}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-green-700 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 hover:scale-[1.01]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </label>
        </motion.div>

        {/* Submit */}
        <motion.div variants={fadeUp} custom={1.4}>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6ee7b7] hover:bg-green-500 text-white font-semibold py-3 rounded-2xl transition-all shadow-lg text-lg hover:scale-[1.02]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {isLoading ? "Updating..." : "Update Tour"}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default UpdateToursComp;
