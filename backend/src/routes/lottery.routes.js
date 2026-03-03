const Otp = require("../models/otp.model");
const Transaction = require("../models/Transaction.model");
const bcrypt = require("bcryptjs");
const { initializeChapaPayment } = require("../utils/chapa.util");

exports.verifyOtp = async (req, res) => {
  try {
    const { transactionId, otp } = req.body;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    const storedOtp = await Otp.findOne({ phone: transaction.phone });

    if (!storedOtp || storedOtp.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    const isMatch = await bcrypt.compare(otp, storedOtp.code);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid OTP" });

    transaction.status = "OTP_VERIFIED";
    await transaction.save();

    const checkout_url = await initializeChapaPayment(
      transaction.amount,
      transaction.tx_ref
    );

    transaction.chapa_url = checkout_url;
    await transaction.save();

    res.json({ checkout_url });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};