const OTP = require("../models/OTP");
const generateOTP = require("../utils/generateOTP");

exports.sendOTP = async (req, res) => {
  try {

    const { phoneNumber } = req.body;

    const otp = generateOTP();

    await OTP.create({
      phoneNumber,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    // integrate SMS API here
    console.log(`OTP sent to ${phoneNumber}: ${otp}`);

    res.json({
      message: "OTP sent successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};