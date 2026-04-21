import mongoose from "mongoose";
import { config } from "./config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("DB connected successfully ✅");
  } catch (error) {
    console.error("DB connection error ❌", error.message);
    process.exit(1);
  }
};

export default connectToDB;