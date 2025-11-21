import React, { useContext } from "react";
import { toast } from "react-toastify";
import BASE_URL from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const AdminBookings = ({ booking, refreshBookings }) => {
  const { token } = useContext(AuthContext);
  const {
    tourName,
    fullName,
    userId,
    phone,
    totalPrice,
    maxGroupSize,
    date,
    createdAt,
    status,
    _id,
  } = booking;

  const bookedDate = new Date(date).toDateString();
  const createdDate = new Date(createdAt).toDateString();

  const showSuccess = (msg) => toast.success(msg);
  const showError = (msg) => toast.error(msg);

  // ✅ Soft Complete (PATCH) for Active bookings
  const handleComplete = async () => {
    if (!token) return showError("Unauthorized!");
    if (!window.confirm("Mark this booking as completed?")) return;

    try {
      const res = await fetch(`${BASE_URL}/booking/${_id}/complete`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
      const data = await res.json();
      if (res.ok) {
        showSuccess(data.message || "Booking marked completed");
        refreshBookings(); // refresh bookings after update
      } else {
        showError(data.message || "Failed to update booking");
      }
    } catch (err) {
      console.error(err);
      showError("Server error");
    }
  };

  // ✅ Hard delete for cancelled bookings
  const handleDelete = async () => {
    if (!token) return showError("Unauthorized!");
    if (!window.confirm("Delete this booking permanently?")) return;

    try {
      const res = await fetch(`${BASE_URL}/booking/${_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        showSuccess(data.message || "Booking deleted successfully");
        refreshBookings(); // refresh bookings after delete
      } else {
        showError(data.message || "Failed to delete booking");
      }
    } catch (err) {
      console.error(err);
      showError("Server error");
    }
  };

  return (
    <tr className="text-center text-white font-[Cormorant_Garamond] text-xs md:text-sm hover:bg-[#004d33]/70 transition-all duration-200">
      <td className="py-3 px-2">{tourName}</td>
      <td className="py-3 px-2">{fullName}</td>
      <td className="py-3 px-2">{userId}</td>
      <td className="py-3 px-2">{maxGroupSize}</td>
      <td className="py-3 px-2">{phone}</td>
      <td className="py-3 px-2">{bookedDate}</td>
      <td className="py-3 px-2">{createdDate}</td>
      <td className="py-3 px-2">₹{totalPrice}</td>
      <td className="py-3 px-2">
        {status === "cancelled" ? (
          <span className="text-red-500 font-semibold">Cancelled</span>
        ) : status === "completed" ? (
          <span className="text-yellow-400 font-semibold">Completed</span>
        ) : (
          <span className="text-green-400 font-semibold">Active</span>
        )}
      </td>
      <td className="py-3 px-2">
        {status === "cancelled" ? (
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-xl transition-all duration-200 font-[Cinzel]"
          >
            Delete
          </button>
        ) : status === "active" ? (
          <button
            onClick={handleComplete}
            className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-xl transition-all duration-200 font-[Cinzel]"
          >
            Complete
          </button>
        ) : (
          <span>—</span>
        )}
      </td>
    </tr>
  );
};

export default AdminBookings;
