const jwt = require("jsonwebtoken");
const Passenger = require("../models/Passenger");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; //Bearer token["Bearer", "token-hushiajjhja"]

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      try {
        if (err) {
          return res.status(401).json({ error: "Unauthorized!" });
        }
        const passenger = await Passenger.findOne({ _id: payload._id }).select(
          "-password"
        );
        req.passenger = passenger;
        next(); //jump on to routes
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    return res.status(403).json({ error: `Forbidden 🛑🛑` });
  }
};
