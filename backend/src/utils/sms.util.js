const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendOtpSMS = async (phone, code) => {
  try {
    const message = await client.messages.create({
      body: `Your DLS OTP code is: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    console.log("SMS Sent:", message.sid);
    return true;

  } catch (error) {
    console.error("SMS Error:", error.message);
    throw new Error("Failed to send OTP");
  }
};