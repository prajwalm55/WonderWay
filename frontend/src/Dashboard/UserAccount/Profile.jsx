import React, { useState, useRef, useEffect } from "react";
import { toast, Slide } from "react-toastify";
import BASE_URL from "../../utils/config";

// --- THEME CONSTANTS ---
const SUCCESS_BG = "#004d33";
const ERROR_BG = "#8b0000";
const ACCENT_GREEN = "#00a86b";
const ACCENT_RED = "#ff4444";

const Profile = ({ user, dispatch, token, setAvatar }) => {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) setFormData({ username: user.username, email: user.email });
  }, [user]);

  const handleInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const tempUrl = URL.createObjectURL(e.target.files[0]);
      setImageFile(e.target.files[0]);
      setAvatar(tempUrl);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  // Toasts 
  const notifySuccess = (message) => {
    toast.dismiss("profile-success");
    toast.success(message, {
      toastId: "profile-success",
      position: "top-right",
      autoClose: 2500,
      transition: Slide,
      style: {
        background: SUCCESS_BG,
        color: "#f4fff4",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: "600",
        border: `1px solid ${ACCENT_GREEN}`,
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      },
    });
  };

  const notifyError = (message) => {
    toast.dismiss("profile-error");
    toast.error(message, {
      toastId: "profile-error",
      position: "top-right",
      autoClose: 2500,
      transition: Slide,
      style: {
        background: ERROR_BG,
        color: "#f4fff4",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: "600",
        border: `1px solid ${ACCENT_RED}`,
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      },
    });
  };

  // Submit handler 
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("username", formData.username);
      form.append("email", formData.email);
      if (imageFile) form.append("photo", imageFile);

      const response = await fetch(`${BASE_URL}/user/users/${user._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        const photoUrl = data.data.photo || user.photo;
        setAvatar(photoUrl); 
        dispatch({
          type: "UPDATE_USER",
          payload: { user: { ...user, ...formData, photo: photoUrl } },
        });
        notifySuccess("🎉 Profile updated successfully!");
      } else {
        notifyError(`⚠️ ${data.message}`);
      }
    } catch {
      notifyError("⚠️ Server not responding");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4 text-green-100 w-full max-w-lg mx-auto"
    >
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInput}
        placeholder="Enter your name"
        className="bg-black/30 border border-green-800/40 text-green-100 placeholder-green-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a86b]/60 focus:border-transparent transition-all duration-300 px-4 py-3 w-full backdrop-blur-sm text-sm sm:text-base"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInput}
        placeholder="Enter your email"
        className="bg-black/30 border border-green-800/40 text-green-100 placeholder-green-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a86b]/60 focus:border-transparent transition-all duration-300 px-4 py-3 w-full backdrop-blur-sm text-sm sm:text-base"
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={triggerFileInput}
        className="w-full py-3 rounded-lg bg-green-700/80 hover:bg-green-600 text-white font-semibold shadow-md transition-all text-sm sm:text-base"
      >
        Upload Image
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-700 text-white font-semibold shadow-md hover:shadow-xl transition-all text-sm sm:text-base ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Updating..." : "Update Now"}
      </button>
    </form>
  );
};

export default Profile;
