import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middlewares/auth.js";

const router = express.Router();

//register route
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  //check all fields
  if (!email || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });

  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //check email
  if (!emailRegEx.test(email))
    return res
      .status(400)
      .json({ error: `Please enter a valid email address.` });

  //check password
  if (password.length <= 6)
    return res
      .status(400)
      .json({ error: `Password must be more than 7 caharacters ` });
  try {
    const alreadyExist = await User.findOne({ email });

    if (alreadyExist)
      return res.status(400).json({
        error: `email [${email}] already exists in the system.`,
      });
    const encryptedPass = await bcrypt.hash(password, 12);
    const newUser = User({ email, password: encryptedPass });

    //save user
    const result = await newUser.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

// route for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });

  //check email
  /**
   * Regular expression for validating email addresses.
   *
   * @type {RegExp}
   * @memberof module:routes/auth
   */
  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //check email
  if (!emailRegEx.test(email))
    return res
      .status(400)
      .json({ error: `Please enter a valid email address.` });
  try {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist)
      return res.status(400).json({ error: "Invalid email or password." });

    //if email exists match password
    const isPsswordMatch = await bcrypt.compare(password, isUserExist.password);

    if (!isPsswordMatch)
      return res.status(400).json({ error: "Invalid email or password." });

    //generate token:
    const payload = { _id: isUserExist._id }; //id of the user as payload

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    const user = { ...isUserExist._doc, password: undefined };
    return res.status(200).json({ jwtToken, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

//route for check login status
router.get("/me", auth, async (req, res) => {
  try {
    // console.log(res);
    return res.status(200).json({ ...req.user._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
