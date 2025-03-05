import { Router } from "express";
import { getDataFromToken } from "../helper/dataFetcher.js";

const isLoggedInRouter = Router();

isLoggedInRouter.post("/", async function (req, res) {

  try {
    const userCookie = req.cookies.feedbackCookie;
    const adminCookie = req.cookies.yesYouAreAdmin;

    // console.log(!userCookie);

    if (adminCookie) {
      console.log("admin");

      const adminToken = await getDataFromToken(req, "admin");
      return res
        .status(200)
        .json({ message: "Logged in as admin", success: true, role: "admin" });
    } else if (userCookie) {
      console.log("user");
      const userToken = await getDataFromToken(req, "user");
      return res
        .status(200)
        .json({ message: "Logged in as user", success: true, role: "user" });
    }
    return res
      .status(404)
      .json({ message: "Not logged in!", success: false, role: null });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default isLoggedInRouter;
