import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/agent.route.js";

const app = express();
const PORT = process.env.PORT || 8002;

app.use(express.json());


connectDB();

app.use("/api", router)
app.get("/", (_req, res) => {
    res.status(200).json({ message: "Agent service is running" });
});

app.listen(PORT, () => {
    console.log(`Agent service is running on http://localhost:${PORT}`);
});
