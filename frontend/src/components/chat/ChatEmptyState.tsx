import React from 'react';
import { Bot, Code2, Image as ImageIcon, Presentation, FileText, Globe } from 'lucide-react';
import type { AgentMode } from './agentOptions';

interface ChatEmptyStateProps {
    appName: string;
    onPresetClick: (prompt: string, mode?: AgentMode) => void;
}

export const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({ appName, onPresetClick }) => {
    return (
        <div className="my-auto flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto py-8">
            {/* Glowing Brand Icon */}
            <div className="relative flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 p-[1px] shadow-2xl shadow-emerald-500/20">
                <div className="w-full h-full bg-[#0a0c10] rounded-[23px] flex items-center justify-center">
                    <Bot className="w-8 h-8 text-emerald-400" />
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {appName} AI Agents
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-300">
                    Select an Agent & start chatting
                </h2>
            </div>

            {/* Quick Start Suggestion Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-xl">
                <button
                    onClick={() => onPresetClick("Write a Netflix clone in React & Tailwind", "coding")}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-zinc-300 text-xs font-medium transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
                >
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Write Netflix Clone</span>
                </button>

                <button
                    onClick={() => onPresetClick("Generate a futuristic AI robot artwork", "image")}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-zinc-300 text-xs font-medium transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
                >
                    <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                    <span>Generate AI Artwork</span>
                </button>

                <button
                    onClick={() => onPresetClick("Create a 10-slide deck on Microservices Architecture", "ppt")}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-zinc-300 text-xs font-medium transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
                >
                    <Presentation className="w-3.5 h-3.5 text-rose-400" />
                    <span>Create PPT Pitch Deck</span>
                </button>

                <button
                    onClick={() => onPresetClick("Summarize financial earnings report PDF document", "pdf")}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-zinc-300 text-xs font-medium transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
                >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Analyze PDF Document</span>
                </button>

                <button
                    onClick={() => onPresetClick("Search latest breakthroughs in quantum computing 2026", "search")}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-zinc-300 text-xs font-medium transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
                >
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Live Web Research</span>
                </button>
            </div>
        </div>
    );
};
