# Travely - Travel Booking System

A modern **travel booking web application** built with **React (Vite)** for the frontend and **Node.js/Express** for the backend.  
This project is designed for final year college submission and includes features like booking confirmation, QR ticket generation, premium UI, and responsive design.

---

## 🔹 Features

### Frontend
- React + Vite setup with fast HMR
- TailwindCSS for styling with custom premium themes
- Premium loader and animations using Framer Motion
- Fully responsive design (desktop, tablet, mobile)
- Booking confirmation page with downloadable PDF ticket
- QR code generation for each booking
- Profile and authentication management
- Smooth navbar, interactive cards, and hover effects

### Backend
- Node.js + Express REST API
- MongoDB for booking and user data
- Booking creation, fetching, verification endpoints
- Real-time toast notifications
- Error handling and validation
- JWT-based authentication for secure login
  
---

## 🔹 Installation

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node server.js
```
### Open http://localhost:5173 to view the app in the browser.

🔹 Usage

Booking a Tour:

Navigate to Home → Select a tour → Fill details → Confirm booking.
On confirmation, you will see a ticket page with QR code.
Download Ticket:

Click the “⬇ Download Ticket” button to get a PDF version.
Profile Management:

Sign in / Register → Access your bookings → View / Check ticket.
Verify Booking:

Scan the QR code on ticket → Redirects to verification page.


🔹 Technologies Used

Frontend:

React + Vite
TailwindCSS
Framer Motion
react-qr-code
react-toastify
react-router-dom

Backend:
Node.js + Express
MongoDB + Mongoose
JWT Authentication
CORS

Other Tools:
ESLint
jsPDF + html2canvas (for ticket PDF)
Git / GitHub


🔹 Deployment


🔹 Author

Harshal patil – Final Year College Project

Email: harshEditz79@gmail.com.com

GitHub: https://github.com/harsheditz79
