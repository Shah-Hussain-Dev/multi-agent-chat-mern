import React, { useState, useRef, useEffect } from 'react';
import {
    fetchConversationMessages,
    updateConversationTitle,
    createNewConversation,
    sendMessageApi,
    type ChatMessageItem
} from '../../features/chat';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
    addConversation,
    setSelectedConversation,
    updateConversationInList
} from '../../redux/conversationSlice';
import {
    setMessages,
    addMessage,
    setIsLoadingMessages,
    type ChatMessage
} from '../../redux/messageSlice';

import { ChatHeader } from './ChatHeader';
import { ChatEmptyState } from './ChatEmptyState';
import { ChatMessageList } from './ChatMessageList';
import { ChatInputDock } from './ChatInputDock';
import { AGENT_OPTIONS, type AgentMode, type AgentOptionItem } from './agentOptions';

export { AGENT_OPTIONS };
export type { AgentMode, AgentOptionItem };

interface ChatSectionProps {
    isSidebarCollapsed?: boolean;
    onToggleSidebar?: () => void;
    onToggleArtifacts?: () => void;
    showArtifacts?: boolean;
}

export const ChatSection: React.FC<ChatSectionProps> = ({
    isSidebarCollapsed,
    onToggleSidebar,
    onToggleArtifacts,
    showArtifacts
}) => {
    const dispatch = useAppDispatch();
    const { selectedConversation } = useAppSelector((state) => state.conversations);
    const { messages, isLoadingMessages } = useAppSelector((state) => state.messages);
    const activeConversationId = selectedConversation?._id;

    const [inputPrompt, setInputPrompt] = useState('');
    const [selectedMode, setSelectedMode] = useState<AgentMode>('auto');
    const [isAgentMenuOpen, setIsAgentMenuOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const appName = import.meta.env.VITE_APP_NAME || import.meta.env.APP_NAME || "Agentrix";
    const currentAgent = AGENT_OPTIONS.find(a => a.id === selectedMode) || AGENT_OPTIONS[0];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isGenerating]);

    // Load messages when activeConversationId changes
    useEffect(() => {
        const loadMessages = async () => {
            if (!activeConversationId) {
                dispatch(setMessages([]));
                return;
            }
            dispatch(setIsLoadingMessages(true));
            try {
                const apiMsgs = await fetchConversationMessages(activeConversationId);
                const formattedMsgs: ChatMessage[] = apiMsgs.map((m: ChatMessageItem) => ({
                    id: m._id,
                    sender: m.role === 'user' ? 'user' : 'agent',
                    text: m.content,
                    timestamp: m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
                }));
                dispatch(setMessages(formattedMsgs));
            } catch (err) {
                console.error("Error loading conversation messages:", err);
            } finally {
                dispatch(setIsLoadingMessages(false));
            }
        };
        loadMessages();
    }, [activeConversationId, dispatch]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputPrompt.trim() || isGenerating) return;

        let convId = activeConversationId;
        const promptText = inputPrompt;
        setInputPrompt('');

        // If no active conversation exists, create one via API
        if (!convId) {
            const newConv = await createNewConversation();
            if (newConv) {
                convId = newConv._id;
                dispatch(addConversation(newConv));
                dispatch(setSelectedConversation(newConv));
            }
        }

        const userMsg: ChatMessage = {
            id: String(Date.now()),
            sender: 'user',
            text: promptText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        dispatch(addMessage(userMsg));
        setIsGenerating(true);

        // Save user message to database if first prompt title update needed
        if (convId && messages.length === 0) {
            const titleSnippet = promptText.length > 28 ? `${promptText.substring(0, 28)}...` : promptText;
            await updateConversationTitle(convId, titleSnippet);
            dispatch(updateConversationInList({ id: convId, title: titleSnippet }));
        }

        // Call backend agent chat API (/api/agent/chat)
        try {
            const apiAiResponse = await sendMessageApi({ prompt: promptText, conversationId: convId });
            const agentName = currentAgent.label;
            const responseText = apiAiResponse || `Executing your task with ${agentName} (${currentAgent.file}): "${promptText}".`;

            const agentMsg: ChatMessage = {
                id: String(Date.now() + 1),
                sender: 'agent',
                text: responseText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                artifact: currentAgent.id === 'coding' ? {
                    title: "AgentOutput.tsx",
                    type: "TypeScript React",
                    code: `import React from 'react';\n\nexport const AgentComponent = () => {\n  return (\n    <div className="p-4 bg-zinc-950 text-emerald-400 rounded-xl border border-emerald-500/30">\n      ✨ Autonomous Agent Output Ready!\n    </div>\n  );\n};`
                } : currentAgent.id === 'image' ? {
                    title: "GeneratedAsset.png",
                    type: "AI Image Canvas",
                    code: `// Prompt: "${promptText}"\n// Agent: backend/services/agent/agents/image.agent.ts\n// Status: 1024x1024 High-Res Rendered`
                } : currentAgent.id === 'ppt' ? {
                    title: "PresentationDeck.pptx",
                    type: "PPT Deck Outline",
                    code: `# Slide 1: Executive Overview\n# Slide 2: Agent Architecture\n# Slide 3: Performance Benchmarks`
                } : undefined
            };

            dispatch(addMessage(agentMsg));
        } catch (err) {
            console.error("Error sending message to AI agent API:", err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePresetClick = (prompt: string, mode?: AgentMode) => {
        setInputPrompt(prompt);
        if (mode) setSelectedMode(mode);
    };

    return (
        <main className="h-full w-full bg-[#0a0c10] flex flex-col flex-1 overflow-hidden relative font-sans">
            {/* Top Minimalist Header */}
            <ChatHeader
                selectedConversation={selectedConversation}
                messagesCount={messages.length}
                isLoadingMessages={isLoadingMessages}
                currentAgentLabel={currentAgent.label}
                onToggleArtifacts={onToggleArtifacts}
                showArtifacts={showArtifacts}
            />

            {/* Conversation / Main View Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 flex flex-col justify-between">
                {messages.length === 0 && !isLoadingMessages ? (
                    <ChatEmptyState
                        appName={appName}
                        onPresetClick={handlePresetClick}
                    />
                ) : (
                    <ChatMessageList
                        messages={messages}
                        isGenerating={isGenerating}
                        currentAgentLabel={currentAgent.label}
                        messagesEndRef={messagesEndRef}
                    />
                )}
            </div>

            {/* Floating Dock Input Box */}
            <ChatInputDock
                inputPrompt={inputPrompt}
                setInputPrompt={setInputPrompt}
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
                isGenerating={isGenerating}
                currentAgent={currentAgent}
                isAgentMenuOpen={isAgentMenuOpen}
                setIsAgentMenuOpen={setIsAgentMenuOpen}
                onSendMessage={handleSendMessage}
                appName={appName}
            />
        </main>
    );
};

export default ChatSection;