const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema({
  name: {
    type: String,
    requird: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  nic: {
    type: String,
    required: [true, "NIC is required"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  contact: {
    type: String,
    required: [true, "Contact number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  joinDate: { type: Date, default: Date.now },
});

//creating a model
const Passenger = new mongoose.model("PermanantPassenger", PassengerSchema);

//In order to use this model in other files, we need to export it.
module.exports = Passenger;
