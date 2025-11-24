// --- src/pages/Booked.jsx ---
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { toast, Slide } from "react-toastify";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import ticketBg from "../assets/images/ticket.png";
import logo from "../assets/images/logonavm-clear.png";
import axios from "axios";

// COLORS
const DARK_GREEN_BG = "#00291e";
const ACCENT_GOLD = "#f7d774";
const DARK_CARD_BG = "rgba(18, 55, 42, 0.98)";
const SUCCESS_BG = "#004d33";
const PREMIUM_ACCENT_GREEN = "#6ee7b7";

// Default toast
const DEFAULT_TOAST_OPTIONS = {
  position: "top-right",
  autoClose: 2500,
  transition: Slide,
  style: {
    color: "#fff8e7",
    fontFamily: "'Cinzel', serif",
    fontWeight: "600",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
};

const notify = (message, type = "success", id = "booked-toast") => {
  if (toast.isActive(id)) return;

  let toastFn = toast.success;
  const baseStyle = {
    ...DEFAULT_TOAST_OPTIONS.style,
    borderRadius: "12px",
  };

  if (type === "info") {
    toastFn = toast.info;
    toastFn(message, {
      toastId: id,
      ...DEFAULT_TOAST_OPTIONS,
      style: {
        ...baseStyle,
        background: DARK_CARD_BG,
        border: `1px solid ${ACCENT_GOLD}`,
        color: "#fff8e7",
      },
    });
  } else if (type === "error") {
    toastFn = toast.error;
    toastFn(message, {
      toastId: id,
      ...DEFAULT_TOAST_OPTIONS,
      style: {
        ...baseStyle,
        background: "#6b0000",
        border: `1px solid ${ACCENT_GOLD}`,
        color: "#fff8e7",
      },
    });
  } else {
    // success
    toastFn(message, {
      toastId: id,
      ...DEFAULT_TOAST_OPTIONS,
      style: {
        ...baseStyle,
        background: SUCCESS_BG,
        border: `1px solid ${ACCENT_GOLD}`,
        color: "#fff8e7",
      },
    });
  }
};

// DOWNLOAD TICKET
const handleDownloadTicket = async () => {
  const ticket = document.getElementById("ticket-card");
  if (!ticket)
    return notify("Ticket not found!", "info", "download-ticket-toast");

  notify("Preparing HD Ticket...", "info", "download-ticket-toast");

  try {
    const canvas = await html2canvas(ticket, {
      scale: 4,
      useCORS: true,
      backgroundColor: null,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      canvas.width,
      canvas.height,
      undefined,
      "FAST"
    );
    pdf.save("Travely-Ticket.pdf");

    notify(
      "Ticket Downloaded Successfully!",
      "success",
      "download-ticket-toast"
    );
  } catch (err) {
    console.error("Error generating ticket PDF:", err);
    notify(
      "Failed to prepare ticket. Try again.",
      "error",
      "download-ticket-toast"
    );
  }
};

const Booked = () => {
  const location = useLocation();
  const { bookingId: paramBookingId } = useParams();

  const bookingState = location.state || {};
  const [booking, setBooking] = useState(bookingState.booking || null);
  const [bookingId, setBookingId] = useState(
    bookingState.bookingId || paramBookingId || null
  );

  const toastShownRef = useRef(false);
  const mountedRef = useRef(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userName = booking?.fullName?.trim() || "Passenger";

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString || "N/A";
    }
  };

  // Show "Booking confirmed"
  useEffect(() => {
    if (!toastShownRef.current) {
      notify(
        "🎉 Booking confirmed! Your ticket is ready.",
        "success",
        "booked-toast"
      );
      toastShownRef.current = true;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Fetch booking info
  useEffect(() => {
    let cancelled = false;

    const fetchBooking = async () => {
      try {
        if (!booking && bookingId) {
          const res = await axios.get(
            `https://travely-management-system-backend.onrender.com/api/booking/${bookingId}`
          );
          if (res?.data?.success && !cancelled) {
            setBooking(res.data.data);
            if (!bookingId && res.data.data.bookingCode) {
              setBookingId(res.data.data.bookingCode);
            }
          } else if (!res?.data?.success) {
            notify(
              "Unable to fetch booking details.",
              "info",
              "fetch-booking-toast"
            );
          }
        }
      } catch (error) {
        console.error("Fetch booking error:", error);
        notify(
          "Failed to fetch booking. Check your connection.",
          "error",
          "fetch-booking-toast"
        );
      }
    };

    fetchBooking();

    return () => {
      cancelled = true;
    };
  }, [bookingId, booking]);

  // Desktop positions
  const POSITIONS = {
    passengerTop: "110px",
    passengerLeft: "80px",
    destinationTop: "135px",
    destinationLeft: "80px",
    dateTop: "160px",
    dateLeft: "80px",
    personsTop: "185px",
    personsLeft: "80px",
    priceTop: "208px",
    priceLeft: "80px",
    qrRight: "80px",
    logoTop: "30px",
    logoLeft: "80px",
  };

  // Mobile positions (adjust as needed)
  const MOBILE_POSITIONS = {
    passengerTop: "85px",
    passengerLeft: "15px",
    destinationTop: "105px",
    destinationLeft: "15px",
    dateTop: "125px",
    dateLeft: "15px",
    personsTop: "143px",
    personsLeft: "15px",
    priceTop: "162px",
    priceLeft: "15px",
    qrRight: "3px",
    logoTop: "42px",
    logoLeft: "10px",
  };

  const activePositions = isMobile ? MOBILE_POSITIONS : POSITIONS;

  const QR_LINK = `https://travely-management-system-frontend.onrender.com/verify-booking/${
    booking?.bookingCode || bookingId
  }`;

  return (
    <PageWrapper>
      <section
        className="relative z-20 flex flex-col items-center justify-center w-full text-center px-4 sm:px-6 min-h-screen pt-36 sm:pt-28 pb-12"
        style={{ backgroundColor: DARK_GREEN_BG }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-5 text-center mt-2 w-full max-w-3xl"
          style={{
            background: DARK_CARD_BG,
            border: `2px solid ${ACCENT_GOLD}`,
            minHeight: "420px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            boxShadow: "0 10px 25px rgba(0,0,0,0.7)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: "'Cinzel', serif",
              letterSpacing: "1px",
              textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
            }}
          >
            <span className="text-green-100">🎫 DIGITAL </span>
            <span style={{ color: PREMIUM_ACCENT_GREEN }}>TRAVELY TICKET</span>
          </motion.h2>

          {/* ---------------- TICKET ---------------- */}
          <div
            id="ticket-card"
            className="relative mb-2"
            style={{
              width: isMobile ? "325px" : "600px",
              height: isMobile ? "250px" : "300px",
              borderRadius: "18px",
              overflow: "hidden",
              padding: "20px",
              border: `2px solid ${ACCENT_GOLD}`,
              boxShadow: "0 12px 30px rgba(0,0,0,0.8)",
              backgroundImage: `url(${ticketBg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* TRAVELY LOGO */}
            <div
              style={{
                position: "absolute",
                top: activePositions.logoTop,
                left: activePositions.logoLeft,
              }}
            >
              <span
                style={{
                  color: ACCENT_GOLD,
                  fontSize: isMobile ? "15px" : "24px",
                  fontWeight: "700",
                  fontFamily: "'Cinzel Decorative', cursive",
                }}
              >
                Travely
              </span>
              <div
                style={{
                  color: ACCENT_GOLD,
                  fontSize: isMobile ? "11px" : "18px",
                  fontWeight: "600",
                  marginTop: "1px",
                }}
              >
                Travely Booking Service
              </div>
            </div>

            {/* INFO FIELDS */}
            {["Passenger", "Destination", "Date", "Persons", "Price"].map(
              (label, idx) => {
                const infoMap = {
                  Passenger: {
                    value: userName,
                    top: activePositions.passengerTop,
                    left: activePositions.passengerLeft,
                  },
                  Destination: {
                    value: booking?.tourName || "-",
                    top: activePositions.destinationTop,
                    left: activePositions.destinationLeft,
                  },
                  Date: {
                    value: formatDate(booking?.date),
                    top: activePositions.dateTop,
                    left: activePositions.dateLeft,
                  },
                  Persons: {
                    value: booking?.maxGroupSize || "-",
                    top: activePositions.personsTop,
                    left: activePositions.personsLeft,
                  },
                  Price: {
                    value: booking
                      ? `₹${Number(booking.totalPrice).toLocaleString()}`
                      : "-",
                    top: activePositions.priceTop,
                    left: activePositions.priceLeft,
                  },
                };
                const info = infoMap[label];
                return (
                  <p
                    key={idx}
                    style={{
                      position: "absolute",
                      top: info.top,
                      left: info.left,
                      color: ACCENT_GOLD,
                      fontFamily: "'Cinzel', serif",
                      fontSize: isMobile ? "12px" : "15px",
                      fontWeight: "700",
                    }}
                  >
                    {label}:{" "}
                    <span style={{ color: "#fff5d0" }}>{info.value}</span>
                  </p>
                );
              }
            )}

            {/* QR + BOOKING ID */}
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: activePositions.qrRight,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: isMobile ? "35px" : "45px", height: isMobile ? "35px" : "45px" }}
              />
              <QRCode
                value={QR_LINK}
                size={isMobile ? 90 : 115}
                bgColor="transparent"
                fgColor="#000"
              />
              <p
                style={{
                  fontSize: isMobile ? "10px" : "12px",
                  fontWeight: "800",
                  color: "#000",
                  padding: "3px 7px",
                  textAlign: "center",
                }}
              >
                Booking ID: {booking?.bookingCode || bookingId || "N/A"}
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-2 justify-center w-full">
            <motion.button
              onClick={handleDownloadTicket}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 font-semibold rounded-lg w-full md:w-auto"
              style={{
                background: ACCENT_GOLD,
                color: "#000",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ⬇ Download Ticket
            </motion.button>

            <Link to="/my-account" className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 font-semibold rounded-lg w-full md:w-auto"
                style={{
                  background: SUCCESS_BG,
                  color: "#fff",
                  fontFamily: "'Cinzel', serif",
                  border: `1px solid ${ACCENT_GOLD}`,
                }}
              >
                🧾 Check Booking
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Booked;
