import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";

dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const app = express();
const PORT = Number(process.env.PORT) || 8001;
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ status: "auth service is working" });
});

app.use("/", router);

connectDB();

app.listen(PORT, () => {
  console.log(`Auth server is running on port http://localhost:${PORT}`);
});
