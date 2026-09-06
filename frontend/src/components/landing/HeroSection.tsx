import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Sparkles, 
    ArrowRight, 
    Play, 
    Code2, 
    CheckCircle2, 
    GitBranch, 
    Terminal, 
    Activity
} from 'lucide-react';
import { useAppSelector } from '../../redux/store';

export const HeroSection: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.user);

    return (
        <section className="relative pt-32 sm:pt-40 pb-20 md:pb-28 overflow-hidden">
            {/* Background Radial Lights */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
                    
                    {/* Top Pill Announcement Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-xs text-zinc-300 shadow-xl backdrop-blur-xl hover:border-emerald-500/60 transition-colors cursor-pointer group"
                    >
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="font-semibold text-emerald-400">Agentrix 2.0 Released:</span>
                        <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
                            LangGraph Router & Live Artifacts Stream
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]"
                    >
                        Orchestrate Multi-Agent Swarms with{' '}
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                            Autonomous Graph Intelligence
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-xl text-zinc-400 leading-relaxed max-w-3xl font-normal"
                    >
                        Deploy specialized AI agents that collaborate, execute code, resolve complex tasks, 
                        and render live UI artifacts in real time. Powered by a high-performance MERN & LangGraph swarm matrix.
                    </motion.p>

                    {/* Primary Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2"
                    >
                        <Link
                            to={isAuthenticated ? "/chat" : "/auth?mode=register"}
                            className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4 text-zinc-950 group-hover:rotate-12 transition-transform" />
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <a
                            href="#playground"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white font-semibold text-sm backdrop-blur-xl flex items-center justify-center gap-2.5 transition-all duration-200 hover:bg-zinc-800/80 cursor-pointer"
                        >
                            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                            <span>Try Live Swarm Simulator</span>
                        </a>
                    </motion.div>

                    {/* Quick Feature Badges Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>No Credit Card Needed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-400" />
                            <span>LangGraph Node Routing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                            <span>Sub-120ms Latency</span>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Interactive Visual Canvas / Floating Dashboard Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-14 relative max-w-5xl mx-auto"
                >
                    {/* Glowing outer border gradient */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 rounded-3xl opacity-30 blur-xl animate-pulse" />

                    <div className="relative rounded-2xl bg-zinc-950/90 border border-zinc-800/90 shadow-2xl overflow-hidden backdrop-blur-2xl">
                        
                        {/* Mock App Window Header Bar */}
                        <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                <span className="ml-2 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                                    <Terminal className="w-3 h-3 text-emerald-400" />
                                    agentrix-swarm-cluster-main
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                                <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                    <Activity className="w-3 h-3 animate-pulse" />
                                    Swarm Active: 4 Agents
                                </span>
                                <span className="hidden sm:inline bg-zinc-800 px-2 py-0.5 rounded-md">
                                    DAG Session #8941
                                </span>
                            </div>
                        </div>

                        {/* Interactive Hero Content Mockup Grid */}
                        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 bg-zinc-950/80">
                            
                            {/* Left Column: Live Agent Graph Topology */}
                            <div className="md:col-span-5 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2.5">
                                    <span className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                                        <GitBranch className="w-4 h-4 text-emerald-400" />
                                        LangGraph DAG Topology
                                    </span>
                                    <span className="text-[10px] font-mono text-emerald-400">SYNC OK</span>
                                </div>

                                <div className="space-y-2.5 text-xs">
                                    <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-emerald-500/40 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">
                                                R
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">Router Agent</div>
                                                <div className="text-[10px] text-zinc-400">Evaluates Intent & Complexity</div>
                                            </div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-mono">12ms</span>
                                    </div>

                                    <div className="w-0.5 h-4 bg-emerald-500/40 mx-auto" />

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-2 rounded-lg bg-zinc-950/80 border border-teal-500/40 text-left">
                                            <div className="text-[10px] font-semibold text-teal-400">Coder Agent</div>
                                            <div className="text-[10px] text-zinc-400 truncate">Synthesizing React UI</div>
                                            <div className="mt-1 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                                <div className="bg-teal-400 h-full w-4/5 animate-pulse" />
                                            </div>
                                        </div>

                                        <div className="p-2 rounded-lg bg-zinc-950/80 border border-indigo-500/40 text-left">
                                            <div className="text-[10px] font-semibold text-indigo-400">Web Researcher</div>
                                            <div className="text-[10px] text-zinc-400 truncate">Fetching API Specs</div>
                                            <div className="mt-1 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                                <div className="bg-indigo-400 h-full w-full" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-0.5 h-4 bg-teal-500/40 mx-auto" />

                                    <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-purple-500/40 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[11px]">
                                                E
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">Executor Sentinel</div>
                                                <div className="text-[10px] text-zinc-400">Sandboxed Output Verification</div>
                                            </div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 font-mono">Verified</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Live Code Execution & Artifact Stream */}
                            <div className="md:col-span-7 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3 flex flex-col justify-between">
                                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2.5">
                                    <div className="flex items-center gap-2">
                                        <Code2 className="w-4 h-4 text-teal-400" />
                                        <span className="text-xs font-semibold text-zinc-200">Live Swarm Execution Log</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        Streaming Logs
                                    </div>
                                </div>

                                <div className="font-mono text-[11px] space-y-2 bg-zinc-950 p-3.5 rounded-lg border border-zinc-800 text-left text-zinc-300 leading-relaxed overflow-x-auto">
                                    <p className="text-zinc-500"># Initializing multi-agent consensus graph...</p>
                                    <p className="text-emerald-400">
                                        <span className="text-zinc-500">[0.02s]</span> [Router] Dispatched sub-tasks: <code>frontend_builder</code> &amp; <code>api_architect</code>
                                    </p>
                                    <p className="text-teal-300">
                                        <span className="text-zinc-500">[0.08s]</span> [Coder] Generated React component artifact with Framer Motion animations.
                                    </p>
                                    <p className="text-indigo-300">
                                        <span className="text-zinc-500">[0.15s]</span> [Sentinel] Verified safe execution sandbox. 0 security flags raised.
                                    </p>
                                    <p className="text-purple-300">
                                        <span className="text-zinc-500">[0.19s]</span> [Swarm] Rendered live artifact canvas &amp; synced Redux state.
                                    </p>
                                </div>

                                {/* Floating Action Result Mock */}
                                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span className="text-emerald-300 font-medium">Result Artifact Ready: <strong>React Swarm Canvas</strong></span>
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-950 bg-emerald-400 px-2.5 py-1 rounded-md">
                                        Live View
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
