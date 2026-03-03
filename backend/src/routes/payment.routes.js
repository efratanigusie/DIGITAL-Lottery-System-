const express = require("express");
const router = express.Router();
const {
  initializePayment,
  chapaWebhook
} = require("../controllers/payment.controller");

router.post("/initialize", initializePayment);
router.post("/webhook", chapaWebhook);

module.exports = router;