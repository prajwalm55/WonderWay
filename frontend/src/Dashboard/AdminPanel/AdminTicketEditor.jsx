// // --- src/Dashboard/AdminPanel/AdminTicketEditor.jsx ---
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import PageWrapper from "../../components/PageWrapper";
// import { motion } from "framer-motion";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import QRCode from "react-qr-code";
// import ticketBg from "../../assets/images/ticket.png";
// import logo from "../../assets/images/logonavm-clear.png";
// import axios from "axios";
// import BASE_URL from "../../utils/config";
// import { toast } from "react-toastify";

// const DARK_CARD_BG = "rgba(18, 55, 42, 0.98)";
// const ACCENT_GOLD = "#f7d774";
// const PREMIUM_ACCENT_GREEN = "#6ee7b7";

// const AdminTicketEditor = () => {
//   const { id } = useParams();
//   const [booking, setBooking] = useState(null);

//   const [passenger, setPassenger] = useState("");
//   const [destination, setDestination] = useState("");
//   const [date, setDate] = useState("");
//   const [persons, setPersons] = useState(1);
//   const [price, setPrice] = useState(0);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch booking data
//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/bookings/${id}`);
//         const data = res.data.booking || res.data.data || res.data;

//         if (!data) {
//           toast.error("No booking found!");
//           return;
//         }

//         setBooking(data);
//         setPassenger(data.fullName || "");
//         setDestination(data.tourName || "");
//         setDate(data.date || "");
//         setPersons(data.maxGroupSize || 1);
//         setPrice(data.totalPrice || 0);
//       } catch (err) {
//         console.error("Error fetching booking:", err);
//         toast.error("Failed to load booking.");
//       }
//     };
//     fetchBooking();
//   }, [id]);

//   // ✅ Save updated booking
//   const handleSave = async () => {
//     try {
//       setLoading(true);

//       const updatedBooking = {
//         fullName: passenger,
//         tourName: destination,
//         date,
//         maxGroupSize: persons,
//         totalPrice: price,
//       };

//       const res = await axios.put(
//         `${BASE_URL}/bookings/admin/update/${id}`,
//         updatedBooking,
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       toast.success("✅ Booking updated successfully!");
//       setBooking(res.data.updatedBooking || updatedBooking);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error updating booking:", error);
//       toast.error("❌ Failed to update booking.");
//       setLoading(false);
//     }
//   };

//   // ✅ Download Ticket
//   const handleDownloadTicket = async () => {
//     const ticket = document.getElementById("ticket-card");
//     if (!ticket) return;

//     const canvas = await html2canvas(ticket, { scale: 4, useCORS: true });
//     const imgData = canvas.toDataURL("image/png", 1.0);
//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [canvas.width, canvas.height],
//     });
//     pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
//     pdf.save(`WanderWay-UpdatedTicket-${id}.pdf`);
//   };

//   if (!booking) return <p>Loading booking...</p>;

//   return (
//     <PageWrapper>
//       <section className="flex flex-col items-center min-h-screen px-4 pt-4 pb-6">
//         <motion.div
//           className="rounded-2xl p-5 text-center"
//           style={{ background: DARK_CARD_BG, width: "650px" }}
//         >
//           <h2
//             className="text-3xl md:text-4xl font-bold mb-4"
//             style={{ fontFamily: "'Cinzel', serif" }}
//           >
//             <span style={{ color: PREMIUM_ACCENT_GREEN }}>
//               Admin Ticket Editor
//             </span>
//           </h2>

//           {/* 🎫 Ticket Card */}
//           <div
//             id="ticket-card"
//             style={{
//               width: "600px",
//               height: "300px",
//               backgroundImage: `url(${ticketBg})`,
//               backgroundSize: "cover",
//               backgroundRepeat: "no-repeat",
//               borderRadius: "14px",
//               position: "relative",
//               padding: "20px",
//             }}
//           >
//             {/* Left Inputs */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: "20px",
//                 left: "20px",
//                 color: ACCENT_GOLD,
//               }}
//             >
//               <span
//                 style={{
//                   fontSize: "22px",
//                   fontWeight: "700",
//                   fontFamily: "'Cinzel Decorative', cursive",
//                 }}
//               >
//                 WanderWay
//               </span>
//               <div
//                 style={{
//                   fontSize: "16px",
//                   fontWeight: "600",
//                   marginTop: "6px",
//                   fontFamily: "'Cinzel', serif",
//                 }}
//               >
//                 Booking Service
//               </div>

//               <div
//                 style={{
//                   marginTop: "20px",
//                   lineHeight: "1.6",
//                   fontFamily: "'Cinzel', serif",
//                   fontSize: "13px",
//                   fontWeight: "700",
//                 }}
//               >
//                 <p>
//                   Passenger:{" "}
//                   <input
//                     type="text"
//                     value={passenger}
//                     onChange={(e) => setPassenger(e.target.value)}
//                   />
//                 </p>
//                 <p>
//                   Destination:{" "}
//                   <input
//                     type="text"
//                     value={destination}
//                     onChange={(e) => setDestination(e.target.value)}
//                   />
//                 </p>
//                 <p>
//                   Date:{" "}
//                   <input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                   />
//                 </p>
//                 <p>
//                   No. of Persons:{" "}
//                   <input
//                     type="number"
//                     value={persons}
//                     onChange={(e) => setPersons(e.target.value)}
//                   />
//                 </p>
//                 <p>
//                   Price:{" "}
//                   <input
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                   />
//                 </p>
//               </div>
//             </div>

//             {/* Right Logo & QR */}
//             <div
//               style={{
//                 position: "absolute",
//                 right: "60px",
//                 top: "20px",
//                 width: "180px",
//                 textAlign: "center",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   gap: "6px",
//                   marginBottom: "8px",
//                 }}
//               >
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   style={{ width: "30px", height: "30px" }}
//                 />
//                 <span
//                   style={{
//                     color: ACCENT_GOLD,
//                     fontWeight: "700",
//                     fontFamily: "'Cinzel', serif",
//                     fontSize: "16px",
//                   }}
//                 >
//                   WanderWay
//                 </span>
//               </div>
//               <QRCode value={id} size={95} bgColor="transparent" fgColor="#000" />
//               <p
//                 style={{
//                   marginTop: "8px",
//                   fontSize: "12px",
//                   fontWeight: "700",
//                   color: "#000",
//                   background: "transparent",
//                   padding: "3px 7px",
//                   borderRadius: "8px",
//                 }}
//               >
//                 Booking ID: {id}
//               </p>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
//             <motion.button
//               onClick={handleDownloadTicket}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.97 }}
//               className="px-5 py-2.5 font-semibold rounded-lg"
//               style={{
//                 background: ACCENT_GOLD,
//                 color: "#000",
//                 fontFamily: "'Cinzel', serif",
//               }}
//             >
//               ⬇ Download Ticket
//             </motion.button>

//             <motion.button
//               onClick={handleSave}
//               disabled={loading}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.97 }}
//               className="px-5 py-2.5 font-semibold rounded-lg"
//               style={{
//                 background: PREMIUM_ACCENT_GREEN,
//                 color: "#000",
//                 fontFamily: "'Cinzel', serif",
//               }}
//             >
//               💾 {loading ? "Saving..." : "Save Changes"}
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>
//     </PageWrapper>
//   );
// };

// export default AdminTicketEditor;
