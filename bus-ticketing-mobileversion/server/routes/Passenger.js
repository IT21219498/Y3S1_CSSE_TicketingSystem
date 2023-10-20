import express from "express";
import Passenger from "../models/Passenger.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Journey from "../models/Journey.js";
import authenticateToken from "../middlewares/auth.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/createPassenger", authenticateToken, async (req, res) => {
  const { email, name, nic, contactNo, address, accBalance, type } = req.body;

  const alreadyExistEmail = await Passenger.findOne({ email });
  if (alreadyExistEmail) {
    return res.status(400).json({ error: "Email already exist" });
  }
  const alreadyExistNic = await Passenger.findOne({ nic });
  if (alreadyExistNic) {
    return res.status(400).json({ error: "NIC already exist" });
  }
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!nic) {
    return res.status(400).json({ error: "NIC is required" });
  }
  if (!contactNo) {
    return res.status(400).json({ error: "Contact number is required" });
  }
  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }
  if (!accBalance) {
    return res.status(400).json({ error: "Account balance is required" });
  }

  let savedTransaction = await Transaction.create({
    amount: accBalance,
    type: type,
  });

  try {
    const newPassenger = new Passenger({
      email: email,
      name: name,
      nic: nic,
      contactNo: contactNo,
      address: address,
      accBalance: accBalance,
      transactions: [savedTransaction._id],
    });

    const result = await newPassenger.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

//route for create permanant passenger
router.post("/createPermanantPassenger", async (req, res) => {
  const { email, name, nic, contactNo, address, password, accBalance, type } =
    req.body;

  const alreadyExistEmail = await Passenger.findOne({ email });
  if (alreadyExistEmail) {
    return res.status(400).json({ error: "Email already exist" });
  }
  const alreadyExistNic = await Passenger.findOne({ nic });
  if (alreadyExistNic) {
    return res.status(400).json({ error: "NIC already exist" });
  }
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!nic) {
    return res.status(400).json({ error: "NIC is required" });
  }
  if (!contactNo) {
    return res.status(400).json({ error: "Contact number is required" });
  }
  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }
  if (!accBalance) {
    return res.status(400).json({ error: "Account balance is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  let savedTransaction = await Transaction.create({
    amount: accBalance,
    type: type,
  });

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

  const encryptedPass = await bcrypt.hash(password, 12);

  let newUser = await User.create({
    email: email,
    password: encryptedPass,
    role: "Passenger",
  });

  try {
    /**
     * Creates a new Passenger object with the given parameters.
     *
     * @param {string} email - The email of the passenger.
     * @param {string} name - The name of the passenger.
     * @param {string} nic - The NIC of the passenger.
     * @param {string} contactNo - The contact number of the passenger.
     * @param {string} address - The address of the passenger.
     * @param {number} accBalance - The account balance of the passenger.
     * @param {string[]} transactions - The list of transaction IDs associated with the passenger.
     * @param {string[]} userId - The list of user IDs associated with the passenger.
     * @param {string} passengerType - The type of the passenger (e.g. "Permanent").
     * @returns {Passenger} A new Passenger object with the given parameters.
     */
    const newPassenger = new Passenger({
      email: email,
      name: name,
      nic: nic,
      contactNo: contactNo,
      address: address,
      accBalance: accBalance,
      transactions: [savedTransaction._id],
      userId: [newUser._id],
      passengerType: "Permanant",
    });

    const result = await newPassenger.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

// router.get(
//   "/getPassengers",
//   //  authenticateToken,
//   async (req, res) => {
//     try {
//       const result = await Passenger.find().limit(10);
//       return res.status(200).json({ result });
//     } catch (err) {
//       return res.status(400).json({ error: "Unknown Error Occured" });
//     }
//   }
// );

router.get(
  "/getPassengers/:pageSize/:pageNumber",
  authenticateToken,
  async (req, res) => {
    const { pageSize, pageNumber } = req.params;
    try {
      const result = await Passenger.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ error: "Unknown Error Occured" });
    }
  }
);

router.post("/createPassengers", authenticateToken, async (req, res) => {
  const { passengers } = req.body;
  try {
    const result = await Passenger.insertMany(passengers);
    return res.status(201).json({ result });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.get(
  "/getPassenger/:id",
  //  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const result = await Passenger.find({ nic: id }).limit(1);
      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ error: "Unknown Error Occured" });
    }
  }
);

router.delete("/deletePassenger/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Passenger.deleteOne({ _id: id });
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.put("/updatePassenger/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  if (req.body.nic === "" || req.body.nic === undefined)
    return res.status(400).json({ error: "nic not recieved" });
  if (req.body.name === "" || req.body.nic === undefined)
    return res.status(400).json({ error: "name not recieved" });
  if (req.body.email === "" || req.body.nic === undefined)
    return res
      .status(400 || req.body.nic === undefined)
      .json({ error: "email not recieved" });
  if (req.body.contactNo === "" || req.body.nic === undefined)
    return res.status(400).json({ error: "contactNo not recieved" });
  if (req.body.address === "" || req.body.nic === undefined)
    return res.status(400).json({ error: "address not recieved" });

  try {
    let user = await Passenger.findOne({ _id: id });
    if (!user) return res.status(400).json({ error: "user not found" });

    user = { ...user._doc, ...req.body };

    const result = await Passenger.updateOne({ _id: id }, user);
    console.log(result);
    if (result.nModified === 0) {
      return res.status(400).json({ error: "Failed to update" });
    }

    return res.status(200).json({ result: user });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.put(
  "/addTransaction/:id",
  //  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    const { accBalance, type } = req.body;
    if (!id) return res.status(400).json({ error: "no id specified." });

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "please enter a valid id" });

    if (accBalance === "" || accBalance === undefined)
      return res.status(400).json({ error: "amount not recieved" });

    if (type === "" || type === undefined)
      return res.status(400).json({ error: "type not recieved" });

    try {
      let passenger = await Passenger.findOne({ userId: id });

      if (!passenger)
        return res.status(400).json({ error: "Passenger not found" });

      let transaction = await Transaction.create({
        amount: accBalance,
        type: type,
      });
      let savedTransaction = await transaction.save();

      passenger.transactions.push(savedTransaction._id);
      passenger.accBalance = Number(passenger.accBalance) + Number(accBalance);

      const result = await Passenger.updateOne({ userId: id }, passenger);
      if (result.nModified === 0) {
        return res.status(400).json({ error: "Failed to update" });
      }

      return res.status(200).json({
        result: {
          _id: passenger._id,
          accBalance: passenger.accBalance,
          transactions: passenger.transactions,
        },
      });
    } catch (err) {
      return res.status(400).json({ error: "Unknown Error Occured" });
    }
  }
);

//route for start or end journey
router.put("/startOrEndJourney/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  try {
    let passenger = await Passenger.findOne({ userId: id });

    if (!passenger)
      return res.status(400).json({ error: "Passenger not found" });

    console.log(passenger.inJourney);

    if (passenger.inJourney === false) {
      if (passenger.accBalance < 400) {
        return res
          .status(400)
          .json({ error: "Passenger does not have enough balance" });
      }

      /**
       * Creates a new journey with the given start time, start location and bus driver.
       * @param {Object} req - The request object.
       * @param {Object} req.user - The user object.
       * @param {string} req.user._id - The ID of the bus driver.
       * @returns {Promise<Object>} - A promise that resolves to the created journey object.
       */
      let journey = await Journey.create({
        startTime: Date.now(),
        startLocation: "Kandy",
        busDriver: req.user._id,
      });
      let savedJourney = await journey.save();

      passenger.journies.push(savedJourney._id);
      passenger.inJourney = true;

      const result = await Passenger.updateOne(
        { userId: id },
        { $set: { inJourney: true, journies: passenger.journies } }
      );
      if (result.nModified === 0) {
        return res.status(400).json({ error: "Failed to update" });
      }

      return res.status(200).json({
        result: {
          _id: passenger._id,
          name: passenger.name,
          nic: passenger.nic,
          journeyId: savedJourney._id,
          accBalance: passenger.accBalance,
          inJourney: passenger.inJourney,
        },
      });
    } else if (passenger.inJourney === true) {
      console.log(
        "🚀 ~ file: Passenger.js:352 ~ router.put ~ passenger:",
        passenger
      );

      let journeyId = passenger.journies[passenger.journies.length - 1];
      console.log(
        "🚀 ~ file: Passenger.js:350 ~ router.put ~ journeyId:",
        journeyId
      );

      let journey = await Journey.findOne({ _id: journeyId });

      if (!journey) return res.status(400).json({ error: "Journey not found" });

      journey.endTime = Date.now();
      journey.endLocation = "Colombo";
      journey.fare = 100;

      let savedJourney = await journey.save();

      passenger.inJourney = false;
      passenger.accBalance = passenger.accBalance - journey.fare;
      // passenger.journies = [];
      // passenger.transactions.push(savedJourney._id);

      const result = await Passenger.updateOne({ userId: id }, passenger);
      if (result.nModified === 0) {
        return res.status(400).json({ error: "Failed to update" });
      }

      return res.status(200).json({
        result: {
          _id: passenger._id,
          accBalance: passenger.accBalance,
          inJourney: passenger.inJourney,
          name: passenger.name,
          nic: passenger.nic,
        },
      });
    }
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

//route for get specific passenger details
router.get("/getPassengerDetails/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Passenger.findOne({ userId: id });
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

export default router;
