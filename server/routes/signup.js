import express from "express";
const signupRouter = express.Router();
import { connect } from "../config/dbConfig.js";
import User from "../models/User.js";

// Connect to MongoDB
connect();

signupRouter.post("/", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // Check for missing fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check for password mismatch
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match!",
        success: false,
      });
    }

    // Validate password length
    const passwordValidator = /^.{4,}$/;
    if (!passwordValidator.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 4 characters long",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists!",
        success: false,
      });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: { id: user._id, name: user.name, email: user.email },  
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

export default signupRouter;
