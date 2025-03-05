import express from "express";
const getFeedbackRouter = express.Router();
import { connect } from "../config/dbConfig.js";
import { getDataFromToken } from "../helper/dataFetcher.js";
import Admin from "../models/Admin.js";
import Feedback from "../models/Feedback.js";
import getDateRangeForQuery from "../helper/dateParser.js";

import {
  aggregateFeedbacksByDay,
  aggregateFeedbacksByMonth,
  aggregateFeedbacksByWeek,
  aggregateFeedbacksByYear,
} from "../helper/handleAggregations.js";

connect();

getFeedbackRouter.get("/", async (req, res) => {
  const { time, serviceCategory, experience, priorityLevel } = req.query;
  try {
    const token = await getDataFromToken(req, "admin");
    // console.log(token);

    if (!token) {
      return res
        .status(404)
        .json({ message: "You must log in", success: false });
    }

    const query = {};
    if (time) {
      query.createdAt = getDateRangeForQuery(time);
    }
    if (serviceCategory) {
      query.serviceCategory = serviceCategory;
    }
    if (experience) {
      query.experience = experience;
    }
    if (priorityLevel) {
      query.priorityLevel = priorityLevel;
    }

    // console.log(query);

    const feedbacks = await Feedback.find(query);

    let result;

    if (time === "7days") {
      result = aggregateFeedbacksByDay(feedbacks);
    } else if (time === "4weeks") {
      result = aggregateFeedbacksByWeek(feedbacks);
    } else if (time === "12months") {
      result = aggregateFeedbacksByMonth(feedbacks);
    } else if (time === "60months") {
      result = aggregateFeedbacksByYear(feedbacks);
    }

    return res.status(200).json({
      success: true,
      graph: result,
      record: feedbacks,
      count: feedbacks.length,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ success: false, message: error.message });
  }
});

export default getFeedbackRouter;
