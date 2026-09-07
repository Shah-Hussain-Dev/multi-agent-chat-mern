import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ConversationItem } from "../features/chat";

interface ConversationState {
    conversations: ConversationItem[];
    selectedConversation: ConversationItem | null;
}

const initialState: ConversationState = {
    conversations: [],
    selectedConversation: null
};

const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<ConversationItem[]>) => {
            state.conversations = action.payload;
        },
        addConversation: (state, action: PayloadAction<ConversationItem>) => {
            state.conversations.unshift(action.payload);
        },
        setSelectedConversation: (state, action: PayloadAction<ConversationItem | null>) => {
            state.selectedConversation = action.payload;
        },
        updateConversationInList: (state, action: PayloadAction<{ id: string; title: string }>) => {
            const conv = state.conversations.find(c => c._id === action.payload.id);
            if (conv) {
                conv.title = action.payload.title;
            }
            if (state.selectedConversation && state.selectedConversation._id === action.payload.id) {
                state.selectedConversation.title = action.payload.title;
            }
        },
        deleteConversationFromList: (state, action: PayloadAction<string>) => {
            state.conversations = state.conversations.filter(c => c._id !== action.payload);
            if (state.selectedConversation?._id === action.payload) {
                const remaining = state.conversations.filter(c => c._id !== action.payload);
                state.selectedConversation = remaining.length > 0 ? remaining[0] : null;
            }
        }
    }
});

export const { setConversations, addConversation, setSelectedConversation, updateConversationInList, deleteConversationFromList } = conversationSlice.actions;
export default conversationSlice.reducer;