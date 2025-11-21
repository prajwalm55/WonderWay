// backend/controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import path from "path";

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// get single user with full image url
const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "user not found" });

    const userData = user.toObject();

    if (userData.photo && !userData.photo.startsWith("http")) {
      userData.photo = `${req.protocol}://${req.get("host")}/${userData.photo}`;
    }

    res.status(200).json({ data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// update user (supports image upload)
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;

    // update image path
    if (req.file) {
      updateData.photo = `uploads/${path.basename(req.file.path)}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "user not found" });

    const updatedData = updatedUser.toObject();

    if (updatedData.photo && !updatedData.photo.startsWith("http")) {
      updatedData.photo = `${req.protocol}://${req.get("host")}/${updatedData.photo}`;
    }

    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("update user error:", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser)
      return res.status(404).json({ message: "user not found" });

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export { getAllUsers, getSingleUser, updateUser, deleteUser };
