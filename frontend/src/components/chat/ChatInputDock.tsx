import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AtSign, ChevronUp, Sparkles, Check, Paperclip, Mic, ArrowUp } from 'lucide-react';
import { AGENT_OPTIONS, type AgentMode, type AgentOptionItem } from './agentOptions';

interface ChatInputDockProps {
    inputPrompt: string;
    setInputPrompt: (val: string) => void;
    selectedMode: AgentMode;
    setSelectedMode: (mode: AgentMode) => void;
    isGenerating: boolean;
    currentAgent: AgentOptionItem;
    isAgentMenuOpen: boolean;
    setIsAgentMenuOpen: (open: boolean) => void;
    onSendMessage: (e?: React.FormEvent) => void;
    appName: string;
}

export const ChatInputDock: React.FC<ChatInputDockProps> = ({
    inputPrompt,
    setInputPrompt,
    selectedMode,
    setSelectedMode,
    isGenerating,
    currentAgent,
    isAgentMenuOpen,
    setIsAgentMenuOpen,
    onSendMessage,
    appName
}) => {
    return (
        <div className="p-4 max-w-4xl w-full mx-auto shrink-0 z-20">
            <div className="bg-[#12151d]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 sm:p-4 shadow-2xl space-y-3 relative">

                {/* Top Agent Selection Pills Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs select-none scrollbar-none">
                    {AGENT_OPTIONS.map((agent) => {
                        const IconComponent = agent.icon;
                        const isSelected = selectedMode === agent.id;
                        return (
                            <button
                                key={agent.id}
                                type="button"
                                onClick={() => setSelectedMode(agent.id)}
                                title={`${agent.label} - ${agent.description}`}
                                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${isSelected
                                    ? `bg-gradient-to-r ${agent.color} text-zinc-950 shadow-md shadow-emerald-500/20`
                                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5 hover:bg-zinc-800'
                                    }`}
                            >
                                <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'fill-zinc-950/20' : ''}`} />
                                <span>{agent.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Input Field */}
                <form onSubmit={onSendMessage} className="space-y-3">
                    <div className="relative">
                        <textarea
                            rows={2}
                            value={inputPrompt}
                            onChange={(e) => setInputPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onSendMessage();
                                }
                            }}
                            placeholder={`Ask ${currentAgent.label}...`}
                            className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none resize-none leading-relaxed px-1"
                        />
                    </div>

                    {/* Bottom Actions Row inside Dock */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                        <div className="flex items-center gap-2 text-zinc-400 relative">

                            {/* Agent Selector Dropdown Menu Trigger */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsAgentMenuOpen(!isAgentMenuOpen)}
                                    title="Select Active Agent"
                                    className="px-2.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    <AtSign className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="truncate max-w-[100px] sm:max-w-none">{currentAgent.label}</span>
                                    <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isAgentMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Agent Dropdown Menu Popover */}
                                <AnimatePresence>
                                    {isAgentMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute bottom-full left-0 mb-2 w-64 p-2 bg-[#12151d] border border-white/10 rounded-2xl shadow-2xl z-50 space-y-1 backdrop-blur-xl"
                                        >
                                            <div className="px-2 py-1 text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                                                <span>Select Agent</span>
                                                <Sparkles className="w-3 h-3 text-emerald-400" />
                                            </div>

                                            {AGENT_OPTIONS.map((agent) => {
                                                const IconComp = agent.icon;
                                                const isAct = selectedMode === agent.id;
                                                return (
                                                    <button
                                                        key={agent.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedMode(agent.id);
                                                            setIsAgentMenuOpen(false);
                                                        }}
                                                        className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition-all cursor-pointer ${isAct
                                                            ? 'bg-zinc-800/90 border border-emerald-500/30 text-white'
                                                            : 'hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-transparent'
                                                            }`}
                                                    >
                                                        <div className={`p-1.5 rounded-lg bg-zinc-900 border border-white/5 shrink-0 ${isAct ? 'text-emerald-400' : 'text-zinc-400'}`}>
                                                            <IconComp className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex-1 truncate">
                                                            <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
                                                                <span>{agent.label}</span>
                                                                {isAct && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                                                            </div>
                                                            <div className="text-[10px] text-zinc-400 truncate">
                                                                {agent.description}
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

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
                {appName} AI Engine • Active Agent: <span className="text-emerald-400">{currentAgent.label}</span>
            </p>
        </div>
    );
};
