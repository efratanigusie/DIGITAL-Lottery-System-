import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
export const CHAPA_BASE_URL = process.env.CHAPA_BASE_URL;