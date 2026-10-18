import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ----------------------------------------------------------------------
// 🔹 Create transporter
// ----------------------------------------------------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
  logger: true,
});

// ----------------------------------------------------------------------
// 🔹 Send email function
// ----------------------------------------------------------------------
export const sendEmail = async (to, subject, html) => {
  try {
    console.log("📨 Trying to send email to:", to);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully to:", to);
  } catch (err) {
    console.log("❌ Email error:", err);
  }
};

// ----------------------------------------------------------------------
// 🔹 Email Templates
// ----------------------------------------------------------------------
export const bookingConfirmedEmail = (booking) => `
<div style="font-family: 'Poppins', sans-serif; max-width:600px; margin:auto; border:1px solid #e0e0e0; border-radius:12px; overflow:hidden;">
  <div style="background:#0f5132; color:#fff; padding:20px; text-align:center;">
    <h1>✔ Booking Confirmed!</h1>
    <p>Your trip is ready to go ✈️</p>
  </div>
  <div style="padding:20px; color:#333;">
    <h2>Hi ${booking.fullName},</h2>
    <p>Your booking has been successfully confirmed. Get ready for an amazing experience!</p>
    <table style="width:100%; border-collapse:collapse; margin-top:15px;">
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><b>Booking Code</b></td>
        <td style="padding:8px; border:1px solid #ddd;">${booking.bookingCode}</td>
      </tr>
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><b>Tour</b></td>
        <td style="padding:8px; border:1px solid #ddd;">${booking.tourName}</td>
      </tr>
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><b>Total Price</b></td>
        <td style="padding:8px; border:1px solid #ddd;">₹${booking.totalPrice}</td>
      </tr>
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><b>Date</b></td>
        <td style="padding:8px; border:1px solid #ddd;">${booking.date}</td>
      </tr>
    </table>
    <p style="margin-top:20px;">Thank you for choosing WanderWay. We wish you an unforgettable journey! 🌟</p>
  </div>
  <div style="background:#f0f0f0; text-align:center; padding:15px; color:#555; font-size:12px;">
    WanderWay — Veelgen Tech | support@veelgen.tech
  </div>
</div>
`;

export const bookingCancelledEmail = (booking) => `
<div style="font-family: 'Poppins', sans-serif; max-width:600px; margin:auto; border:1px solid #e0e0e0; border-radius:12px; overflow:hidden;">
  <div style="background:#842029; color:#fff; padding:20px; text-align:center;">
    <h1>❌ Booking Cancelled</h1>
    <p>Your booking has been cancelled</p>
  </div>
  <div style="padding:20px; color:#333;">
    <h2>Hi ${booking.fullName},</h2>
    <p>We regret to inform you that your booking has been cancelled.</p>
    <table style="width:100%; border-collapse:collapse; margin-top:15px;">
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><b>Booking Code</b></td>
        <td style="padding:8px; border:1px solid #ddd;">${booking.bookingCode}</td>
      </tr>
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><b>Tour</b></td>
        <td style="padding:8px; border:1px solid #ddd;">${booking.tourName}</td>
      </tr>
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><b>Total Price</b></td>
        <td style="padding:8px; border:1px solid #ddd;">₹${booking.totalPrice}</td>
      </tr>
      <tr>
        <td style="padding:8px; border:1px solid #ddd;"><b>Date</b></td>
        <td style="padding:8px; border:1px solid #ddd;">${booking.date}</td>
      </tr>
    </table>
    <p style="margin-top:20px; color:#842029;">
      You are eligible for a refund if your cancellation request meets the policy. Refunds are processed within 7 days. 
      For any queries, contact support immediately.
    </p>
  </div>
  <div style="background:#f0f0f0; text-align:center; padding:15px; color:#555; font-size:12px;">
    WanderWay — Veelgen Tech | support@veelgen.tech
  </div>
</div>
`;
