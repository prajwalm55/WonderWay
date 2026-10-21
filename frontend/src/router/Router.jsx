import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import SearchResultList from "../pages/SearchResultList";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Booked from "../pages/Booked";
import Payment from "../pages/Payment";
import MyAccount from "../Dashboard/UserAccount/MyAccount";
import Bookings from "../Dashboard/AdminPanel/Bookings";
import AdminTours from "../Dashboard/AdminPanel/AdminTours";
import CreateTours from "../Dashboard/AdminPanel/CreateTours";
import UpdateTours from "../Dashboard/AdminPanel/UpdateTour";
import VerifyBooking from "../pages/VerifyBooking";
import Gallery from "../components/Gallery/Gallery.jsx";

const PublicOnly = ({ children }) => {
  const { role } = useContext(AuthContext);
  return role === "admin" ? <Navigate to="/admin" replace /> : children;
};

const UserOnly = ({ children }) => {
  const { user, role } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return role === "admin" ? <Navigate to="/admin" replace /> : children;
};

const AdminOnly = ({ children }) => {
  const { user, role } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return role === "admin" ? children : <Navigate to="/home" replace />;
};

const Router = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/home" replace />} />

    <Route path="/home" element={<PublicOnly><Home /></PublicOnly>} />
    <Route path="/about" element={<PublicOnly><About /></PublicOnly>} />
    <Route path="/gallery" element={<PublicOnly><Gallery /></PublicOnly>} />
    <Route path="/tours" element={<PublicOnly><Tours /></PublicOnly>} />
    <Route path="/tours/:id" element={<PublicOnly><TourDetails /></PublicOnly>} />
    <Route path="/tours/search" element={<PublicOnly><SearchResultList /></PublicOnly>} />
    <Route path="/contact" element={<PublicOnly><Contact /></PublicOnly>} />

    <Route path="/payment" element={<UserOnly><Payment /></UserOnly>} />
    <Route path="/booked" element={<UserOnly><Booked /></UserOnly>} />
    <Route path="/booked/:bookingId" element={<UserOnly><Booked /></UserOnly>} />
    <Route path="/verify-booking" element={<UserOnly><VerifyBooking /></UserOnly>} />
    <Route path="/verify-booking/:bookingId" element={<UserOnly><VerifyBooking /></UserOnly>} />
    <Route path="/my-account" element={<UserOnly><MyAccount /></UserOnly>} />

    <Route path="/admin" element={<AdminOnly><Bookings /></AdminOnly>} />
    <Route path="/admin/bookings" element={<AdminOnly><Bookings /></AdminOnly>} />
    <Route path="/admin/tours" element={<AdminOnly><AdminTours /></AdminOnly>} />
    <Route path="/admin/tours/new" element={<AdminOnly><CreateTours /></AdminOnly>} />
    <Route path="/admin/tours/:id" element={<AdminOnly><UpdateTours /></AdminOnly>} />

    <Route path="/all-booking" element={<Navigate to="/admin/bookings" replace />} />
    <Route path="/all-tours" element={<Navigate to="/admin/tours" replace />} />
    <Route path="/update-tour/:id" element={<Navigate to="/admin/tours" replace />} />
    <Route path="/create" element={<Navigate to="/admin/tours/new" replace />} />

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default Router;
