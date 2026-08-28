import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParse from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import getCurrentUser from "./controllers/user.controller.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";
dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const PORT = Number(process.env.PORT) || 8000;
const app = express();
const allowedOrigins = process.env.FRONTEND_URL?.split(",") || ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParse());
app.use("/api/auth", proxy(process.env.AUTH_SERVICE!));
app.use("/api/chat", protect, proxyWithHeader(process.env.CHAT_SERVICE!));
app.use("/api/agent", protect, proxy(process.env.AGENT_SERVICE!));

app.get("/api/me", protect, getCurrentUser)
app.get("/", (_req, res) => {
  res.status(200).json("Gateway server is running");
});

app.listen(PORT, () => {
  console.log(`Gateway server is running on port http://localhost:${PORT}`);
});
