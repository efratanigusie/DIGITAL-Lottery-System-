const axios = require("axios");
const Transaction = require("../models/Transaction.model");

exports.initializePayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status !== "OTP_VERIFIED") {
      return res.status(400).json({ message: "OTP not verified" });
    }

    const response = await axios.post(
      `${process.env.CHAPA_BASE_URL}/transaction/initialize`,
      {
        amount: transaction.amount,
        currency: "ETB",
        email: "user@dls.com",
        first_name: "Lottery",
        last_name: "User",
        tx_ref: transaction.tx_ref,
        callback_url: "https://yourdomain.com/api/payment/webhook",
        return_url: "https://yourfrontend.com/success"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const checkout_url = response.data.data.checkout_url;

    transaction.chapa_url = checkout_url;
    await transaction.save();

    res.json({ checkout_url });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};