import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Bot, 
    User, 
    Code2, 
    CheckCircle2, 
    Loader2,
    FileCode,
    Paperclip,
    Mic,
    ArrowUp,
    MessageSquare,
    Zap,
    FileText,
    Globe,
    PanelLeft
} from 'lucide-react';
import { 
    fetchConversationMessages, 
    saveChatMessage, 
    updateConversationTitle, 
    createNewConversation,
    type ChatMessageItem 
} from '../../features/chat';

interface ChatMessage {
    id: string;
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
    steps?: {
        agent: string;
        action: string;
        status: 'done' | 'running';
    }[];
    artifact?: {
        title: string;
        type: string;
        code: string;
    };
}

interface ChatSectionProps {
    activeConversationId?: string | null;
    onConversationCreated?: (id: string) => void;
    isSidebarCollapsed?: boolean;
    onToggleSidebar?: () => void;
    onToggleArtifacts?: () => void;
    showArtifacts?: boolean;
}

export const ChatSection: React.FC<ChatSectionProps> = ({ 
    activeConversationId,
    onConversationCreated,
    isSidebarCollapsed, 
    onToggleSidebar, 
    onToggleArtifacts,
    showArtifacts 
}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputPrompt, setInputPrompt] = useState('');
    const [selectedMode, setSelectedMode] = useState<'auto' | 'chat' | 'coding' | 'docs' | 'search'>('auto');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const appName = import.meta.env.VITE_APP_NAME || import.meta.env.APP_NAME || "Agentrix";

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
                setMessages([]);
                return;
            }
            setIsLoadingMessages(true);
            try {
                const apiMsgs = await fetchConversationMessages(activeConversationId);
                const formattedMsgs: ChatMessage[] = apiMsgs.map((m: ChatMessageItem) => ({
                    id: m._id,
                    sender: m.role === 'user' ? 'user' : 'agent',
                    text: m.content,
                    timestamp: m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
                }));
                setMessages(formattedMsgs);
            } catch (err) {
                console.error("Error loading conversation messages:", err);
            } finally {
                setIsLoadingMessages(false);
            }
        };
        loadMessages();
    }, [activeConversationId]);

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
                if (onConversationCreated) {
                    onConversationCreated(newConv._id);
                }
            }
        }

        const userMsg: ChatMessage = {
            id: String(Date.now()),
            sender: 'user',
            text: promptText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsGenerating(true);

        // Save user message to database
        if (convId) {
            await saveChatMessage(convId, 'user', promptText);
            // Update title if it's the first prompt
            if (messages.length === 0) {
                const titleSnippet = promptText.length > 28 ? `${promptText.substring(0, 28)}...` : promptText;
                await updateConversationTitle(convId, titleSnippet);
            }
        }

        // Simulate multi-agent swarm response
        setTimeout(async () => {
            const responseText = `Executing your multi-agent task: "${promptText}". The swarm router dispatched specialized sub-tasks to verify code syntax and construct artifacts.`;
            const agentMsg: ChatMessage = {
                id: String(Date.now() + 1),
                sender: 'agent',
                text: responseText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                steps: [
                    { agent: 'LangGraph Router', action: 'Routed intent to @Coder & @Sentinel', status: 'done' },
                    { agent: 'Coder Agent', action: 'Synthesized TypeScript module AST', status: 'done' },
                    { agent: 'Security Sentinel', action: 'Verified zero-trust sandbox execution', status: 'done' }
                ],
                artifact: {
                    title: "SwarmOutput.tsx",
                    type: "TypeScript React",
                    code: `import React from 'react';\n\nexport const SwarmComponent = () => {\n  return (\n    <div className="p-4 bg-zinc-950 text-emerald-400 rounded-xl border border-emerald-500/30">\n      ✨ Autonomous Swarm Output Ready!\n    </div>\n  );\n};`
                }
            };

            setMessages((prev) => [...prev, agentMsg]);
            setIsGenerating(false);

            if (convId) {
                await saveChatMessage(convId, 'assistant', responseText);
            }
        }, 1400);
    };

    const handlePresetClick = (prompt: string) => {
        setInputPrompt(prompt);
    };

    return (
        <main className="h-full w-full bg-[#0a0c10] flex flex-col flex-1 overflow-hidden relative font-sans">
            
            {/* Top Minimalist Header */}
            <header className="px-4 py-3 bg-[#0a0c10] border-b border-white/[0.06] flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-3">
                    {/* Expand Sidebar Toggle (when collapsed) */}
                    {isSidebarCollapsed && (
                        <button
                            onClick={onToggleSidebar}
                            title="Expand Sidebar"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            <PanelLeft className="w-5 h-5 text-zinc-300" />
                        </button>
                    )}

                    {/* Chat Badge */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            <MessageSquare className="w-3.5 h-3.5" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-white/5 text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                            {isLoadingMessages && <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />}
                            <span>{messages.length} Messages</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {onToggleArtifacts && (
                        <button
                            onClick={onToggleArtifacts}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                showArtifacts
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-zinc-900 text-zinc-300 border border-white/5 hover:border-zinc-700 hover:text-white'
                            }`}
                        >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Artifacts</span>
                        </button>
                    )}
                </div>
            </header>

            {/* Conversation / Main View Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 flex flex-col justify-between">
                
                {/* Empty State / Initial Greeting view */}
                {messages.length === 0 && !isLoadingMessages ? (
                    <div className="my-auto flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto py-10">
                        {/* Glowing Brand Icon */}
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 p-[1px] shadow-2xl shadow-emerald-500/20">
                            <div className="w-full h-full bg-[#0a0c10] rounded-[23px] flex items-center justify-center">
                                <Bot className="w-8 h-8 text-emerald-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                {appName}
                            </h1>
                            <h2 className="text-xl sm:text-2xl font-bold text-zinc-300">
                                How can I help you?
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
                                Ask me anything — code, architecture, multi-agent swarms, or debugging ideas.
                            </p>
                        </div>

                        {/* Quick Start Suggestion Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                            <button
                                onClick={() => handlePresetClick("Write a Netflix clone in React & Tailwind")}
                                className="px-4 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-zinc-300 text-xs font-medium transition-all hover:scale-105 cursor-pointer"
                            >
                                Write a Netflix clone
                            </button>

                            <button
                                onClick={() => handlePresetClick("Explain Redis pub/sub microservices architecture")}
                                className="px-4 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-zinc-300 text-xs font-medium transition-all hover:scale-105 cursor-pointer"
                            >
                                Explain Redis
                            </button>

                            <button
                                onClick={() => handlePresetClick("Build a real-time analytics dashboard component")}
                                className="px-4 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-zinc-300 text-xs font-medium transition-all hover:scale-105 cursor-pointer"
                            >
                                Build a dashboard
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Messages Stream */
                    <div className="space-y-6 max-w-3xl mx-auto w-full">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-start gap-3.5 ${
                                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                                }`}
                            >
                                {/* Avatar */}
                                <div
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-md ${
                                        msg.sender === 'user'
                                            ? 'bg-zinc-800 border border-zinc-700 text-white'
                                            : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950'
                                    }`}
                                >
                                    {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-zinc-950" />}
                                </div>

                                {/* Message Bubble */}
                                <div className="space-y-3 flex-1">
                                    <div
                                        className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                                            msg.sender === 'user'
                                                ? 'bg-emerald-500 text-zinc-950 font-semibold rounded-tr-none shadow-lg shadow-emerald-500/15'
                                                : 'bg-zinc-900/90 border border-white/[0.08] text-zinc-200 rounded-tl-none shadow-xl'
                                        }`}
                                    >
                                        <p>{msg.text}</p>
                                    </div>

                                    {/* Swarm DAG Steps */}
                                    {msg.steps && (
                                        <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/[0.07] space-y-2 text-xs">
                                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                                                Multi-Agent Execution Pipeline
                                            </span>
                                            <div className="space-y-1.5">
                                                {msg.steps.map((step, sIdx) => (
                                                    <div key={sIdx} className="flex items-center gap-2 text-xs">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                                        <span className="font-bold text-zinc-300">{step.agent}:</span>
                                                        <span className="text-zinc-400 truncate">{step.action}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Code Artifact Box */}
                                    {msg.artifact && (
                                        <div className="p-3 rounded-xl bg-zinc-950 border border-emerald-500/30 space-y-2 text-xs">
                                            <div className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2">
                                                    <FileCode className="w-4 h-4 text-emerald-400" />
                                                    <span className="font-bold text-white">{msg.artifact.title}</span>
                                                    <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-900 text-zinc-400 font-mono">
                                                        {msg.artifact.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <pre className="font-mono text-[11px] p-3 bg-zinc-900/80 rounded-lg text-zinc-300 overflow-x-auto border border-white/5 leading-relaxed max-h-36">
                                                <code>{msg.artifact.code}</code>
                                            </pre>
                                        </div>
                                    )}

                                    {msg.timestamp && (
                                        <span className="text-[10px] text-zinc-500 font-mono block px-1">
                                            {msg.timestamp}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {isGenerating && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-3 max-w-xl"
                            >
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-zinc-950 font-bold">
                                    <Bot className="w-4 h-4 text-zinc-950" />
                                </div>
                                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 flex items-center gap-2 font-mono">
                                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                                    <span>Agentrix Swarm reasoning on prompt...</span>
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Floating Dock Input Box */}
            <div className="p-4 max-w-4xl w-full mx-auto shrink-0 z-20">
                <div className="bg-[#12151d]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 sm:p-4 shadow-2xl space-y-3">
                    
                    {/* Top Mode Selection Pills Bar */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs select-none">
                        <button
                            onClick={() => setSelectedMode('auto')}
                            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                selectedMode === 'auto'
                                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
                            }`}
                        >
                            <Zap className="w-3.5 h-3.5 fill-zinc-950/20" />
                            <span>Auto</span>
                        </button>

                        <button
                            onClick={() => setSelectedMode('chat')}
                            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                selectedMode === 'chat'
                                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
                            }`}
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Chat</span>
                        </button>

                        <button
                            onClick={() => setSelectedMode('coding')}
                            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                selectedMode === 'coding'
                                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
                            }`}
                        >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Coding</span>
                        </button>

                        <button
                            onClick={() => setSelectedMode('docs')}
                            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                selectedMode === 'docs'
                                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
                            }`}
                        >
                            <FileText className="w-3.5 h-3.5" />
                            <span>PDF / Docs</span>
                        </button>

                        <button
                            onClick={() => setSelectedMode('search')}
                            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                selectedMode === 'search'
                                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
                            }`}
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Search</span>
                        </button>
                    </div>

                    {/* Main Input Field */}
                    <form onSubmit={handleSendMessage} className="space-y-3">
                        <textarea
                            rows={2}
                            value={inputPrompt}
                            onChange={(e) => setInputPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder={`Ask ${appName}...`}
                            className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none resize-none leading-relaxed px-1"
                        />

                        {/* Bottom Actions Row inside Dock */}
                        <div className="flex items-center justify-between pt-1 border-t border-white/5">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <button
                                    type="button"
                                    title="Attach File"
                                    className="p-1.5 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
                                >
                                    <Paperclip className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    title="Voice Input"
                                    className="p-1.5 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
                                >
                                    <Mic className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Gradient Submit Button */}
                            <button
                                type="submit"
                                disabled={!inputPrompt.trim() || isGenerating}
                                className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-emerald-500/20 font-bold"
                            >
                                <ArrowUp className="w-4 h-4 stroke-[3] text-zinc-950" />
                            </button>
                        </div>
                    </form>

                </div>

                {/* Sub-text Disclaimer */}
                <p className="text-[10px] text-zinc-500 text-center mt-2 font-mono">
                    {appName} Swarm Engine can make mistakes. Verify important info.
                </p>
            </div>

        </main>
    );
};

export default ChatSection;