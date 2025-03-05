import express from "express";
const feedbackRouter = express.Router();
import { connect } from "../config/dbConfig.js";
import Feedback from "../models/Feedback.js";
import User from "../models/User.js";
import { getDataFromToken } from "../helper/dataFetcher.js";

// Connect with MongoDB
connect();

feedbackRouter.post("/", async function (req, res, next) {
  const { serviceCategory, priorityLevel, experience, message } = req.body;

  try {
    // Check if the user is authenticated
    const token = await getDataFromToken(req, "user");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found", success: false });
    }

    const user = await User.findOne({ email: token.email });
    if (!user) {
      return res.status(404).json({ message: "No user found", success: false });
    }

    // Create the feedback entry
    const feedback = await Feedback.create({
      userId: user._id,
      name: user.name,
      email: user.email,
      serviceCategory,
      priorityLevel,
      experience,
      message,
    });

    return res.status(201).json({  // 201 - Created
      message: "Feedback submitted successfully",
      feedback: feedback,
      success: true,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid data", error: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default feedbackRouter;
