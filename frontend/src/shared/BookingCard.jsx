import React from "react";
import BASE_URL from "../utils/config";
import { toast, Slide } from "react-toastify";

// --- Toast helper: Login-style ---
const notify = (message, type = "info") => {
  toast.dismiss();
  toast[type](message, {
    position: "top-right",
    autoClose: 2500,
    transition: Slide,
    style: {
      background:
        type === "success"
          ? "#004d33"  // Green color for success
          : type === "error"
          ? "#8b0000"  // Red color for error
          : "rgba(18,55,42,0.98)",  // Default background color
      color: "#f4fff4",  // White text color
      fontFamily: "'Outfit', sans-serif",
      fontWeight: "600",
      border: `1px solid ${type === "success" ? "#00a86b" : "#ff4444"}`,
      borderRadius: "12px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    },
  });
};

const BookingCard = ({ booking, setBookings }) => {
  const { tourName, totalPrice, maxGroupSize, date, _id, status } = booking;

  const confirmDelete = async () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) cancelBooking();
  };

  const cancelBooking = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking/${_id}/cancel`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const { message } = await response.json();
      console.log("Cancel Booking Response:", message);

      if (response.ok) {
        // Show success toast (with Login-style)
        notify(message || "Booking cancelled successfully!", "error");

        if (setBookings) {
          setBookings((prev) =>
            prev.map((b) =>
              b._id === _id ? { ...b, status: "cancelled" } : b
            )
          );
        }
      } else {
        // Show error toast (with Login-style)
        notify(message || "Failed to cancel booking.", "error");
      }
    } catch (error) {
      console.error("Error in cancel booking:", error);
      notify("Server not responding", "error");
    }
  };

  // Determine card styling based on status
  let cardStyle = "";
  if (status === "cancelled") cardStyle = "opacity-50 bg-gray-900";
  else if (status === "completed") cardStyle = "opacity-80 bg-green-900";

  return (
    <div
      className={`flex items-center justify-between ${cardStyle} backdrop-blur-md border border-[#00a86b]/20 rounded-xl p-4 mb-3 text-green-200 hover:border-[#00a86b]/50 transition-all gap-4 overflow-hidden`}
    >
      <span className="flex-1 text-left font-semibold truncate">{tourName || "—"}</span>
      <span className="flex-[0.5] text-center">{maxGroupSize || "—"}</span>
      <span className="flex-[0.8] text-center">{date ? date.split("T")[0] : "—"}</span>
      <span className="flex-[0.8] text-center font-semibold">
        ₹{totalPrice ? totalPrice.toLocaleString() : "—"}
      </span>

      <button
        onClick={confirmDelete}
        className={`w-32 px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all flex-shrink-0 ${
          status === "cancelled" || status === "completed"
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 text-white"
        }`}
        disabled={status === "cancelled" || status === "completed"}
      >
        {status === "cancelled"
          ? "Cancelled"
          : status === "completed"
          ? "Completed"
          : "Cancel Booking"}
      </button>
    </div>
  );
};

export default BookingCard;
