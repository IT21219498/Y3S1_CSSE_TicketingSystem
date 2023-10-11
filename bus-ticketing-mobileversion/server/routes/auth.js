const router = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Passenger = require("../models/Passenger");
const auth = require("../middlewares/auth");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: `Please enter both email and password` });

  //email validation
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: `Please enter a valid email address` });
  try {
    const doesPassengerExist = await Passenger.findOne({ email });

    if (!doesPassengerExist)
      return res.status(400).json({ error: `Invalid email or password!` });

    //if there were any user present

    const doesPasswordExist = await bcrypt.compare(
      password,
      doesPassengerExist.password
    );

    if (!doesPasswordExist)
      return res.status(400).json({ error: `Invalid email or password!` });

    const payload = { _id: doesPassengerExist._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const passenger = { ...doesPassengerExist._doc, password: undefined };

    return res.status(200).json({ token, passenger });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, nic, address, contact, password } = req.body;

  //<check all the missing fields>
  //status 400 is for Bad User Input
  if (!name || !email || !password || !contact || !address || !nic)
    return res
      .status(400)
      .json({ error: `Please enter all the required fields` });

  //name validation
  if (name.length > 25)
    return res
      .status(400)
      .json({ error: `Username can only be a maximum of 25 characters` });
  //email validation
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: `Please enter a valid email address` });

  //password validation
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: `Password must be have atleast 6 characters` });
  try {
    const doesPassengerAlreadyExist = await Passenger.findOne({ email });

    if (doesPassengerAlreadyExist)
      return res
        .status(400)
        .json({ error: `User with that email [${email}] already exist` });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newPassenger = new Passenger({
      name,
      email,
      nic,
      address,
      contact,
      password: hashedPassword,
    });

    //saved the user
    const result = await newPassenger.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    // console.log(...req.passenger._doc);
    return res.status(200).json({ ...req.passenger._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
