const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/kaufholic");
    console.log("db connected");
  } catch (error) {
    console.log("error on connecting to database");
  }
};

module.exports = connectDb;
