// routes/userRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Normalize Windows paths (avoid backslash issues)
const normalizePath = (p) => p.replace(/\\/g, "/");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ensure uploads folder path is normalized and available on req for later use (optional)
    const uploadDir = normalizePath("uploads/");
    req.uploadDir = uploadDir;
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const safeName = `photo-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, safeName);
  },
});

const upload = multer({ storage });

// Routes
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/users/:id", verifyToken, verifyUser, getSingleUser);

// Note: upload.single("photo") will attach req.file when a file is sent
router.put(
  "/users/:id",
  verifyToken,
  verifyUser,
  upload.single("photo"),
  updateUser
);

router.delete("/users/:id", verifyToken, verifyUser, deleteUser);

export default router;
