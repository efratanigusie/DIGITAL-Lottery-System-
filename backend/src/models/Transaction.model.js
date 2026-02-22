const mongoose = require("mongoose");

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

module.exports = mongoose.model("Transaction", transactionSchema);