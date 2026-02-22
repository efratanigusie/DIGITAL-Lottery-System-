import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const lotteryRoutes = require("./routes/lottery.routes");
const paymentRoutes = require("./routes/payment.routes");
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
const lotteryRoutes = require("./routes/lottery.routes");
const paymentRoutes = require("./routes/payment.routes");

export default app;   // 👈 VERY IMPORTANT
