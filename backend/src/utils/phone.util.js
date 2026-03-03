import axios from "axios";

export const processBankPayment = async ({ phone, amount }) => {
  try {

    const response = await axios.post(
      `${process.env.CHAPA_BASE_URL}/transaction/initialize`,
      {
        amount: amount,
        currency: "ETB",
        email: "user@example.com",
        first_name: "Lottery",
        last_name: "User",
        tx_ref: "DLS-" + Date.now(),
        callback_url: "https://yourdomain.com/api/payment/webhook",
        return_url: "https://yourapp.com/success"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
        }
      }
    );

    return {
      success: true,
      checkout_url: response.data.data.checkout_url
    };

  } catch (error) {
    console.error("Chapa Error:", error.response?.data);
    return { success: false };
  }
};