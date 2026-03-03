import express from "express";
import {
  initializePayment,
  chapaWebhook
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/initialize", initializePayment);
router.post("/webhook", chapaWebhook);

export default router;