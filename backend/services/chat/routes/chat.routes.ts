import express from "express"
import { createConversation, deleteConversation, getAllMessages, getConversations, saveMessage, updateConversation } from "../controllers/chat.controller.js"

const router = express.Router();


router.post("/create-conversation", createConversation);
router.get("/get-conversations", getConversations);
router.get("/get-messages/:conversationId", getAllMessages);
router.post("/update-conversation", updateConversation);
router.post("/save-message", saveMessage);
router.delete("/delete-conversation/:id", deleteConversation);



export default router