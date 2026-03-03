import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import lotteryRoutes from "./routes/lottery.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("./api/lottery", lotteryRoutes );
app.use("/api/payment", paymentRoutes);

export default app;   //  VERY IMPORTANT
