const paymentService = require("../services/paymentService");

exports.processPayment = async (req, res) => {

  try {

    const { phoneNumber, amount } = req.body;

    const payment = await paymentService.chapaPayment(
      amount,
      phoneNumber
    );

    res.json({
      message: "Payment initialized",
      payment
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};