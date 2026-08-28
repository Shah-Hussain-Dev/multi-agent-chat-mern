import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8002;

app.use(express.json());

connectDB();
app.get("/", (_req, res) => {
    res.status(200).json({ message: "Agent service is running" });
});

app.listen(PORT, () => {
    console.log(`Agent service is running on http://localhost:${PORT}`);
});
