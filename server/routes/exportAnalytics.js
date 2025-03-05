import express, { Router } from "express";
import { getDataFromToken } from "../helper/dataFetcher.js";
import { connect } from "../config/dbConfig.js";
import Feedback from "../models/Feedback.js";
import {
  exportAllAsExcel,
  exportAllAsPdf,
  exportAsEXCEL,
  exportAsPDF,
} from "../helper/exportAnalytics.js";
const exportAnalyticsRouter = Router();
import {
  aggregateFeedbacksByDay,
  aggregateFeedbacksByMonth,
  aggregateFeedbacksByWeek,
  aggregateFeedbacksByYear,
} from "../helper/handleAggregations.js";
import getDateRangeForQuery from "../helper/dateParser.js";
import summarizeFeedback from "../helper/summerizeFeedback.js";

connect();

exportAnalyticsRouter.get("/", async function (req, res, next) {
  const { time, serviceCategory, experience, priorityLevel, scope, type } =
    req.query;

  // console.log(req.query);

  try {
    const token = await getDataFromToken(req, "admin");

    if (!token) {
      return res
        .status(401)
        .json({ message: "You must log in", success: false });
    }
    console.log(scope);

    if (scope === "ALL") {
      const feedback = await Feedback.find();
      const summarizedFeedback = summarizeFeedback(feedback);
      if (type==="EXCEL") {
        return exportAllAsExcel(summarizedFeedback, res);
      } else if (type==="PDF") {
        return exportAllAsPdf(summarizedFeedback, res)
      }
      
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

    const feedback = await Feedback.find(query);

    if (!feedback) {
      return res
        .status(404)
        .json({ message: "No feedback found", success: false });
    }

    let result;

    if (time === "7days") {
      result = aggregateFeedbacksByDay(feedback);
    } else if (time === "4weeks") {
      result = aggregateFeedbacksByWeek(feedback);
    } else if (time === "12months") {
      result = aggregateFeedbacksByMonth(feedback);
    } else if (time === "60months") {
      result = aggregateFeedbacksByYear(feedback);
    }
    // console.log(result);

    const filters = { serviceCategory, experience, priorityLevel, time };

    if (type === "EXCEL") {
      // implement
      return exportAsEXCEL({ data: result, filters, res });
      // console.log("EXcel");
    } else if (type === "PDF") {
      // implement
      return exportAsPDF({ data: result, filters, res });
    }
    return res.status(403).json({ success: false, message:"bad request" });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default exportAnalyticsRouter;
