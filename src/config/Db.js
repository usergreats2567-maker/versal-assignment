import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGO_URI = process.env.MONGO_URI;
async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("DB connected successfully " + conn.connection.host);
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
}

export default connectDB;
