// config/db.js
const mongoose = require("mongoose");
require("dotenv").config(); // Ensure dotenv is loaded

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_DB;
    if (!dbURI) {
      throw new Error("MONGO_DB is not defined in the .env file");
    }
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
