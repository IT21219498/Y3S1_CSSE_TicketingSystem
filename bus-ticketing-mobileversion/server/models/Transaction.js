import mongoose from "mongoose";

/**
 * Mongoose schema for Transaction model
 * @typedef {Object} TransactionSchema
 * @property {string} amount - The amount of the transaction
 * @property {string} type - The type of the transaction
 * @property {Date} createdAt - The timestamp when the transaction was created
 * @property {Date} updatedAt - The timestamp when the transaction was last updated
 */
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      max: 50,
      required: [true, "name is required"],
    },
    type: {
      type: String,
      max: 50,
      required: [true, "type is required"],
    },
  },
  { timestamps: true }
);

//Creating a model
const Transaction = new mongoose.model("Transaction", transactionSchema);

export default Transaction;
