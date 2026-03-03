const axios = require("axios");

export const initializeChapaPayment = async (amount, tx_ref) => {
  const response = await axios.post(
    `${process.env.CHAPA_BASE_URL}/transaction/initialize`,
    {
      amount,
      currency: "ETB",
      email: "user@dls.com",
      first_name: "Lottery",
      last_name: "User",
      tx_ref,
      callback_url: "http://localhost:5000/api/payment/webhook",
      return_url: "http://localhost:3000/success"
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
      }
    }
  );

  return response.data.data.checkout_url;
};