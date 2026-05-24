# 🌍 Travely — Full Stack Travel Booking System

A modern full-stack travel booking web application built using MERN Stack (React + Node.js + Express + MongoDB).

It supports tour booking, payments, QR ticket generation, PDF downloads, email notifications, and admin management — designed as a real-world project and final year submission.

---

## 🚀 Live Demo

🔗 https://travely-management-system-frontend.onrender.com

---

# ✨ Core Features

## 🌐 User Features

- 🌍 Browse & Explore Travel Destinations
- 🔎 Search Tours & Travel Packages
- ⭐ Add Tour Reviews & Ratings
- 🎟️ Book Travel Packages
- 💳 Razorpay Payment Integration (Test Mode)
- 📧 Booking Confirmation Email System
- 📡 Live Booking Status Tracking
- 🎟️ Booking Verification System
- ❌ Booking Cancellation Feature

---

## 🎫 Ticket & Verification Features

- 📄 Download PDF Ticket
- 🔳 QR Code Ticket Generation
- 🔍 QR-Based Booking Verification
- 🧾 Booking Code Verification

---

## 👤 Authentication & Profile

- 🔐 User Authentication System
- 👤 User Profile Management
- 🖼️ Profile Photo Upload
- ✏️ Username Update System

---

## 🎨 UI/UX Features

- 🌙 Premium Dark Green UI Theme
- ⚡ Smooth Animations & Effects
- 📱 Fully Responsive Design
- 🔔 Toast Notifications
- 💎 Modern Cards & Layouts

---

## ⚙️ Admin Dashboard Features

- 📊 Admin Dashboard Panel
- ➕ Create New Bookings
- 📝 Update Booking Details
- ❌ Delete Bookings
- 👥 Manage Users
- 📡 Live Booking Status Management
- 🛡️ Protected Admin Routes

---

# 🎟️ Booking Workflow

1️⃣ Explore and select a tour package  
2️⃣ Fill booking details  
3️⃣ Click **Proceed To Payment**  
4️⃣ Complete payment using Razorpay Test Mode  
5️⃣ Booking gets verified automatically  
6️⃣ PDF ticket & QR code get generated  
7️⃣ Download ticket anytime  
8️⃣ Verify booking using Booking Code or QR Code  
9️⃣ Cancel booking and track live status updates  

> ⚠️ Razorpay is currently running in **Test Mode**.  
> For demo payments, select:
>
> `Netbanking → Any Demo Bank → Success`

---

# 🛠️ Tech Stack

## Frontend

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,js" />
</p>

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- React Toastify
- react-qr-code

---

## Backend

<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />
</p>

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Nodemailer
- Razorpay
- CORS

---

# 🧰 Additional Tools

- jsPDF
- html2canvas
- Git & GitHub
- MongoDB Atlas

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/harshal-patil-dev/Travely-Management-System.git
```

---

# ⚙️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# ⚙️ Backend Setup

```bash
cd backend
npm install
npm start
```

---

# 🔑 Environment Variables (.env)

Create a `.env` file inside the backend and frontend and add:

```env frontend
# frontend
VITE_BASE_URL=your_backend_url/api
```

```env backend
# backend
SECRET_KEY=your_secret_key
JWT_EXPIRE_TIME=7d

MONGO_URL=your_mongodb_connection_url

BACKEND_URL=http://localhost:4000
PORT=4000

# Razorpay Keys
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

---

# 🌐 Open In Browser

```bash
http://localhost:5173
```

---

# 📸 Project Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/67b5d842-a1af-47eb-bad7-5a32b82537ea" width="400"/>
  <img src="https://github.com/user-attachments/assets/9c5765ad-7403-4f19-9de7-059102902601" width="400"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a00e7485-3522-48c6-971f-f115451b249a" width="400"/>
  <img src="https://github.com/user-attachments/assets/e07352c6-710f-450f-8a51-ee6757c89781" width="400"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/1f824e74-a727-470b-a436-faf11fb117c9" width="400"/>
  <img src="https://github.com/user-attachments/assets/c5f0919f-b540-48c0-bec8-00325455508b" width="400"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/78b1547b-0db9-4f53-a746-acb7b66865c3" width="400"/>
  <img src="https://github.com/user-attachments/assets/cd68ff08-405f-4cea-97f5-c6dbe4222b35" width="400"/>
</p>

---

# 🌟 Key Highlights

- Full Stack MERN Project
- Complete Tour Booking Workflow
- Razorpay Payment Integration
- QR & PDF Ticket System
- User Reviews & Ratings
- Admin Dashboard
- Booking Verification & Cancellation
- Email Notification System
- Authentication & Authorization
- Responsive Modern UI
  
---

# 🌐 Deployment

## Frontend
- Hosted on Render

## Backend
- Hosted on Render

## Database
- MongoDB Atlas

---

# 👨‍💻 Author

## Harshal Patil

### GitHub
https://github.com/harshal-patil-dev

### LinkedIn
https://www.linkedin.com/in/harshal-patil-dev

---

# 📄 License

This project was developed for educational, portfolio, and learning purposes.
