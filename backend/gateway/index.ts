import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParse from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import getCurrentUser from "./controllers/user.controller.js";
dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const PORT = Number(process.env.PORT) || 8000;
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParse());
app.use("/api/auth", proxy(process.env.AUTH_SERVICE || "http://localhost:8001"));

app.get("/api/me", protect, getCurrentUser)
app.get("/", (_req, res) => {
  res.status(200).json("Gateway server is running");
});

app.listen(PORT, () => {
  console.log(`Gateway server is running on port http://localhost:${PORT}`);
});
