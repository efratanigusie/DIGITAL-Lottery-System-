import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: String,
  code: String,
  expiresAt: Date
});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;