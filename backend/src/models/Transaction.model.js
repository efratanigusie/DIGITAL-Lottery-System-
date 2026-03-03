import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userPhone: String,
  lotteryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lottery"
  },
  amount: Number,
  bank: String,
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING"
  }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;