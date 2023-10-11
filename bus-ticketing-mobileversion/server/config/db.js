const mongoose = require("mongoose");
// const dotenv = require("dotenv");

const connectDB = async () => {
  return mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`connetion to database established...`))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
