import axios from "axios";
import crypto from "crypto";

export const processBankPayment = async ({ phone, amount, email }) => {
  try {
    // 1️⃣ Validate environment variables
    if (!process.env.CHAPA_SECRET_KEY) {
      throw new Error("CHAPA_SECRET_KEY is not defined");
    }

    if (!process.env.CHAPA_BASE_URL) {
      throw new Error("CHAPA_BASE_URL is not defined");
    }

    // 2️⃣ Validate input
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      throw new Error("Invalid payment amount");
    }

    if (!phone) {
      throw new Error("Phone number is required");
    }

    // 3️⃣ Generate secure tx_ref
    const tx_ref =
      "DLS-" +
      Date.now() +
      "-" +
      crypto.randomBytes(4).toString("hex");

    // 4️⃣ Prepare payload
    const payload = {
      amount: Number(amount),
      currency: "ETB",
      email: email || "user@example.com",
      first_name: "Lottery",
      last_name: "User",
      phone_number: phone,
      tx_ref,
      callback_url: `${process.env.BASE_URL}/api/payment/webhook`,
      return_url: `${process.env.FRONTEND_URL}/success`,
      meta: {
        platform: "mobile-app",
        phone
      }
    };

    // 5️⃣ Make API request
    const response = await axios.post(
      `${process.env.CHAPA_BASE_URL}/transaction/initialize`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 15000
      }
    );

    // 6️⃣ Validate response
    if (!response.data?.data?.checkout_url) {
      throw new Error("Invalid response from Chapa");
    }

    return {
      success: true,
      tx_ref,
      checkout_url: response.data.data.checkout_url
    };

  } catch (error) {
    console.error("Chapa Error:", error.response?.data || error.message);

    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};