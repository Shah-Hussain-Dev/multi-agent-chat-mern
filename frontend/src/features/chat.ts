import api from "../utils/axios";

export interface ConversationItem {
    _id: string;
    userId: string;
    title?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ChatMessageItem {
    _id: string;
    conversationId: string;
    role: 'user' | 'assistant' | 'agent';
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

// Fetch all conversations for logged in user
export const fetchConversations = async (): Promise<ConversationItem[]> => {
    try {
        const res = await api.get("/chat/get-conversations");
        return res.data?.data || [];
    } catch (err) {
        console.error("Error fetching conversations:", err);
        return [];
    }
};

// Create a new conversation thread
export const createNewConversation = async (): Promise<ConversationItem | null> => {
    try {
        const res = await api.post("/chat/create-conversation");
        return res.data?.data || null;
    } catch (err) {
        console.error("Error creating conversation:", err);
        return null;
    }
};

// Update conversation title
export const updateConversationTitle = async (id: string, title: string): Promise<boolean> => {
    try {
        const res = await api.post("/chat/update-conversation", { id, title });
        return res.data?.success || false;
    } catch (err) {
        console.error("Error updating conversation title:", err);
        return false;
    }
};

// Fetch all messages for a specific conversation
export const fetchConversationMessages = async (conversationId: string): Promise<ChatMessageItem[]> => {
    try {
        const res = await api.get(`/chat/get-messages/${conversationId}`);
        return res.data?.data || [];
    } catch (err) {
        console.error("Error fetching conversation messages:", err);
        return [];
    }
};

// Save a chat message to DB
export const saveChatMessage = async (conversationId: string, role: 'user' | 'assistant' | 'agent', content: string) => {
    try {
        const res = await api.post("/chat/save-message", { conversationId, role, content });
        return res.data?.data || null;
    } catch (err) {
        console.error("Error saving chat message:", err);
        return null;
    }
};

// Delete a conversation thread
export const deleteConversationApi = async (id: string): Promise<boolean> => {
    try {
        const res = await api.delete(`/chat/delete-conversation/${id}`);
        return res.data?.success || false;
    } catch (err) {
        console.error("Error deleting conversation:", err);
        return false;
    }
};

// Send message API
export const sendMessageApi = async (payload: { prompt: string; conversationId?: string }): Promise<string | null> => {
    try {
        const res = await api.post("/agent/chat", payload);
        if (res.data?.success) {
            return res.data?.data?.response || res.data?.data || res.data?.response || "AI response received";
        }
        return null;
    } catch (error: any) {
        console.error("Error in sendMessageApi:", error?.response?.data?.message || error?.message);
        return null;
    }
};