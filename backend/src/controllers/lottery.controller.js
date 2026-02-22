const Transaction = require("../models/Transaction.model");
const Otp = require("../models/otp.model");
const { sendOtpSMS } = require("../utils/sms.util");

exports.createLotteryOrder = async (req, res) => {
  try {
    const { phone, lotteryId, bank } = req.body;

    const transaction = await Transaction.create({
      userPhone: phone,
      lotteryId,
      amount: 5, // example ticket price
      bank
    });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({
      phone,
      code: otpCode,
      expiresAt: new Date(Date.now() + 5 * 60000)
    });

    await sendOtpSMS(phone, otpCode);

    res.json({
      message: "OTP sent",
      transactionId: transaction._id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};