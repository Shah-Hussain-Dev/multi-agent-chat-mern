import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const app = express();
const PORT = Number(process.env.PORT) || 8001;

app.get("/", (_req, res) => {
  res.status(200).json({ status: "auth service is working" });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Auth server is running on port http://localhost:${PORT}`);
});
