import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, FileCode, Loader2 } from 'lucide-react';
import type { ChatMessage } from '../../redux/messageSlice';

interface ChatMessageListProps {
    messages: ChatMessage[];
    isGenerating: boolean;
    currentAgentLabel: string;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
    messages,
    isGenerating,
    currentAgentLabel,
    messagesEndRef
}) => {
    return (
        <div className="space-y-6 max-w-3xl mx-auto w-full">
            {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-start gap-3 ${isUser ? 'ml-auto flex-row-reverse max-w-[85%] sm:max-w-[80%]' : 'max-w-[92%] sm:max-w-[88%]'}`}
                    >
                        {/* Avatar */}
                        {isUser ? (
                            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 shadow-md">
                                <User className="w-4 h-4 text-emerald-400" />
                            </div>
                        ) : (
                            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 p-[1px] shadow-md shadow-emerald-500/15 shrink-0">
                                <div className="w-full h-full bg-[#0a0c10] rounded-[11px] flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-emerald-400" />
                                </div>
                            </div>
                        )}

                        {/* Message Bubble Container */}
                        <div className={`space-y-1.5 flex-1 min-w-0 ${isUser ? 'items-end flex flex-col' : ''}`}>
                            <div
                                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${isUser
                                        ? 'bg-[#10221c] border border-emerald-500/30 text-emerald-50 rounded-tr-none'
                                        : 'bg-[#12151e]/90 border border-white/[0.08] text-zinc-100 rounded-tl-none backdrop-blur-md'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                            </div>

                            {/* Code Artifact Box (if present) */}
                            {msg.artifact && (
                                <div className="mt-2 p-3 rounded-xl bg-zinc-950 border border-emerald-500/30 space-y-2 text-xs w-full">
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <FileCode className="w-4 h-4 text-emerald-400" />
                                            <span className="font-bold text-white">{msg.artifact.title}</span>
                                            <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-900 text-zinc-400 font-mono">
                                                {msg.artifact.type}
                                            </span>
                                        </div>
                                    </div>
                                    <pre className="font-mono text-[11px] p-3 bg-zinc-900/80 rounded-lg text-zinc-300 overflow-x-auto border border-white/5 leading-relaxed max-h-40">
                                        <code>{msg.artifact.code}</code>
                                    </pre>
                                </div>
                            )}

                            {/* Timestamp */}
                            {msg.timestamp && (
                                <span className="text-[10px] text-zinc-500 font-mono block px-1 select-none">
                                    {msg.timestamp}
                                </span>
                            )}
                        </div>
                    </motion.div>
                );
            })}

            {/* Generating Loading State Indicator */}
            {isGenerating && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 max-w-xl"
                >
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 p-[1px] shadow-md shrink-0">
                        <div className="w-full h-full bg-[#0a0c10] rounded-[11px] flex items-center justify-center">
                            <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
                        </div>
                    </div>
                    <div className="px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-300 flex items-center gap-2 font-mono shadow-md">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                        <span>{currentAgentLabel} thinking...</span>
                    </div>
                </motion.div>
            )}

            <div ref={messagesEndRef} />
        </div>
    );
};
