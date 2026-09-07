import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ChatMessageStep {
    agent: string;
    action: string;
    status: 'done' | 'running';
}

export interface ChatMessageArtifact {
    title: string;
    type: string;
    code: string;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
    steps?: ChatMessageStep[];
    artifact?: ChatMessageArtifact;
}

interface MessagesState {
    messages: ChatMessage[];
    isLoadingMessages: boolean;
}

const initialState: MessagesState = {
    messages: [],
    isLoadingMessages: false
};

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        setIsLoadingMessages: (state, action: PayloadAction<boolean>) => {
            state.isLoadingMessages = action.payload;
        }
    }
});

export const { setMessages, addMessage, clearMessages, setIsLoadingMessages } = messageSlice.actions;
export default messageSlice.reducer;
