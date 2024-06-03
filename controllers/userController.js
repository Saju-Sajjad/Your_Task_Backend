import User from "../models/User.js";
const JWT_SECRET = process.env.JWT_SECRET;
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.token;

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
}


export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};


export const getUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).json({ message: "Failed to fetch user, please try again later." });
  }
};