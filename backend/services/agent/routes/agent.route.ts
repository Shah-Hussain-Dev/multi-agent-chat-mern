import express from "express"
import { agentController } from "../controller/agent.controller.js";

const router = express.Router();

router.post("/ai-chat", agentController)
export default router