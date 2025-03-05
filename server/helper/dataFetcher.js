import jwt from "jsonwebtoken";

export async function getDataFromToken(req, role) {
  try {
    if (role === "user") {
      const token = req.cookies.feedbackCookie;
      const decodedToken = jwt.verify(
        token,
        process.env.TOKEN_SECRET_USER || "secret"
      );
      return decodedToken;
    } else if (role === "admin") {
      {
        const token = req.cookies.yesYouAreAdmin;
        const decodedToken = jwt.verify(
          token,
          process.env.TOKEN_SECRET_ADMIN || "verrysecret"
        );
        return decodedToken;
      }
    }

    return {};
  } catch (error) {
    console.error(error.message)
  }
}
