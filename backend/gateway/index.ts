import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";

dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const PORT = Number(process.env.PORT) || 8000;
const app = express();

app.use("/auth", proxy(process.env.AUTH_SERVICE || "http://localhost:8001"));

app.get("/", (_req, res) => {
  res.status(200).json("Gateway server is running");
});

app.listen(PORT, () => {
  console.log(`Gateway server is running on port http://localhost:${PORT}`);
});
