import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import SearchResultList from '../pages/SearchResultList';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Booked from '../pages/Booked';
import Payment from '../pages/Payment';
import MyAccount from '../Dashboard/UserAccount/MyAccount';
import Bookings from '../Dashboard/AdminPanel/Bookings';
import AdminTours from '../Dashboard/AdminPanel/AdminTours';
import CreateTours from '../Dashboard/AdminPanel/CreateTours';
import UpdateTours from '../Dashboard/AdminPanel/UpdateTour';
import VerifyBooking from '../pages/VerifyBooking';

// Gallery
import Gallery from '../components/Gallery/Gallery.jsx'; 

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />

      {/* Public Pages */}
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} />
      <Route path='/tours/search' element={<SearchResultList />} />
      <Route path='/contact' element={<Contact />} />

      {/* Payment Flow */}
      <Route path='/payment' element={<Payment />} />

      {/* Booked Ticket Pages */}
      <Route path='/booked' element={<Booked />} />
      <Route path='/booked/:bookingId' element={<Booked />} />

      {/* Verify Booking */}
      <Route path='/verify-booking/:bookingId' element={<VerifyBooking />} />

      {/* User & Admin */}
      <Route path='/my-account' element={<MyAccount />} />
      <Route path='/all-booking' element={<Bookings />} />
      <Route path='/all-tours' element={<AdminTours />} />
      <Route path='/update-tour/:id' element={<UpdateTours />} />
      <Route path='/create' element={<CreateTours />} />

      {/* Auth */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default Router;
