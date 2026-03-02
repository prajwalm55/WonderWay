import React, { useContext, useEffect, useState } from "react";
import { toast, Slide } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../utils/config";

const Bookings = () => {
  const { token, role } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // Toast helpers
  // ----------------------------
  const showSuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 2500,
      transition: Slide,
      style: {
        background: "#004d33",
        color: "#f4fff4",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: "600",
        border: "1px solid #00a86b",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      },
    });
  };

  const showError = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 2500,
      transition: Slide,
      style: {
        background: "#8b0000",
        color: "#f4fff4",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: "600",
        border: "1px solid #ff4444",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      },
    });
  };

  // ----------------------------
  // Fetch Bookings
  // ----------------------------
  const fetchBookings = async () => {
    if (!token) return;

    setLoading(true);
    const endpoint =
      role === "admin"
        ? `${BASE_URL}/booking/admin/all`
        : `${BASE_URL}/booking`;

    try {
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setBookings(data.data);
    } catch (err) {
      console.error("❌ Bookings fetch error:", err);
      showError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token, role]);

  // ----------------------------
  // Handle Booking Completion
  // ----------------------------
  const handleCompleted = async (_id) => {
    if (!token) return showError("Unauthorized! Please login again.");

    try {
      const res = await fetch(`${BASE_URL}/booking/${_id}/complete`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        showSuccess(data.message || "Booking marked as completed");
        fetchBookings(); // refresh bookings after action
      } else {
        showError(data.message || "Error completing booking");
      }
    } catch (err) {
      console.error(err);
      showError("Server not responding");
    }
  };

  // ----------------------------
  // Handle Booking Delete
  // ----------------------------
  const handleDelete = async (_id) => {
    if (!token) return showError("Unauthorized! Please login again.");
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`${BASE_URL}/booking/${_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        showSuccess(data.message || "Booking deleted successfully");
        fetchBookings(); // refresh bookings after delete
      } else {
        showError(data.message || "Error deleting booking");
      }
    } catch (err) {
      console.error(err);
      showError("Server not responding");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative pt-28 px-4 md:px-10 overflow-x-hidden bg-[#00391f]">
      <div className="w-full max-w-6xl bg-[#004d33]/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-[Cinzel]">Bookings</h2>
          <button
            onClick={fetchBookings}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-[Cinzel] transition-all"
          >
            Refresh
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table-auto w-full border-collapse text-white font-[Cormorant_Garamond]">
            <thead className="bg-green-900 font-[Cinzel] text-white">
              <tr className="text-center">
                <th className="py-3 px-2">#</th>
                <th className="py-3 px-2">Tour</th>
                <th className="py-3 px-2">User</th>
                <th className="py-3 px-2">User ID</th>
                <th className="py-3 px-2">Persons</th>
                <th className="py-3 px-2">Phone</th>
                <th className="py-3 px-2">Booked On</th>
                <th className="py-3 px-2">Price</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-green-200">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.map((b, index) => (
                  <tr
                    key={b._id}
                    className="text-center border-b border-green-700/30 hover:bg-[#005a3c]/70 transition-all duration-200 text-xs md:text-sm"
                  >
                    <td className="py-3 px-2">{index + 1}</td>
                    <td className="py-3 px-2">{b.tourName}</td>
                    <td className="py-3 px-2">{b.fullName}</td>
                    <td className="py-3 px-2">{b.userId}</td>
                    <td className="py-3 px-2">{b.maxGroupSize}</td>
                    <td className="py-3 px-2">{b.phone}</td>
                    <td className="py-3 px-2">{new Date(b.createdAt).toDateString()}</td>
                    <td className="py-3 px-2">₹{b.totalPrice}</td>
                    <td className="py-3 px-2">{b.status}</td>
                    <td className="py-3 px-2">
                      {b.status === "active" ? (
                        <button
                          onClick={() => handleCompleted(b._id)}
                          className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-xl transition-all duration-200 font-[Cinzel]"
                        >
                          Mark as Completed
                        </button>
                      ) : (
                        role === "admin" && (
                          <button
                            onClick={() => handleDelete(b._id)}
                            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-xl transition-all duration-200 font-[Cinzel]"
                          >
                            Delete
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-gray-300">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4">
          {loading ? (
            <p className="text-center text-green-200 py-4">Loading bookings...</p>
          ) : bookings.length > 0 ? (
            bookings.map((b, index) => (
              <div
                key={b._id}
                className="bg-[#005a3c]/80 rounded-xl p-4 text-green-100 flex flex-col gap-2 shadow-md"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">#{index + 1}</span>
                  <span className={`px-2 py-1 rounded ${b.status === "active" ? "bg-green-500" : "bg-red-500"} text-white`}>
                    {b.status}
                  </span>
                </div>
                <p><strong>Tour:</strong> {b.tourName}</p>
                <p><strong>User:</strong> {b.fullName} ({b.userId})</p>
                <p><strong>Persons:</strong> {b.maxGroupSize}</p>
                <p><strong>Phone:</strong> {b.phone}</p>
                <p><strong>Booked On:</strong> {new Date(b.createdAt).toDateString()}</p>
                <p><strong>Price:</strong> ₹{b.totalPrice}</p>
                <div className="flex gap-2 mt-2">
                  {b.status === "active" ? (
                    <button
                      onClick={() => handleCompleted(b._id)}
                      className="flex-1 bg-green-500 hover:bg-green-700 text-white py-1 rounded-xl text-sm transition-all"
                    >
                      Complete
                    </button>
                  ) : (
                    role === "admin" && (
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="flex-1 bg-red-500 hover:bg-red-700 text-white py-1 rounded-xl text-sm transition-all"
                      >
                        Delete
                      </button>
                    )
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-300 py-4">No bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
