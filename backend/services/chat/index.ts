import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/chat.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8002;

app.use(express.json());
app.use("/", router);

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Chat service is running" });
});

connectDB();

app.listen(PORT, () => {
    console.log(`Chat service is running on http://localhost:${PORT}`);
});
