import React from 'react';
import {
    Zap,
    MessageSquare,
    Code2,
    Image as ImageIcon,
    FileText,
    Presentation,
    Globe
} from 'lucide-react';

export type AgentMode = 'auto' | 'chat' | 'coding' | 'image' | 'pdf' | 'ppt' | 'search';

export interface AgentOptionItem {
    id: AgentMode;
    label: string;
    description: string;
    icon: React.ElementType;
    file: string;
    color: string;
}

export const AGENT_OPTIONS: AgentOptionItem[] = [
    { id: 'auto', label: 'Auto', description: 'Smart LangGraph Router', icon: Zap, file: 'router.ts', color: 'from-emerald-500 via-teal-400 to-emerald-400' },
    { id: 'chat', label: 'Chat', description: 'General Knowledge & Q&A', icon: MessageSquare, file: 'chat.agent.ts', color: 'from-emerald-500 via-teal-400 to-emerald-400' },
    { id: 'coding', label: 'Coding', description: 'Code AST & Refactoring', icon: Code2, file: 'coding.agent.ts', color: 'from-emerald-500 via-teal-400 to-emerald-400' },
    { id: 'image', label: 'Image', description: 'AI Image Synthesis & Design', icon: ImageIcon, file: 'image.agent.ts', color: 'from-emerald-500 via-teal-400 to-emerald-400' },
    { id: 'pdf', label: 'PDF', description: 'PDF & Document Analysis', icon: FileText, file: 'pdf.agent.ts', color: 'from-emerald-500 via-teal-400 to-emerald-400' },
    { id: 'ppt', label: 'PPT', description: 'Presentation & Deck Builder', icon: Presentation, file: 'ppt.agent.ts', color: 'from-emerald-500 via-teal-400 to-emerald-400' },
    { id: 'search', label: 'Search', description: 'Live Web Research & News', icon: Globe, file: 'search.agent.ts', color: 'from-emerald-500 via-teal-400 to-emerald-400' },
];
