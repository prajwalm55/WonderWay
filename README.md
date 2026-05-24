# 🌍 Travely — Full Stack Travel Booking System

Travely is a modern full-stack travel booking web application built using the **MERN Stack**.

The platform allows users to explore destinations, book tours, manage bookings, verify tickets, download tickets, and experience a premium responsive UI with real-world functionalities.

This project focuses on modern UI/UX, authentication, booking workflows, payment integration, dashboard management, and production-level features.

---

# 🚀 Live Demo

### 🌐 Frontend
https://travely-management-system-frontend.onrender.com

### ⚙️ Backend API
https://travely-management-system-backend.onrender.com

---

# ✨ Core Features

## 🌐 User Features

- 🌍 Browse Travel Destinations
- 🔎 Search & Explore Tours
- ⭐ Users Can Add Tour Reviews & Ratings
- 🎟️ Book Travel Packages
- 💳 Razorpay Payment Integration (Test Mode)
- 📄 Download PDF Ticket
- 🔳 QR Code Ticket Generation
- 📧 Booking Confirmation Emails
- ❌ Booking Cancellation System
- 📡 Live Booking Status Tracking
- 🎟️ Booking Verification System
- 👤 User Authentication & Profile Management
- 🖼️ Profile Photo Upload & Username Update
- 📱 Fully Responsive Design

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

# 🎟️ Complete Booking Workflow

## 🧭 Step 1 — Explore Tours

- Open the homepage
- Search destinations or explore available travel packages
- Select any tour package

---

## 📝 Step 2 — Fill Booking Details

- Click on **Book Now**
- Fill booking form details:
  - Full Name
  - Phone Number
  - Date
  - Number of Persons

---

## 💳 Step 3 — Razorpay Payment Process (Test Mode)

After filling booking details:

- Click on **Proceed To Payment**
- A secure payment popup will open

Example:

```bash
Secure Payment Gateway
Total Amount: ₹10000.00
Pay Now with Razorpay
```

### 👉 Important

Since Razorpay is currently running in **Test Mode**, please use the following demo flow for testing payments.

---

## 🏦 Demo Payment Steps

1️⃣ Click **Pay Now with Razorpay**

2️⃣ Razorpay payment page will open

3️⃣ Select:

```bash
Netbanking
```

4️⃣ Choose any demo bank

Example:

```bash
Bank of Baroda
```

5️⃣ A demo bank page will open like this:

```bash
Welcome to Razorpay Software Private Ltd Bank
This is just a demo bank page.
```

6️⃣ Choose:

```bash
Success
```

7️⃣ Payment verification will process automatically

8️⃣ Booking will be created successfully

---

## 🎫 Step 4 — Ticket Generation

After successful payment:

- Booking gets verified
- Ticket gets generated automatically
- QR Code gets generated
- User can download the PDF ticket

---

## 🔍 Step 5 — Booking Verification

Users can verify booking details using:

- Booking Code
- QR Code Verification

### Verification Flow

1️⃣ Open verification page

2️⃣ Scan QR Code from ticket  
OR

3️⃣ Enter Booking Code manually

4️⃣ Check booking status in real time

---

## ❌ Step 6 — Booking Cancellation

Users can also:

- Cancel bookings
- Track updated booking status
- View cancellation updates instantly

---

# 🎨 UI/UX Features

- ✨ Premium Modern UI Design
- 🌙 Dark Green Theme
- ⚡ Smooth Page Animations
- 🎬 Framer Motion Effects
- 📱 Fully Responsive Layout
- 🔔 Toast Notifications
- 🧭 Interactive Navigation
- 💎 Modern Cards & Hover Effects

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

Create a `.env` file inside the backend folder and add:

```env
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

# 📸 Project Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/67b5d842-a1af-47eb-bad7-5a32b82537ea" width="400"/>
  <img src="https://github.com/user-attachments/assets/9c5765ad-7403-4f19-9de7-059102902601" width="400"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/294061e2-ec42-45c4-8c0f-6691a00dcc92" width="400"/>
  <img src="https://github.com/user-attachments/assets/e07352c6-710f-450f-8a51-ee6757c89781" width="400"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ce3205f0-9c9f-441f-aeb5-ab98d53881c" width="400"/>
  <img src="https://github.com/user-attachments/assets/dede2710-23a4-456b-837e-2d114491e0c5" width="400"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/10b4d398-08e8-4a29-b5e9-e09d0979d1c4" width="400"/>
  <img src="https://github.com/user-attachments/assets/7174ea84-1a2b-4c79-8349-2b19fe17d93e" width="400"/>
</p>

---

# 🌟 Key Highlights

- Full Stack MERN Application
- Real-World Booking Workflow
- User Review & Rating System
- Razorpay Payment Integration
- Admin Dashboard Management
- QR-Based Ticket Verification
- PDF Ticket Generation
- Email Notification System
- Responsive Premium UI
- Authentication & Authorization
- Production Deployment

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

