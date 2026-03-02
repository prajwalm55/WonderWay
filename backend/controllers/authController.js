import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";

// USER REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, email, password, photo } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash password before saving
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      photo,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// USER LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check entered password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Remove password before sending data
    const { password: _, ...rest } = user._doc;
    const userData = { ...rest };

    // Add full photo URL only if needed
    if (userData.photo && !userData.photo.startsWith("http")) {
      userData.photo = `${req.protocol}://${req.get("host")}/${userData.photo}`;
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE_TIME || "7d" }
    );

    // Save token in cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      expires: token.expiresIn,
    });

    res.status(200).json({
      message: "Login successful",
      data: userData,
      token,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerUser, loginUser };
