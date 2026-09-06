import React from 'react';
import { motion } from 'framer-motion';
import { 
    Layers, 
    GitBranch, 
    Cpu, 
    ShieldCheck, 
    Sparkles, 
    ArrowRight, 
    Terminal 
} from 'lucide-react';

const steps = [
    {
        num: "01",
        title: "Prompt Ingestion & Graph Router",
        description: "The gateway receives the user prompt and passes it to the LangGraph router to construct an optimal execution DAG.",
        icon: <GitBranch className="w-5 h-5 text-emerald-400" />
    },
    {
        num: "02",
        title: "Parallel Agent Mesh Tasking",
        description: "Tasks are distributed concurrently across autonomous specialized agents (Coder, Analyst, Search, Tester).",
        icon: <Cpu className="w-5 h-5 text-teal-400" />
    },
    {
        num: "03",
        title: "Sandboxed Tool & AST Verification",
        description: "Commands and code execute inside zero-trust microservice sandboxes with real-time security AST analysis.",
        icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />
    },
    {
        num: "04",
        title: "Live Artifact Synthesis & Sync",
        description: "Outputs are streamed live into interactive UI artifacts, vector memory, and synced with Redux state.",
        icon: <Sparkles className="w-5 h-5 text-purple-400" />
    }
];

export const ArchitectureSection: React.FC = () => {
    return (
        <section id="architecture" className="py-20 md:py-28 relative bg-zinc-950/60 border-y border-zinc-800/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                        <Layers className="w-3.5 h-3.5" />
                        System Architecture
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                        How Agentrix Swarm Engine Works
                    </h2>
                    <p className="text-zinc-400 text-base leading-relaxed">
                        A deterministic graph pipeline combining LangGraph, microservices, and live WebSockets to deliver lightning-fast multi-agent coordination.
                    </p>
                </div>

                {/* 4 Step Timeline / Pipeline Visual */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.12 }}
                            className="relative p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 shadow-xl space-y-4 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-black font-mono text-emerald-500/40">
                                        {step.num}
                                    </span>
                                    <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                                        {step.icon}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-white">
                                    {step.title}
                                </h3>

                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector indicator for desktop */}
                            {idx < 3 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                                    <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-500">
                                        <ArrowRight className="w-3 h-3 text-emerald-400" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Architecture Highlights Pill Box */}
                <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-teal-950/40 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <Terminal className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-base font-bold text-white">High-Throughput Gateway Microservice</h4>
                            <p className="text-xs text-zinc-400">Handles token stream multiplexing, Redis pub/sub events, and sub-120ms graph node updates.</p>
                        </div>
                    </div>

                    <a
                        href="#sdk"
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shrink-0 transition-colors shadow-lg shadow-emerald-500/20"
                    >
                        Explore SDK Integration
                    </a>
                </div>

            </div>
        </section>
    );
};

export default ArchitectureSection;
