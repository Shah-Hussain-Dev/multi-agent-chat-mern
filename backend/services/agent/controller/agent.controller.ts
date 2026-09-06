import { Request, Response } from "express";
import axios from "axios"
import { graph } from "../graph/graph.js";
export const agentController = async (req: Request, res: Response) => {
    try {
        const { prompt, conversationId } = req.body;
        await axios.post(
            `${process.env.CHAT_SERVICE_URL}/api/save-message`, {
            conversationId,
            content: prompt,
            role: "user",

        }
        )

        const result = await graph.invoke({
            prompt,
            conversationId
        });

        const aiResponse = result.aiResponse;


        return res.status(200).json({
            success: true,
            message: "AI response",
            data: {
                response: aiResponse
            }
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to get AI response",
            error: error.message
        })
    }
}