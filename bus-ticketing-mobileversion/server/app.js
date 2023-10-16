import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import auth from "./middlewares/auth.js";
import cors from "cors";
import authRouter from "./routes/auth.js";
import passengerRouter from "./routes/Passenger.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json()); //send responses in JSON format
app.use(morgan("tiny")); //logging http requests
app.use(cors()); //

//routes
app.get("/protected", auth, (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});
app.use("/api", authRouter);
app.use("/api", passengerRouter);

//server configurations.
/**
 * The port number on which the server listens for incoming requests.
 * @type {number}
 */
const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`server listening on ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
