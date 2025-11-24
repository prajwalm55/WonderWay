import React, { useState } from "react";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import PageWrapper from "../components/PageWrapper";
import QrScanner from "react-qr-scanner";

// COLORS
const DARK_GREEN_BG = "#001d16";
const ACCENT_GOLD = "#f7d774";
const CARD_BG = "rgba(0, 0, 0, 1)";
const INPUT_BG = "rgba(0, 0, 0, 0.55)";

const notify = (msg, type = "info") => {
  toast[type](msg, {
    position: "top-right",
    autoClose: 2500,
    transition: Slide,
    style: {
      background: CARD_BG,
      color: ACCENT_GOLD,
      border: `1px solid ${ACCENT_GOLD}`,
      fontWeight: "600",
      borderRadius: "10px",
      fontFamily: "'Cinzel', serif",
    },
  });
};

// ERROR BOUNDARY
class QRBoundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const VerifyBooking = () => {
  const [inputId, setInputId] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = (data) => {
    if (data) {
      const scannedId = data.text || data;
      setInputId(scannedId);
      notify(`QR scanned: ${scannedId}`, "info");
    }
  };

  const handleError = (err) => console.error(err);

  const handleVerify = async () => {
    const enteredId = inputId.trim();
    if (!enteredId) return notify("Enter Booking ID");

    setLoading(true);

    try {
      const res = await axios.get(
        `https://travely-management-system-backend.onrender.com/api/booking/code/${enteredId}`
      );

      const booking = res.data.data;
      setBookingData(booking);

      if (booking.status === "completed")
        notify("✔ Booking already completed!", "success");
      else if (booking.status === "cancelled")
        notify("❌ Booking cancelled!", "error");
      else notify("✔ Booking Verified!", "success");
    } catch (err) {
      const msg = err.response?.data?.message || "Verification failed!";
      setBookingData(null);
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const cameraSupported = () =>
    !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  return (
    <PageWrapper>
      <section
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: DARK_GREEN_BG,
          backgroundImage: "url('/assets/images/back4.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          backgroundAttachment: "fixed",
          filter: "blur(4px)",
          transform: "scale(1.04)",
        }}
      />

      {/* CONTENT */}
      <section
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-6 w-full"
        style={{ paddingTop: "130px" }}
      >
        {/* MAIN CARD */}
        <div
          className="p-8 rounded-2xl backdrop-blur-xl"
          style={{
            background: CARD_BG,
            border: `2px solid ${ACCENT_GOLD}`,
            minWidth: "330px",
            maxWidth: "520px",
            position: "relative",
            zIndex: 50,
          }}
        >
          <h2
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: ACCENT_GOLD, fontFamily: "'Cinzel', serif" }}
          >
            Verify Booking
          </h2>

          <QRBoundary>
            {cameraSupported() && (
              <QrScanner
                delay={300}
                onScan={handleScan}
                onError={handleError}
                style={{
                  width: "260px",
                  margin: "10px auto",
                  borderRadius: "10px",
                }}
              />
            )}
          </QRBoundary>

          <input
            type="text"
            placeholder="Enter Booking ID"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg"
            style={{
              background: INPUT_BG,
              border: `1px solid ${ACCENT_GOLD}`,
              color: ACCENT_GOLD,
              textAlign: "center",
              fontWeight: "600",
              fontFamily: "'Cinzel', serif",
            }}
          />

          <button
            onClick={handleVerify}
            className="w-full py-3 rounded-lg font-bold mb-2"
            style={{
              background: ACCENT_GOLD,
              color: "#000",
              fontFamily: "'Cinzel', serif",
            }}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Booking"}
          </button>

          {bookingData && (
            <div
              className="mt-6 p-5 rounded-xl"
              style={{
                background: "rgba(0,0,0,0.55)",
                border: `1px solid ${ACCENT_GOLD}`,
                color: "#fff",
              }}
            >
              <p>
                <strong>Name:</strong> {bookingData.fullName}
              </p>
              <p>
                <strong>Tour:</strong> {bookingData.tourName}
              </p>
              <p>
                <strong>Date:</strong> {bookingData.date}
              </p>
              <p>
                <strong>Persons:</strong> {bookingData.maxGroupSize}
              </p>
              <p>
                <strong>Price:</strong> ₹
                {bookingData.totalPrice.toLocaleString()}
              </p>
              <p>
                <strong>Booking ID:</strong> {bookingData.bookingCode}
              </p>
              {bookingData.status === "cancelled" && (
                <p className="mt-2 text-red-400 font-semibold">❌ Cancelled</p>
              )}
              {bookingData.status === "completed" && (
                <p className="mt-2 text-green-400 font-semibold">✔ Completed</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* BODY BACKGROUND */}
      <style>{`
        html, body {
          background-color: ${DARK_GREEN_BG} !important;
        }
      `}</style>
    </PageWrapper>
  );
};

export default VerifyBooking;
