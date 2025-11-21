import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/config";
import Bookings from "./Bookings";
import Profile from "./Profile";
import defaultAvatar from "../../assets/images/profilelogo1.png";
import back4 from "../../assets/images/bac4.png";

// Admin Panel Links Component
const AdminPanelLinks = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 mt-4">
      <button
        onClick={() => navigate("/all-tours")}
        className="w-full py-2 rounded-xl bg-[#004d33] hover:bg-[#00a86b] text-white font-semibold transition-all duration-300"
      >
        All Tours
      </button>
      <button
        onClick={() => navigate("/create")}
        className="w-full py-2 rounded-xl bg-[#004d33] hover:bg-[#00a86b] text-white font-semibold transition-all duration-300"
      >
        Create Tour
      </button>
      <button
        onClick={() => navigate("/all-booking")}
        className="w-full py-2 rounded-xl bg-[#004d33] hover:bg-[#00a86b] text-white font-semibold transition-all duration-300"
      >
        All Bookings
      </button>
    </div>
  );
};

const MyAccount = () => {
  const { user, dispatch, token } = useContext(AuthContext);
  const [tab, setTab] = useState("bookings");
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) setAvatar(user.photo || defaultAvatar);
  }, [user]);

  const confirmDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?"))
      deleteAccount();
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { message } = await response.json();
      if (!response.ok) toast.error(message);
      else {
        dispatch({ type: "LOGOUT" });
        navigate("/register");
      }
    } catch {
      toast.error("Server not responding");
    }
  };

  const handleMouseMove = (e) => {
    const x = ((e.clientX - window.innerWidth / 2) / 40).toFixed(2);
    const y = ((e.clientY - window.innerHeight / 2) / 40).toFixed(2);
    setMousePos({ x, y });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div
      className="relative min-h-[90vh] flex flex-col items-center justify-start pt-32 pb-16 overflow-x-hidden overflow-y-auto"
      onMouseMove={handleMouseMove}
    >
      {/* Background */}
      <section
        className="fixed inset-0 z-0 overflow-hidden"
        style={{
          backgroundColor: "#00291f",
          backgroundImage: `linear-gradient(145deg, rgba(0,41,31,0.9), rgba(0,77,47,0.85)), url(${back4})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "blur(5px)",
          transform: "scale(1.05)",
        }}
      ></section>

      {/* Main Account Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: "rgba(0, 0, 0, 0.50)",
          transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
          transition: "transform 0.3s ease-out",
        }}
        className="relative z-10 rounded-3xl overflow-hidden shadow-xl p-4 sm:p-6 md:p-8 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 rounded-2xl p-4 sm:p-6 md:p-6 flex flex-col items-center border border-[#00a86b]/30 backdrop-blur-md"
          >
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-[#00a86b] mb-4">
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-green-100 text-xl font-bold mb-1">
              {user.username}
            </h2>
            <p className="text-green-300 text-sm text-center">{user.email}</p>

            <div className="mt-6 w-full flex flex-col gap-3">
              <button
                onClick={() => setTab("settings")}
                className="w-full py-2 rounded-xl bg-[#004d33] hover:bg-[#00a86b] text-white font-semibold transition-all duration-300"
              >
                Update Profile
              </button>
              <button
                onClick={confirmDelete}
                className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300"
              >
                Delete Account
              </button>

              {/* Admin Panel Links */}
              {user?.isAdmin && <AdminPanelLinks />}
            </div>
          </motion.div>

          {/* Right Tabs */}
          <div className="md:col-span-2 flex flex-col">
            <div className="flex mb-4 sm:mb-6 gap-2 sm:gap-4 flex-wrap">
              <button
                onClick={() => setTab("bookings")}
                className={`px-3 sm:px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  tab === "bookings"
                    ? "bg-[#00a86b] text-white"
                    : "bg-black/40 text-green-200 border border-[#00a86b]/30 hover:bg-[#004d33] hover:text-white"
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`px-3 sm:px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  tab === "settings"
                    ? "bg-[#00a86b] text-white"
                    : "bg-black/40 text-green-200 border border-[#00a86b]/30 hover:bg-[#004d33] hover:text-white"
                }`}
              >
                Profile Settings
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-2">
              <AnimatePresence mode="wait">
                {tab === "bookings" && (
                  <motion.div
                    key="bookings"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-6 border border-[#00a86b]/30 h-[300px] sm:h-[350px] md:h-[400px] overflow-y-auto overflow-x-hidden flex flex-col"
                  >
                    <Bookings />
                  </motion.div>
                )}

                {tab === "settings" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-6 border border-[#00a86b]/30 h-[300px] sm:h-[350px] md:h-[400px] overflow-y-auto overflow-x-hidden flex flex-col justify-between"
                  >
                    <Profile
                      user={user}
                      dispatch={dispatch}
                      token={token}
                      setAvatar={setAvatar}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyAccount;
