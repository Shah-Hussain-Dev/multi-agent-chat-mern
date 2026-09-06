import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Play, 
    CheckCircle2, 
    Bot, 
    Terminal, 
    Sparkles, 
    Code, 
    Search, 
    ShieldCheck, 
    Layers,
    FileCode,
    Check,
    Copy
} from 'lucide-react';

interface PresetTask {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    prompt: string;
    nodes: {
        name: string;
        role: string;
        status: string;
        time: string;
    }[];
    logs: string[];
    artifact: {
        title: string;
        type: string;
        code: string;
    };
}

const PRESET_TASKS: PresetTask[] = [
    {
        id: 'fullstack',
        title: 'Fullstack App Builder',
        description: 'Generates complete React + Tailwind component with real-time state.',
        icon: <Code className="w-4 h-4 text-emerald-400" />,
        prompt: "Create an interactive Real-time Analytics Dashboard component with metrics and responsive charts.",
        nodes: [
            { name: 'Graph Router', role: 'Intent & Task Split', status: 'Completed', time: '14ms' },
            { name: 'UI Architect', role: 'Component Blueprinting', status: 'Completed', time: '82ms' },
            { name: 'Tailwind Agent', role: 'Styling & Micro-animations', status: 'Completed', time: '120ms' },
            { name: 'Validator Sentinel', role: 'Sandbox Syntax Check', status: 'Completed', time: '45ms' }
        ],
        logs: [
            "> [Router] Analyzing prompt: 'Real-time Analytics Dashboard'",
            "> [Router] Routing to agents: @UIArchitect, @TailwindAgent, @Validator",
            "> [UIArchitect] Defining state primitives: metricCards, chartData, timeframe",
            "> [TailwindAgent] Applying emerald dark-mode theme & glassmorphism classes",
            "> [Validator] Compiling JSX AST... 0 errors, 0 warnings",
            "> [Swarm Output] Rendered live interactive React Artifact Component."
        ],
        artifact: {
            title: "AnalyticsDashboard.tsx",
            type: "TypeScript React",
            code: `import React, { useState } from 'react';
import { AreaChart, Activity, DollarSign, Users } from 'lucide-react';

export const AnalyticsDashboard = () => {
    const [timeframe, setTimeframe] = useState('24h');
    const stats = [
        { label: 'Total Revenue', value: '$128,430', change: '+14.2%', icon: DollarSign },
        { label: 'Active Swarms', value: '4,892', change: '+28.4%', icon: Activity },
        { label: 'API Requests', value: '1.4M', change: '+8.1%', icon: Users }
    ];

    return (
        <div className="p-6 bg-zinc-950 text-white rounded-2xl border border-zinc-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-emerald-400">Swarm Telemetry</h3>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full">Live Feed</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                        <p className="text-xs text-zinc-400">{s.label}</p>
                        <p className="text-xl font-bold mt-1">{s.value}</p>
                        <span className="text-[10px] text-emerald-400">{s.change}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};`
        }
    },
    {
        id: 'security',
        title: 'Security Vulnerability Auditor',
        description: 'Scans backend API code for zero-day & OWASP vulnerabilities.',
        icon: <ShieldCheck className="w-4 h-4 text-teal-400" />,
        prompt: "Audit Express.js JWT authentication handler for token leakage and replay risks.",
        nodes: [
            { name: 'Code Ingestor', role: 'AST Token Parsing', status: 'Completed', time: '18ms' },
            { name: 'SecOps Agent', role: 'Rule-Based Pattern Match', status: 'Completed', time: '95ms' },
            { name: 'PenTest Agent', role: 'Exploit Simulation', status: 'Completed', time: '140ms' },
            { name: 'Remediation Bot', role: 'Patch Synthesis', status: 'Completed', time: '60ms' }
        ],
        logs: [
            "> [Ingestor] Parsing AST tree for express auth middleware...",
            "> [SecOps] Detected potential JWT secret hardcoding risk on line 14.",
            "> [PenTest] Simulating replay attack vector with expired bearer token...",
            "> [Remediation] Generating secure Redis session blacklist handler...",
            "> [Swarm Output] Security Patch Generated and Verified 100% Secure."
        ],
        artifact: {
            title: "secureAuthMiddleware.ts",
            type: "Node.js TypeScript",
            code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { redisClient } from '../config/redis';

export const verifySwarmToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. Invalid token format.' });
        }
        const token = authHeader.split(' ')[1];
        const isBlacklisted = await redisClient.get(\`token_blacklist:\${token}\`);
        if (isBlacklisted) {
            return res.status(403).json({ message: 'Token revoked.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Authentication failed.' });
    }
};`
        }
    },
    {
        id: 'research',
        title: 'Deep Market Research Agent',
        description: 'Synthesizes web intelligence into structured vector reports.',
        icon: <Search className="w-4 h-4 text-indigo-400" />,
        prompt: "Gather multi-source intelligence on multi-agent AI frameworks and market positioning.",
        nodes: [
            { name: 'Web Crawler', role: 'Real-time Scrape', status: 'Completed', time: '210ms' },
            { name: 'Extractor Bot', role: 'Entity Extraction', status: 'Completed', time: '110ms' },
            { name: 'Synthesizer', role: 'Report Generation', status: 'Completed', time: '85ms' },
            { name: 'Quality Guard', role: 'Fact Verification', status: 'Completed', time: '50ms' }
        ],
        logs: [
            "> [Crawler] Fetched 14 public developer surveys & github repositories...",
            "> [Extractor] Isolated key benchmark metrics: Agent latency, token costs.",
            "> [Synthesizer] Compiling structured markdown analysis report...",
            "> [QualityGuard] Cross-checking citations against primary sources...",
            "> [Swarm Output] Comprehensive Market Intelligence Brief Generated."
        ],
        artifact: {
            title: "SwarmFrameworksReport.md",
            type: "Markdown Brief",
            code: `# Multi-Agent AI Swarm Ecosystem Report (2026)

## Executive Summary
Autonomous multi-agent swarms have surpassed single-prompt LLM calls in complex enterprise tasks. Key benchmarks show:
- **Task Success Rate**: 94.8% vs 62.1% (Single Agent)
- **Error Reduction**: 4.2x lower hallucination rates via multi-agent consensus.
- **Latency Optimization**: Dynamic LangGraph routing cuts execution costs by 38%.

## Key Architecture Highlights
1. **LangGraph Graph Routers**: Route simple queries to fast micro-models.
2. **Real-time Artifact Streaming**: Instant live UI preview for human-in-the-loop validation.
3. **Zero-Trust Sandboxing**: Isolated microservices for command & code execution.`
        }
    }
];

export const SwarmPlayground: React.FC = () => {
    const [selectedTask, setSelectedTask] = useState<PresetTask>(PRESET_TASKS[0]);
    const [isRunning, setIsRunning] = useState(false);
    const [stepProgress, setStepProgress] = useState(4); // default finished state
    const [copied, setCopied] = useState(false);

    const handleRunSimulation = () => {
        setIsRunning(true);
        setStepProgress(0);

        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep += 1;
            setStepProgress(currentStep);
            if (currentStep >= selectedTask.nodes.length) {
                clearInterval(interval);
                setIsRunning(false);
            }
        }, 500);
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(selectedTask.artifact.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="playground" className="py-20 md:py-28 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Interactive Swarm Simulator
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                        Experience Autonomous Agent Swarms in Action
                    </h2>
                    <p className="text-zinc-400 text-base leading-relaxed">
                        Select a task scenario below and trigger our simulated multi-agent graph. Watch agents collaborate, route tasks, run sandboxed logic, and stream live artifacts.
                    </p>
                </div>

                {/* Main Interactive Widget Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Column: Preset Task Cards & Control Panel */}
                    <div className="lg:col-span-4 space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
                            Select Swarm Scenario:
                        </h3>

                        {PRESET_TASKS.map((task) => {
                            const isSelected = selectedTask.id === task.id;
                            return (
                                <button
                                    key={task.id}
                                    onClick={() => {
                                        if (!isRunning) {
                                            setSelectedTask(task);
                                            setStepProgress(4);
                                        }
                                    }}
                                    disabled={isRunning}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                                        isSelected
                                            ? 'bg-zinc-900 border-emerald-500/60 shadow-xl shadow-emerald-950/30'
                                            : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-900 text-zinc-400'}`}>
                                            {task.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                                                    {task.title}
                                                </h4>
                                                {isSelected && (
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                )}
                                            </div>
                                            <p className="text-xs text-zinc-400 leading-normal">
                                                {task.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}

                        {/* Execute Trigger Button */}
                        <div className="pt-2">
                            <button
                                onClick={handleRunSimulation}
                                disabled={isRunning}
                                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                            >
                                {isRunning ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                                        <span>Swarm Graph Executing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 fill-zinc-950" />
                                        <span>Run Swarm Simulation</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Execution Nodes, Logs & Generated Artifact */}
                    <div className="lg:col-span-8 bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
                        
                        {/* Prompt Header */}
                        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="flex-1 text-xs">
                                <span className="text-zinc-500 font-mono">User Prompt:</span>
                                <p className="text-zinc-200 font-medium">{selectedTask.prompt}</p>
                            </div>
                        </div>

                        {/* Active Agent Nodes Step Progress */}
                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                                Collaborative Swarm Pipeline (4 Agents)
                            </span>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {selectedTask.nodes.map((node, idx) => {
                                    const isDone = stepProgress > idx;
                                    const isCurrent = stepProgress === idx && isRunning;
                                    return (
                                        <div
                                            key={idx}
                                            className={`p-3 rounded-xl border text-xs transition-all ${
                                                isDone
                                                    ? 'bg-zinc-900/90 border-emerald-500/50 text-zinc-200'
                                                    : isCurrent
                                                    ? 'bg-emerald-950/30 border-emerald-400 animate-pulse text-white'
                                                    : 'bg-zinc-950 border-zinc-800/60 text-zinc-500'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-bold truncate text-[11px]">{node.name}</span>
                                                {isDone ? (
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                                ) : isCurrent ? (
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                                ) : (
                                                    <span className="w-2 h-2 rounded-full bg-zinc-700" />
                                                )}
                                            </div>
                                            <p className="text-[10px] text-zinc-400 truncate">{node.role}</p>
                                            <span className="text-[9px] font-mono text-emerald-400 block mt-1">
                                                {isDone ? node.time : isCurrent ? 'Running...' : 'Queued'}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Live Log Terminal Output */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-zinc-400">
                                <span className="flex items-center gap-1.5 font-mono">
                                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                                    Stream Log Output
                                </span>
                                <span className="text-[10px] font-mono text-zinc-500">Node Cluster #01</span>
                            </div>

                            <div className="font-mono text-xs bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 text-zinc-300 h-32 overflow-y-auto space-y-1">
                                {selectedTask.logs.slice(0, stepProgress + 2).map((log, idx) => (
                                    <motion.p
                                        key={idx}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={log.includes('Output') ? 'text-emerald-400 font-bold' : 'text-zinc-400'}
                                    >
                                        {log}
                                    </motion.p>
                                ))}
                            </div>
                        </div>

                        {/* Rendered Artifact Preview Box */}
                        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <FileCode className="w-4 h-4 text-emerald-400" />
                                    <span className="font-bold text-white">{selectedTask.artifact.title}</span>
                                    <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-400 font-mono">
                                        {selectedTask.artifact.type}
                                    </span>
                                </div>

                                <button
                                    onClick={handleCopyCode}
                                    className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3 h-3 text-emerald-400" />
                                            <span className="text-emerald-400">Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3" />
                                            <span>Copy Output</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Code snippet display */}
                            <pre className="font-mono text-[11px] p-3.5 bg-zinc-950 rounded-xl text-zinc-300 overflow-x-auto border border-zinc-800/80 leading-relaxed max-h-48">
                                <code>{selectedTask.artifact.code}</code>
                            </pre>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default SwarmPlayground;
