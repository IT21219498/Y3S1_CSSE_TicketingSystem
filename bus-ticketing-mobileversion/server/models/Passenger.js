import mongoose from "mongoose";

/**
 * Mongoose schema for Passenger model
 * @typedef {Object} PassengerSchema
 * @property {string} name - Passenger's name
 * @property {string} email - Passenger's email
 * @property {string} nic - Passenger's NIC number
 * @property {string} contactNo - Passenger's contact number
 * @property {string} address - Passenger's address
 * @property {number} accBalance - Passenger's account balance
 * @property {Array.<mongoose.Schema.Types.ObjectId>} transactions - Passenger's transaction history
 * @property {string} passengerType - Passenger's type (e.g. regular, student, senior citizen)
 * @property {mongoose.Schema.Types.ObjectId} userId - ID of the User associated with the Passenger
 * @property {boolean} inJourney - Indicates whether the Passenger is currently on a journey
 * @property {Array.<mongoose.Schema.Types.ObjectId>} journies - List of Journeys associated with the Passenger
 * @property {Date} createdAt - Timestamp of when the Passenger was created
 * @property {Date} updatedAt - Timestamp of when the Passenger was last updated
 */
const PassengerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 50,
    },
    email: {
      type: String,
      max: 50,
    },
    nic: {
      type: String,
      max: 20,
    },
    contactNo: {
      type: String,
      max: 10,
    },
    address: {
      type: String,
      max: 100,
    },
    accBalance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    passengerType: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    inJourney: {
      type: Boolean,
      default: false,
    },
    journies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journey",
      },
    ],
  },
  { timestamps: true }
);

//Creating a model
const Passenger = new mongoose.model("Passenger", PassengerSchema);

export default Passenger;
