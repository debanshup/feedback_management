import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index.js";
import feedbackRouter from "./routes/feedback.js";
import userLoginRouter from "./routes/login-user.js";
import adminLoginRouter from "./routes/login-admin.js";
import signupRouter from "./routes/signup.js";
import findUserRouter from "./routes/find-user.js";
import getFeedbackRouter from "./routes/get-feedbacks.js";
import exportFeedbackRouter from "./routes/exportFeedback.js";
import exportAnalyticsRouter from "./routes/exportAnalytics.js";
import isLoggedInRouter from "./routes/isLoggedIn.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(json());
app.use(logger("dev"));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login-user", userLoginRouter);
app.use("/login-admin", adminLoginRouter);
app.use("/submit-feedback", feedbackRouter);
app.use("/find-user", findUserRouter);
app.use("/check-pulse", isLoggedInRouter);

app.use("/get-feedback", getFeedbackRouter);
app.use("/export-feedback", exportFeedbackRouter);
app.use("/export-analytics", exportAnalyticsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = "3001";

try {
  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
} catch (error) {
  console.error(error.message);
}

export default app;
