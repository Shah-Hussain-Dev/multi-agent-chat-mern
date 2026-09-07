import React from 'react';
import { MessageSquare, Loader2, AtSign, Code2 } from 'lucide-react';
import type { ConversationItem } from '../../features/chat';

interface ChatHeaderProps {
    selectedConversation: ConversationItem | null;
    messagesCount: number;
    isLoadingMessages: boolean;
    currentAgentLabel: string;
    onToggleArtifacts?: () => void;
    showArtifacts?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    selectedConversation,
    messagesCount,
    isLoadingMessages,
    currentAgentLabel,
    onToggleArtifacts,
    showArtifacts
}) => {
    return (
        <header className="px-4 py-3 bg-[#0a0c10] border-b border-white/[0.06] flex items-center justify-between shrink-0 z-10">
            <div className="flex items-center gap-3">
                {/* Chat Badge & Active Agent Badge */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    {selectedConversation && (
                        <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-white/5 text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                            {isLoadingMessages && <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />}
                            <span>{messagesCount} Messages</span>
                        </span>
                    )}

                    <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                        <AtSign className="w-3 h-3 text-emerald-400" />
                        <span className="font-bold">{currentAgentLabel}</span>
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {onToggleArtifacts && (
                    <button
                        onClick={onToggleArtifacts}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${showArtifacts
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
    );
};
