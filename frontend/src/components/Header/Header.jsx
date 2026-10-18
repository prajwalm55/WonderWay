import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Logo from "./../../assets/images/logonavm-clear.png";
import ProfileLogo from "./../../assets/images/profilelogo1.png";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { toast, Slide } from "react-toastify";
import "./Header.css";

const Header = ({ triggerLoader }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScroll = useRef(window.scrollY);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const logout = () => {
    triggerLoader?.();
    dispatch({ type: "LOGOUT" });

    toast.dismiss();
    toast.success("Logged out successfully.", {
      position: "top-right",
      autoClose: 1500,
      transition: Slide,
      style: { background: "#004d33", color: "#f4fff4", borderRadius: "12px" },
    });

    setTimeout(() => navigate("/home"), 300);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsVisible(!(currentScroll > prevScroll.current && currentScroll > 20));
      setIsScrolled(currentScroll > 10);
      prevScroll.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = ["Home", "About", "Tours", "Gallery", "Contact"];

  return (
    <header
      className={`fixed left-1/2 transform -translate-x-1/2 w-[92%] md:w-[90%] rounded-2xl z-[999] transition-all duration-700`}
      style={{
        height: isScrolled ? "80px" : "70px",
        top: isVisible ? "10px" : "-120px",
        opacity: isVisible ? 1 : 0,
        background: isScrolled ? "rgba(2, 55, 40, 0.85)" : "rgba(3, 61, 41, 0.7)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-full">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 select-none">
          <div className="rounded-full p-[3px] border-2 border-white">
            <img src={Logo} alt="Logo" className="w-12 h-12 rounded-full" />
          </div>
          <span className="text-white text-2xl font-semibold">WanderWay</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center mx-auto">
          {navItems.map((item, index) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="relative text-white font-medium text-lg"
            >
              <span className="nav-link-animate">{item}</span>
            </Link>
          ))}
        </nav>

        {/* Profile + Mobile Menu Button */}
        <div className="flex items-center gap-2">
          {/* Profile Section */}
          {user && (
            <Link
              to="/my-account"
              className="flex items-center gap-1 bg-white/10 border border-white/30 px-2 py-1 rounded-full text-white font-semibold"
              style={{ height: "38px" }}
            >
              <img
                src={user?.photo ? `${user.photo}?${new Date().getTime()}` : ProfileLogo}
                alt="Profile"
                className="w-7 h-7 rounded-full border-2 border-white"
              />
              <span className="hidden md:inline text-sm">Hi, {user.username}</span>
            </Link>
          )}

          {/* Desktop Logout / Sign In */}
          {user ? (
            <button
              onClick={logout}
              className="hidden md:block bg-[#B71C1C] hover:bg-[#8B0000] text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden md:block bg-[#B71C1C] hover:bg-[#8B0000] text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all"
            >
              Sign In
            </Link>
          )}

          {/* Hamburger Menu */}
          <button className="md:hidden text-white text-3xl" onClick={toggleMenu}>
            {menuOpen ? <IoClose /> : <BiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <div
        ref={menuRef}
        className={`md:hidden absolute top-full left-0 w-full bg-[#16423c]/95 backdrop-blur-2xl flex flex-col items-center gap-6 py-6 rounded-b-2xl transition-all duration-700 overflow-hidden ${
          menuOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {navItems.map((item, index) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className="relative text-white text-lg font-medium"
          >
            <span className="nav-link-animate">{item}</span>
          </Link>
        ))}

        {/* Mobile Logout / Sign In */}
        {user ? (
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="bg-[#B71C1C] hover:bg-[#8B0000] text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="bg-[#B71C1C] hover:bg-[#8B0000] text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
