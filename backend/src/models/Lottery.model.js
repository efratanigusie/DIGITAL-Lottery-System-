const mongoose = require("mongoose");

const lotterySchema = new mongoose.Schema({
  title: String,
  price: Number,
  prizeAmount: Number,
  drawDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Lottery", lotterySchema);