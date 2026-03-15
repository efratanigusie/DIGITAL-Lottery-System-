const Ticket = require("../models/Ticket");

exports.buyTicket = async (req, res) => {
  try {
    const { phoneNumber, paymentMethod } = req.body;

    const ticket = await Ticket.create({
      phoneNumber,
      paymentMethod,
      status: "PENDING"
    });

    res.json({
      message: "Ticket purchase started",
      ticketId: ticket._id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};