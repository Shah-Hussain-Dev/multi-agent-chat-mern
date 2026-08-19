import { motion } from 'framer-motion';

export const BrandHeroSection = () => {
    const appName = import.meta.env.VITE_APP_NAME || import.meta.env.APP_NAME || "Agentrix";

    const features = [
        {
            icon: (
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Autonomous Agent Swarms",
            description: "Deploy collaborating AI agents that decompose, execute, and verify complex workflows asynchronously."
        },
        {
            icon: (
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Zero-Trust Security & Redis Sessions",
            description: "Enterprise-grade session isolation, encrypted token transport, and distributed access policies."
        },
        {
            icon: (
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.11a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            title: "Real-Time Context Memory",
            description: "Persistent vector memory and knowledge graph synchronization across your multi-agent cluster."
        }
    ];

    return (
        <div className="relative hidden lg:flex flex-col justify-between py-6 lg:pr-8 xl:pr-12 text-zinc-100 select-none w-full">
            {/* Header / Brand */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-xl shadow-emerald-500/20">
                        <div className="w-full h-full bg-zinc-950 rounded-[15px] flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-white">{appName}</h2>
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Multi-Agent Ecosystem</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Orchestrate Next-Gen <br className="hidden xl:inline" />
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">AI Swarms</span>
                    </h1>
                    <p className="text-zinc-400 text-sm xl:text-base leading-relaxed max-w-xl">
                        Access your distributed agent workspace, monitor real-time microservices, and harness collaborative artificial intelligence.
                    </p>
                </div>
            </div>

            {/* Live Swarm Orchestration Activity Widget */}
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="my-6 p-4 rounded-2xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/90 shadow-xl space-y-3"
            >
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="font-bold text-white tracking-wide uppercase text-[11px]">Live Swarm Pipeline</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded-full border border-zinc-800">Cluster #EU-09</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-emerald-500/30 text-xs space-y-1">
                        <div className="text-[10px] text-emerald-400 font-semibold uppercase">Agent Alpha</div>
                        <div className="text-zinc-200 font-medium truncate text-[11px]">Task Decomposition</div>
                        <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full w-4/5 animate-pulse" />
                        </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-teal-500/30 text-xs space-y-1">
                        <div className="text-[10px] text-teal-400 font-semibold uppercase">Agent Beta</div>
                        <div className="text-zinc-200 font-medium truncate text-[11px]">Parallel Execution</div>
                        <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                            <div className="bg-teal-400 h-full w-3/5 animate-pulse" />
                        </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-950/70 border border-indigo-500/30 text-xs space-y-1">
                        <div className="text-[10px] text-indigo-400 font-semibold uppercase">Agent Gamma</div>
                        <div className="text-zinc-200 font-medium truncate text-[11px]">Output Verification</div>
                        <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                            <div className="bg-indigo-400 h-full w-full" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="space-y-3.5 my-2">
                {features.map((feat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.12 + 0.2, duration: 0.4 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="group relative p-3.5 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 hover:border-emerald-500/40 shadow-lg transition-all duration-300 cursor-default"
                    >
                        <div className="flex items-start gap-3.5">
                            <div className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 group-hover:border-emerald-500/30 transition-colors shrink-0">
                                {feat.icon}
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                                    {feat.title}
                                </h3>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    {feat.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Metrics Ticker & Social Proof */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/60 mt-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/60 backdrop-blur-md">
                        <div className="text-base font-black text-emerald-400">12,400+</div>
                        <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Active Agents</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/60 backdrop-blur-md">
                        <div className="text-base font-black text-teal-400">&lt; 25ms</div>
                        <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Gateway Latency</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/60 backdrop-blur-md">
                        <div className="text-base font-black text-indigo-400">99.99%</div>
                        <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Cluster Uptime</div>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/40 backdrop-blur-md text-xs">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2 overflow-hidden">
                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-zinc-900" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User" />
                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-zinc-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="User" />
                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-zinc-900" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User" />
                        </div>
                        <span className="text-zinc-300 font-medium">Trusted by 2,000+ AI Teams</span>
                    </div>

                    <div className="flex items-center text-amber-400 gap-1 text-[11px] font-semibold">
                        <span>★★★★★</span>
                        <span className="text-zinc-400">4.9/5</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandHeroSection;
