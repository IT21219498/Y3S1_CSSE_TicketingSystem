const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();
const auth = require("./middlewares/auth");

const app = express();

//middlewares
app.use(express.json()); //send responses in JSON format
app.use(morgan("tiny")); //logging http requests
app.use(require("cors")()); //

//routes
app.get("/protected", auth, (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});
app.use("/api", require("./routes/auth"));

//server configurations.
const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`server listening on ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
