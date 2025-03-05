import { Router } from "express";
import { connect } from "../config/dbConfig.js";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const adminLoginRouter = Router();

// connect with mongodb
connect();

adminLoginRouter.post("/", async function (req, res) {
  const { role, email, password } = req.body;

  // console.log(email);
  console.log(req.body);

  try {
    const admin = await Admin.findOne({ email, role });
    // const x = await bcryptjs.compare(password, user.password);
    // console.log(x);
    // console.log(process.env.MONGO_URI);

    if (!admin || !(await admin.comparePassword(password))) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // generate cookie
    const payload = { id: admin._id, email: admin.email, role: admin.role };
    const token = jwt.sign(payload, "verrysecret", {
      expiresIn: "1d",
    });

    // console.log(token);

    res.cookie("yesYouAreAdmin", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "logged in successfully", success: true, admin: admin });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: error.message, success: false });
  }
});

export default adminLoginRouter;
