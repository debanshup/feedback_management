import jwt from "jsonwebtoken";
// import { response } from "express";

export async function generateCookie({ payload, res }) {
  try {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

console.log(res);


    res.cookie("feedbackCookie", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res;
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
}
