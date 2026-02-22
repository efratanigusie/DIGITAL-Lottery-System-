const Otp = require("../models/otp.model");
const Transaction = require("../models/Transaction.model");
const { processBankPayment } = require("../utils/bank.util");

exports.verifyOtpAndPay = async (req, res) => {
  try {
    const { transactionId, otp } = req.body;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const storedOtp = await Otp.findOne({
      phone: transaction.userPhone,
      code: otp
    });

    if (!storedOtp || storedOtp.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const payment = await processBankPayment({
      phone: transaction.userPhone,
      amount: transaction.amount,
      bank: transaction.bank
    });

    if (payment.success) {
      transaction.status = "SUCCESS";
      await transaction.save();

      return res.json({ message: "Payment Successful" });
    } else {
      transaction.status = "FAILED";
      await transaction.save();

      return res.status(400).json({ message: "Payment Failed" });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};