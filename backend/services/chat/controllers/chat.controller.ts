import { Request, Response } from "express";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.modesl.js";

export const createConversation = async (req: Request, res: Response) => {
    try {
        const userId = req.headers["x-user-id"] as string;
        console.log("userid from headers", userId)
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access!"
            })
        }
        const conversation = await Conversation.create({
            userId: userId
        })
        return res.status(200).json({
            success: true,
            message: "Conversation created successfully",
            data: conversation
        })

    } catch (error) {
        console.log("Error in createConversation:", error)
        return res.status(500).json({
            success: false,
            message: `Error creating conversation ${error}`
        })
    }
}

export const getConversations = async (req: Request, res: Response) => {
    try {
        const userId = req.headers["x-user-id"] as string;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access!"
            })
        }
        const conversations = await Conversation.find({
            userId: userId
        }).sort({ updatedAt: -1 })
        return res.status(200).json({
            success: true,
            message: "Conversations fetched successfully",
            data: conversations
        })
    } catch (error) {
        console.log("Error in getConversations:", error)
        return res.status(500).json({
            success: false,
            message: `Error fetching conversations ${error}`
        })
    }
}

export const updateConversation = async (req: Request, res: Response) => {
    try {
        const { id, title } = req.body;
        if (!id || !title) {
            return res.status(400).json({
                success: false,
                message: "Bad request. Missing required fields"
            })
        }
        const conversation = await Conversation.findByIdAndUpdate(id, {
            title: title
        }, { new: true })
        return res.status(200).json({
            success: true,
            message: "Conversation updated successfully",
            data: conversation
        })
    } catch (error) {
        console.log("Error in updateConversation:", error)
        return res.status(500).json({
            success: false,
            message: `Error updating conversation ${error}`
        })
    }
}

export const saveMessage = async (req: Request, res: Response) => {
    try {
        const { conversationId, role, content } = req.body;
        if (!conversationId || !role || !content) {
            return res.status(400).json({
                success: false,
                message: "Bad request. Missing required fields"
            })
        }
        const message = await Message.create({
            conversationId,
            role,
            content
        });

        // Update conversation last updated time
        await Conversation.findByIdAndUpdate(conversationId, {
            updatedAt: new Date()
        });

        return res.status(200).json({
            success: true,
            message: "Message saved successfully",
            data: message
        })

    } catch (error) {
        console.log("Error sending message", error)
        return res.status(500).json({
            success: false,
            message: `Error sending message ${error}`
        })
    }
}



export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({
                success: false,
                message: "Conversation id not found!"
            })
        }
        const messages = await Message.find({
            conversationId
        }).sort({ createdAt: 1 });
        return res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data: messages
        })
    } catch (error) {
        console.log("Error fetching messages", error)
        return res.status(500).json({
            success: false,
            message: `Error fetching messages ${error}`
        })
    }
}

export const deleteConversation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.headers["x-user-id"] as string;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Bad request. Conversation ID missing"
            });
        }
        await Conversation.findOneAndDelete({ _id: id, userId: userId });
        await Message.deleteMany({ conversationId: id });

        return res.status(200).json({
            success: true,
            message: "Conversation deleted successfully"
        });
    } catch (error) {
        console.log("Error in deleteConversation:", error);
        return res.status(500).json({
            success: false,
            message: `Error deleting conversation ${error}`
        });
    }
}