import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the provided URL.
 * @async
 * @function connectDB
 * @throws {Error} If there is an error connecting to the database.
 * @returns {Promise<void>} A Promise that resolves when the connection is established.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connection to database established...`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
