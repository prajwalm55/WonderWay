// index.js
// Backend Server (Ready for Render Deployment)

import express from "express";
// import mongoose from "mongoose"; // MongoDB is disabled for local dummy-data mode.
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

// MongoDB-backed route modules are disabled in local demo mode.

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === "production";

app.disable("x-powered-by");
app.set("trust proxy", 1);

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection is intentionally disabled for local development.
// The local tour API below uses in-memory data instead.
// mongoose.connect(process.env.MONGO_URL);

const localTours = [
  { _id: "local-tour-001", title: "Misty Mountains of Munnar", city: "Munnar", address: "Tea Garden Road, Kerala", distance: 12, photo: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80", desc: "Walk through fragrant tea gardens, misty viewpoints and quiet mountain trails.", price: 8999, maxGroupSize: 10, featured: true, reviews: [] },
  { _id: "local-tour-002", title: "Backwater Escape in Alleppey", city: "Alleppey", address: "Punnamada Lake, Kerala", distance: 8, photo: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80", desc: "Cruise through palm-fringed canals and enjoy a relaxed stay on a traditional houseboat.", price: 11999, maxGroupSize: 8, featured: true, reviews: [] },
  { _id: "local-tour-003", title: "Golden Sands of Goa", city: "Goa", address: "Calangute Beach, Goa", distance: 5, photo: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80", desc: "A sunny coastal break with beaches, local food, sunset walks and island views.", price: 9999, maxGroupSize: 12, featured: true, reviews: [] },
  { _id: "local-tour-004", title: "Royal Trails of Jaipur", city: "Jaipur", address: "Amer Fort Road, Rajasthan", distance: 10, photo: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80", desc: "Discover grand forts, colourful bazaars and the architectural heritage of the Pink City.", price: 7499, maxGroupSize: 14, featured: true, reviews: [] },
  { _id: "local-tour-005", title: "Taj and Heritage of Agra", city: "Agra", address: "Taj East Gate Road, Uttar Pradesh", distance: 6, photo: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80", desc: "Experience the Taj Mahal, Mughal history and the best local flavours of Agra.", price: 6499, maxGroupSize: 12, featured: false, reviews: [] },
  { _id: "local-tour-006", title: "Lakes and Palaces of Udaipur", city: "Udaipur", address: "Lake Pichola, Rajasthan", distance: 9, photo: "https://images.unsplash.com/photo-1602643163986-7c6f4a7d4f5b?auto=format&fit=crop&w=1200&q=80", desc: "Sail across Lake Pichola and explore the romantic palaces of the City of Lakes.", price: 10499, maxGroupSize: 10, featured: true, reviews: [] },
  { _id: "local-tour-007", title: "Himalayan Calm in Manali", city: "Manali", address: "Old Manali, Himachal Pradesh", distance: 18, photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80", desc: "Breathe in mountain air with riverside walks, cafes and scenic Himalayan drives.", price: 10999, maxGroupSize: 10, featured: true, reviews: [] },
  { _id: "local-tour-008", title: "Valleys and Monasteries of Leh", city: "Leh", address: "Shanti Stupa Road, Ladakh", distance: 24, photo: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=80", desc: "Ride through dramatic high-altitude landscapes and visit peaceful Himalayan monasteries.", price: 16999, maxGroupSize: 8, featured: true, reviews: [] },
  { _id: "local-tour-009", title: "Tropical Trails of Andaman", city: "Port Blair", address: "Havelock Island, Andaman", distance: 15, photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80", desc: "Swim in clear blue water, relax on quiet beaches and explore coral reefs.", price: 18999, maxGroupSize: 8, featured: true, reviews: [] },
  { _id: "local-tour-010", title: "Culture and Cafes of Bengaluru", city: "Bengaluru", address: "Church Street, Karnataka", distance: 7, photo: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80", desc: "Enjoy gardens, modern art, neighbourhood cafes and the energy of Bengaluru.", price: 5499, maxGroupSize: 16, featured: false, reviews: [] },
  { _id: "local-tour-011", title: "Temple Towns of Tamil Nadu", city: "Madurai", address: "Meenakshi Temple Road, Tamil Nadu", distance: 11, photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80", desc: "Explore colourful temples, heritage streets and the flavours of southern India.", price: 6999, maxGroupSize: 14, featured: false, reviews: [] },
  { _id: "local-tour-012", title: "Wildlife Weekend in Ranthambore", city: "Ranthambore", address: "Ranthambore National Park, Rajasthan", distance: 20, photo: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80", desc: "Take early morning safaris through tiger country and historic jungle ruins.", price: 12999, maxGroupSize: 8, featured: true, reviews: [] },
  { _id: "local-tour-013", title: "Fort Kochi Art Walk", city: "Kochi", address: "Princess Street, Kerala", distance: 6, photo: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80", desc: "See colonial lanes, waterfront sunsets, galleries and the famous Chinese fishing nets.", price: 5999, maxGroupSize: 12, featured: false, reviews: [] },
  { _id: "local-tour-014", title: "Rishikesh River Retreat", city: "Rishikesh", address: "Laxman Jhula, Uttarakhand", distance: 13, photo: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80", desc: "Combine yoga, riverside cafes, meditation and a gentle white-water adventure.", price: 7999, maxGroupSize: 12, featured: false, reviews: [] },
  { _id: "local-tour-015", title: "Meghalaya Cloud Country", city: "Shillong", address: "Police Bazaar, Meghalaya", distance: 22, photo: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", desc: "Chase waterfalls, living root bridges and cloud-covered viewpoints in the Northeast.", price: 13999, maxGroupSize: 10, featured: true, reviews: [] },
  { _id: "local-tour-016", title: "Sikkim Himalayan Discovery", city: "Gangtok", address: "MG Marg, Sikkim", distance: 19, photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80", desc: "Visit mountain lakes, monasteries and panoramic viewpoints around Gangtok.", price: 12499, maxGroupSize: 10, featured: false, reviews: [] },
  { _id: "local-tour-017", title: "Mumbai Food and Heritage Trail", city: "Mumbai", address: "Colaba Causeway, Maharashtra", distance: 8, photo: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80", desc: "Taste iconic street food and discover the stories behind South Mumbai landmarks.", price: 4999, maxGroupSize: 16, featured: false, reviews: [] },
  { _id: "local-tour-018", title: "Desert Nights in Jaisalmer", city: "Jaisalmer", address: "Sam Sand Dunes, Rajasthan", distance: 28, photo: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80", desc: "Camp beneath the stars with camel rides, folk music and golden desert sunsets.", price: 8499, maxGroupSize: 12, featured: false, reviews: [] },
];

const demoUsers = [
  {
    _id: "demo-user-001",
    username: "Demo User",
    email: process.env.DEMO_USER_EMAIL || "demo@wonderway.local",
    password: process.env.DEMO_USER_PASSWORD || "WonderUser@123",
    role: "user",
    photo: "",
  },
  {
    _id: "demo-admin-001",
    username: "Demo Admin",
    email: process.env.DEMO_ADMIN_EMAIL || "admin@wonderway.local",
    password: process.env.DEMO_ADMIN_PASSWORD || "WonderAdmin@123",
    role: "admin",
    photo: "",
  },
];

const localBookings = [];
const localReviews = [
  { _id: "demo-review-001", tourId: "local-tour-001", username: "Demo User", reviewText: "Beautiful views and a very peaceful itinerary.", rating: 5, createdAt: new Date().toISOString() },
  { _id: "demo-review-002", tourId: "local-tour-003", username: "Demo User", reviewText: "A great beach escape with a smooth experience.", rating: 4, createdAt: new Date().toISOString() },
];

const getLocalUser = (req) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SECRET_KEY || "local-demo-secret");
  } catch {
    return null;
  }
};

const requireLocalUser = (req, res, next) => {
  const user = getLocalUser(req);
  if (!user) return res.status(401).json({ message: "Please log in to continue" });
  req.localUser = user;
  next();
};

const requireLocalAdmin = (req, res, next) => {
  if (req.localUser?.role !== "admin") return res.status(403).json({ message: "Admin access required" });
  next();
};

const localAuthRouter = express.Router();
localAuthRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = demoUsers.find((item) => item.email === email && item.password === password);
  if (!user) return res.status(401).json({ message: "Invalid demo credentials" });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY || "local-demo-secret", { expiresIn: "7d" });
  const { password: _password, ...safeUser } = user;
  res.json({ message: "Login successful", data: safeUser, token, role: user.role });
});
localAuthRouter.post("/register", (req, res) => {
  res.status(403).json({ message: "Registration is disabled in local demo mode. Use the supplied demo account." });
});

const localUserRouter = express.Router();
localUserRouter.get("/users/:id", requireLocalUser, (req, res) => {
  const user = demoUsers.find((item) => item._id === req.params.id);
  if (!user || (req.localUser.role !== "admin" && req.localUser.id !== user._id)) return res.status(404).json({ message: "User not found" });
  const { password: _password, ...safeUser } = user;
  res.json({ success: true, data: safeUser });
});
localUserRouter.put("/users/:id", requireLocalUser, (req, res) => {
  const user = demoUsers.find((item) => item._id === req.params.id);
  if (!user || (req.localUser.role !== "admin" && req.localUser.id !== user._id)) return res.status(404).json({ message: "User not found" });
  Object.assign(user, { username: req.body.username || user.username, photo: req.body.photo || user.photo });
  const { password: _password, ...safeUser } = user;
  res.json({ success: true, data: safeUser });
});

const localBookingRouter = express.Router();
localBookingRouter.post("/", requireLocalUser, (req, res) => {
  const booking = {
    _id: `demo-booking-${Date.now()}`,
    bookingCode: `TRVL-${Math.floor(10000 + Math.random() * 90000)}`,
    userId: req.localUser.id,
    ...req.body,
    status: "active",
    paymentStatus: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  localBookings.push(booking);
  res.status(201).json({ success: true, message: "Demo booking created", booking });
});
localBookingRouter.get("/admin/all", requireLocalUser, requireLocalAdmin, (req, res) => res.json({ success: true, data: localBookings, count: localBookings.length }));
localBookingRouter.get("/user", requireLocalUser, (req, res) => res.json({ success: true, data: localBookings.filter((item) => item.userId === req.localUser.id) }));
localBookingRouter.get("/", requireLocalUser, (req, res) => res.json({ success: true, data: localBookings.filter((item) => req.localUser.role === "admin" || item.userId === req.localUser.id) }));
localBookingRouter.get("/code/:bookingCode", (req, res) => {
  const booking = localBookings.find((item) => item.bookingCode === req.params.bookingCode);
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
  res.json({ success: true, data: booking });
});
localBookingRouter.get("/:id", requireLocalUser, (req, res) => {
  const booking = localBookings.find((item) => item._id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
  res.json({ success: true, data: booking });
});
localBookingRouter.patch("/:id/cancel", requireLocalUser, (req, res) => {
  const booking = localBookings.find((item) => item._id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
  booking.status = "cancelled";
  res.json({ success: true, message: "Booking cancelled", data: booking });
});
localBookingRouter.patch("/:id/complete", requireLocalUser, requireLocalAdmin, (req, res) => {
  const booking = localBookings.find((item) => item._id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
  booking.status = "completed";
  res.json({ success: true, message: "Booking completed", data: booking });
});
localBookingRouter.delete("/:id", requireLocalUser, requireLocalAdmin, (req, res) => {
  const index = localBookings.findIndex((item) => item._id === req.params.id);
  if (index < 0) return res.status(404).json({ success: false, message: "Booking not found" });
  localBookings.splice(index, 1);
  res.json({ success: true, message: "Booking deleted successfully" });
});

const localReviewRouter = express.Router();
localReviewRouter.get("/:tourId", (req, res) => res.json({ success: true, data: localReviews.filter((item) => item.tourId === req.params.tourId) }));
localReviewRouter.post("/:tourId", requireLocalUser, (req, res) => {
  const review = { _id: `demo-review-${Date.now()}`, tourId: req.params.tourId, username: req.body.username || "Demo User", reviewText: req.body.reviewText || "Great tour!", rating: Number(req.body.rating) || 5, createdAt: new Date().toISOString() };
  localReviews.unshift(review);
  res.status(201).json({ success: true, message: "Review added", data: review });
});

const localTourRouter = express.Router();

localTourRouter.get("/", (req, res) => {
  const page = Number.parseInt(req.query.page, 10) || 0;
  const limit = 8;
  const data = localTours.slice(page * limit, page * limit + limit);
  res.json({ success: true, count: data.length, data });
});

localTourRouter.get("/search", (req, res) => {
  const city = String(req.query.city || "").toLowerCase();
  const data = localTours.filter((tour) => tour.city.toLowerCase().includes(city));
  res.json({ success: true, count: data.length, data });
});

localTourRouter.get("/featured", (req, res) => {
  const data = localTours.filter((tour) => tour.featured).slice(0, 8);
  res.json({ success: true, count: data.length, data });
});

localTourRouter.get("/count", (req, res) => {
  res.json({ success: true, data: localTours.length });
});

localTourRouter.post("/", requireLocalUser, requireLocalAdmin, (req, res) => {
  const tour = { _id: `local-tour-${Date.now()}`, reviews: [], featured: false, ...req.body };
  localTours.unshift(tour);
  res.status(201).json({ success: true, message: "Demo tour created", data: tour });
});

localTourRouter.put("/:id", requireLocalUser, requireLocalAdmin, (req, res) => {
  const tour = localTours.find((item) => item._id === req.params.id);
  if (!tour) return res.status(404).json({ success: false, message: "tour not found" });
  Object.assign(tour, req.body);
  res.json({ success: true, message: "Demo tour updated", data: tour });
});

localTourRouter.delete("/:id", requireLocalUser, requireLocalAdmin, (req, res) => {
  const index = localTours.findIndex((item) => item._id === req.params.id);
  if (index < 0) return res.status(404).json({ success: false, message: "tour not found" });
  localTours.splice(index, 1);
  res.json({ success: true, message: "Demo tour deleted" });
});

localTourRouter.get("/:id", (req, res) => {
  const tour = localTours.find((item) => item._id === req.params.id);
  if (!tour) return res.status(404).json({ success: false, message: "tour not found" });
  res.json({ success: true, message: "tour fetched successfully", data: tour });
});

// Middleware Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.43.113:5173",
  process.env.FRONTEND_URL,       // set this in your .env when deploying
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

// Parse incoming requests
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", mode: "local-demo", environment: isProduction ? "production" : "development" });
});

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", localAuthRouter);
app.use("/api/user", localUserRouter);
// MongoDB-backed tour routes are disabled in local dummy-data mode.
// app.use("/api/tour", tourRoutes);
app.use("/api/tour", localTourRouter);
app.use("/api/review", localReviewRouter);
app.use("/api/reviews", localReviewRouter);
app.use("/api/booking", localBookingRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Trips & Travels API!");
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start the Server
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

export default app;
