import { Router } from "express";
import { connect } from "../config/dbConfig.js";
import Feedback from "../models/Feedback.js";
import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const userLoginRouter = Router();

// connect with mongodb
connect();

userLoginRouter.post("/", async function (req, res) {
  const { role, email, password } = req.body;

  // console.log(email);
  console.log(req.body);

  try {
    const user = await User.findOne({ email, role });
    // const x = await bcryptjs.compare(password, user.password);
    // console.log(x);
    // console.log(process.env.MONGO_URI);

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // generate cookie
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, "secret", {
      expiresIn: "1d",
    });

    // console.log(token);

    res.cookie("feedbackCookie", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "logged in successfully", success: true, user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
});

export default userLoginRouter;
