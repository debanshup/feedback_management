import express, { Router } from "express";
import { getDataFromToken } from "../helper/dataFetcher.js";
import { connect } from "../config/dbConfig.js";
import fs from "fs";
import Feedback from "../models/Feedback.js";
import { exportAsEXCEL, exportAsPDF } from "../helper/exportFeedback.js";
const exportFeedbackRouter = Router();
connect();

exportFeedbackRouter.get("/", async function (req, res, next) {
  const { id, type } = req.query;

  // console.log(id);

  try {
    const token = await getDataFromToken(req, "admin");

    if (!token) {
      return res
        .status(401)
        .json({ message: "You must log in", success: false });
    }

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res
        .status(404)
        .json({ message: "No feedback found", success: false });
    }
    if (type === "EXCEL") {
      exportAsEXCEL({ feedback, res });
    } else if (type === "PDF") {
      exportAsPDF({ feedback, res });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default exportFeedbackRouter;
