import React, { useState } from 'react';
import { 
    Code2, 
    Eye, 
    Copy, 
    Check, 
    Sparkles, 
    CheckCircle2, 
    X 
} from 'lucide-react';

interface ArtifactsSectionProps {
    onClose?: () => void;
}

export const ArtifactsSection: React.FC<ArtifactsSectionProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [copied, setCopied] = useState(false);

    const artifactCode = `import React, { useState } from 'react';
import { Activity, DollarSign, Users } from 'lucide-react';

export const SwarmAnalyticsDashboard = () => {
    const [timeframe, setTimeframe] = useState('24h');
    const stats = [
        { label: 'Swarm Revenue', value: '$142,890', change: '+18.4%', icon: DollarSign },
        { label: 'Active Agents', value: '5,240', change: '+32.1%', icon: Activity },
        { label: 'API Requests', value: '2.1M', change: '+12.5%', icon: Users }
    ];

    return (
        <div className="p-5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-emerald-400">Swarm Telemetry</h3>
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] rounded-full">Live Feed</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {stats.map((s, i) => (
                    <div key={i} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
                        <p className="text-[10px] text-zinc-400">{s.label}</p>
                        <p className="text-base font-bold">{s.value}</p>
                        <span className="text-[9px] text-emerald-400">{s.change}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};`;

    const handleCopy = () => {
        navigator.clipboard.writeText(artifactCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <aside className="hidden lg:flex h-full w-80 xl:w-96 border-l border-white/[0.07] bg-[#0c0e12] flex-col overflow-hidden shrink-0 select-none">
            
            {/* Header */}
            <div className="p-3.5 border-b border-white/[0.07] flex items-center justify-between bg-[#090b0e]">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-white">Live Artifact Canvas</h3>
                        <span className="text-[10px] text-zinc-400 font-mono">SwarmAnalytics.tsx</span>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={handleCopy}
                        title="Copy Artifact Code"
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    {onClose && (
                        <button
                            onClick={onClose}
                            title="Close Canvas"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Segmented View Switcher */}
            <div className="p-2 border-b border-white/[0.07] bg-[#0c0e12]">
                <div className="p-1 bg-zinc-950 rounded-xl border border-white/5 flex items-center">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            activeTab === 'preview'
                                ? 'bg-zinc-800 text-emerald-400 shadow-md'
                                : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            activeTab === 'code'
                                ? 'bg-zinc-800 text-emerald-400 shadow-md'
                                : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Code Output</span>
                    </button>
                </div>
            </div>

            {/* Artifact Workspace Panel Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#090b0e]">
                {activeTab === 'preview' ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-zinc-950 text-white rounded-2xl border border-zinc-800 space-y-4 shadow-xl">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <h4 className="text-xs font-bold text-emerald-400">Swarm Telemetry</h4>
                                </div>
                                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] rounded-full font-mono">
                                    Live Stream
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-2.5">
                                <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-zinc-400">Swarm Revenue</p>
                                        <p className="text-base font-bold text-white">$142,890</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                        +18.4%
                                    </span>
                                </div>

                                <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-zinc-400">Active Agent Nodes</p>
                                        <p className="text-base font-bold text-white">5,240</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md">
                                        +32.1%
                                    </span>
                                </div>

                                <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-zinc-400">API Requests</p>
                                        <p className="text-base font-bold text-white">2.1M</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                                        +12.5%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Verification badge */}
                        <div className="p-3 rounded-xl bg-zinc-900/70 border border-white/5 text-xs text-zinc-400 space-y-1">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Sandboxed Verification Passed</span>
                            </div>
                            <p className="text-[10px]">Zero unsafe imports or unhandled promises detected.</p>
                        </div>
                    </div>
                ) : (
                    <div className="font-mono text-[11px] p-3.5 bg-zinc-950 rounded-xl text-zinc-300 overflow-x-auto border border-zinc-800 leading-relaxed">
                        <pre>
                            <code>{artifactCode}</code>
                        </pre>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/[0.07] bg-[#0c0e12] text-[10px] font-mono text-zinc-500 flex items-center justify-between">
                <span>AST Status: Verified</span>
                <span>Node #09</span>
            </div>

        </aside>
    );
};

export default ArtifactsSection;