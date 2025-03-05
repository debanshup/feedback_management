import mongoose from "mongoose";

// process.loadEnvFile("../.env")

export async function connect() {
  const uri = process.env.MONGO_URI || "";
  console.log(uri);

  try {
    mongoose.connect(uri, {});
    // console.log(process.env.MONGO_URI);
    // console.log("config");

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
