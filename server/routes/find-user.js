import express, { Router } from "express";
import { connect } from "../config/dbConfig.js";
import User from "../models/User.js";
import { getDataFromToken } from "../helper/dataFetcher.js";

const findUserRouter = Router();

connect();

findUserRouter.get("/", async function (req, res) {
  try {
    // Retrieve token from request
    const token = await getDataFromToken(req, "user");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: You must log in", success: false }); // 401 Unauthorized
    }

    // Find user in database
    const user = await User.findOne({ email: token.email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false }); // 404 Not Found
    }

    // Return user details
    return res.status(200).json({
      message: "User found",
      success: true,
      user: { name: user.name, email: user.email },
    }); // 200 OK
  } catch (error) {
    console.error(error.message);

    // Handle server errors
    return res.status(500).json({ success: false, message: "Internal Server Error" }); // 500 Internal Server Error
  }
});

export default findUserRouter;
