const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const URL = process.env.DB_URL || "mongodb://localhost:27017/chat";
    const conn = await mongoose.connect(URL);
    console.log(`Connect with MongoDB: ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error: ${e.message}`);
    process.exit();
  }
};

module.exports = connectDB;
