import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import BASE_URL from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import BookingCard from "../../shared/BookingCard";

const Bookings = () => {
  const { user, token, dispatch } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user || !token) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/booking`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          // Token invalid or expired
          dispatch({ type: "LOGOUT" });
          setError(true);
          setLoading(false);
          return;
        }

        if (!res.ok) throw new Error(`Fetch failed with status: ${res.status}`);

        const data = await res.json();
        setBookings(data?.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, token, dispatch]);

  if (loading)
    return (
      <p className="text-green-200 text-center py-6 animate-pulse">
        Loading your bookings...
      </p>
    );

  if (error)
    return (
      <p className="text-red-400 text-center py-6">
        Failed to load bookings. Please login again if the problem persists.
      </p>
    );

  return (
    <motion.div className="rounded-3xl border border-green-700/30 shadow-xl p-4 sm:p-6 md:p-6 text-green-100 backdrop-blur-md bg-black/50 overflow-x-hidden">
      {bookings.length > 0 ? (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              setBookings={setBookings} // ✅ Pass state updater
            />
          ))}
        </div>
      ) : (
        <p className="text-green-300 text-center py-6 text-base">
          You haven’t booked any tours yet.
        </p>
      )}
    </motion.div>
  );
};

export default Bookings;
