// --- src/components/Footer.jsx ---
import Logo from "./../../assets/images/logonavm-clear.png";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

// --- Newsletter Component ---
// Handles email subscription input and submission
const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email!");
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="w-full max-w-md text-center flex flex-col gap-2">
      {/* Newsletter heading */}
      <h3
        className="text-white text-base sm:text-lg font-semibold"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        Subscribe To WanderWay
      </h3>

      {/* Email input and subscribe button */}
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border border-gray-400 bg-[#00291f] 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-green-700 text-sm text-center sm:text-left"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold 
                     rounded-md shadow-md text-sm w-full sm:w-auto"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

// --- Footer Component ---
// Main footer with logo, newsletter, social links, and contact info
const Footer = () => {
  return (
    <footer
      className="w-full relative overflow-hidden py-4 sm:py-6 lg:py-8 px-4 sm:px-10 z-20"
      style={{ backgroundColor: "#013629ff", fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Top section: Logo, Newsletter, Social links */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 sm:gap-10">
        
        {/* Logo Section */}
        <div className="hidden sm:flex items-center gap-3 flex-1 justify-center lg:justify-start">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden">
            <img
              src={Logo}
              alt="WanderWay Logo"
              className="h-full w-full object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <h2
            className="text-white text-2xl sm:text-3xl font-bold tracking-wide"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            WanderWay
          </h2>
        </div>

        {/* Newsletter Component */}
        <div className="flex justify-center flex-1 w-full sm:mt-0">
          <Newsletter />
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center lg:items-end gap-3 flex-1">
          <h3
            className="text-white text-base sm:text-lg font-semibold"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Follow Us
          </h3>
          <div className="flex gap-3 text-lg">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaGithub].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-white p-2 rounded-full transition-all 
                 hover:scale-125 hover:text-green-300 hover:shadow-[0_0_15px_#6ee7b7] hover:-translate-y-1"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section: Contact info & copyright */}
      <div className="text-center text-gray-300 border-t border-[#0b1120] mt-5 pt-3">
        <p
          className="text-sm lg:text-base font-medium"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Veelgen Tech, MICO Layout, Bangalore, India
        </p>
        <p
          className="text-sm lg:text-base font-medium"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          📞 +91 63606 67440
        </p>
        <p
          className="text-sm lg:text-base font-medium"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          📧 support@veelgen.tech
        </p>
        <p
          className="text-sm lg:text-base font-medium"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          🌐{" "}
          <a
            href="https://veelgen.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-300 underline underline-offset-2 transition-colors"
          >
            veelgen.tech
          </a>
        </p>
        <p
          className="pt-2 text-xs lg:text-sm text-gray-400 font-medium"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          © 2025 WanderWay. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
