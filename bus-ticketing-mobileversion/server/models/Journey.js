import mongoose from "mongoose";

/**
 * @typedef {Object} Journey
 * @property {Date} startTime - The start time of the journey.
 * @property {Date} [endTime] - The end time of the journey.
 * @property {String} startLocation - The starting location of the journey.
 * @property {String} [endLocation] - The ending location of the journey.
 * @property {Number} [fare] - The fare of the journey.
 * @property {mongoose.Schema.Types.ObjectId} busDriver - The ID of the bus driver for the journey.
 * @property {Date} createdAt - The timestamp when the journey was created.
 * @property {Date} updatedAt - The timestamp when the journey was last updated.
 */
const JourneySchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    startLocation: {
      type: String,
      required: true,
    },
    endLocation: {
      type: String,
    },
    fare: {
      type: Number,
    },
    busDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//Creating a model
const Journey = new mongoose.model("Journey", JourneySchema);

export default Journey;
