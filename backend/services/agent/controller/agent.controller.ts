import { Request, Response } from "express";
import axios from "axios"
import { graph } from "../graph/graph.js";
export const agentController = async (req: Request, res: Response) => {
    try {
        const { prompt, conversationId } = req.body;

        const chatServiceUrl = process.env.CHAT_SERVICE_URL || "http://localhost:8002";

        if (conversationId && prompt) {
            try {
                await axios.post(`${chatServiceUrl}/save-message`, {
                    conversationId,
                    content: prompt,
                    role: "user"
                }, { timeout: 2000 });
            } catch (err: any) {
                console.error("Warning: Failed to save user message in agentController:", err?.message);
            }
        }

        const result = await graph.invoke({
            prompt,
            conversationId
        });

        const aiResponse = result.aiResponse || "AI processing completed successfully.";

        if (conversationId && aiResponse) {
            try {
                await axios.post(`${chatServiceUrl}/save-message`, {
                    conversationId,
                    content: aiResponse,
                    role: "assistant"
                }, { timeout: 2000 });
            } catch (err: any) {
                console.error("Warning: Failed to save assistant message in agentController:", err?.message);
            }
        }

        return res.status(200).json({
            success: true,
            message: "AI response",
            data: {
                response: aiResponse
            }
        });

    } catch (error: any) {
        console.error("Error in agentController:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get AI response",
            error: error.message
        });
    }
};