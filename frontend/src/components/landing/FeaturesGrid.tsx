import React from 'react';
import { motion } from 'framer-motion';
import { 
    GitBranch, 
    Bot, 
    Sparkles, 
    Database, 
    ShieldCheck, 
    Activity, 
    Cpu, 
    ArrowUpRight
} from 'lucide-react';

const features = [
    {
        icon: <GitBranch className="w-6 h-6 text-emerald-400" />,
        title: "LangGraph Intent Router",
        description: "Intelligently analyzes incoming prompts, constructs execution DAGs, and dispatches sub-tasks to specialized domain agents.",
        badge: "Graph DAG Engine",
        color: "from-emerald-500/20 to-teal-500/5 border-emerald-500/30"
    },
    {
        icon: <Bot className="w-6 h-6 text-teal-400" />,
        title: "Multi-Agent Swarm Mesh",
        description: "Agents collaborate asynchronously: Coder Agents write logic, Security Sentinels verify ASTs, and Tester Agents validate outputs.",
        badge: "Consensus Mesh",
        color: "from-teal-500/20 to-cyan-500/5 border-teal-500/30"
    },
    {
        icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
        title: "Real-Time Artifact Canvas",
        description: "Renders live React components, interactive HTML previews, mermaid flowcharts, and markdown documents directly in stream.",
        badge: "Live React Preview",
        color: "from-indigo-500/20 to-purple-500/5 border-indigo-500/30"
    },
    {
        icon: <Database className="w-6 h-6 text-cyan-400" />,
        title: "Vector Memory & Redis State",
        description: "Persistent cross-session memory with high-speed Redis indexing and Pinecone/Qdrant vector embeddings for continuous context.",
        badge: "Persistent Recall",
        color: "from-cyan-500/20 to-blue-500/5 border-cyan-500/30"
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
        title: "Zero-Trust Enterprise Sandbox",
        description: "Isolates tool calls, terminal commands, and API execution inside secure, gRPC-gated microservices for maximum safety.",
        badge: "Isolated Sandboxes",
        color: "from-emerald-500/20 to-indigo-500/5 border-emerald-500/30"
    },
    {
        icon: <Activity className="w-6 h-6 text-purple-400" />,
        title: "Trace Graph & Telemetry",
        description: "Gain complete transparency into agent decision trees, latency per graph step, token consumption, and step-by-step debug traces.",
        badge: "Full Observability",
        color: "from-purple-500/20 to-teal-500/5 border-purple-500/30"
    }
];

export const FeaturesGrid: React.FC = () => {
    return (
        <section id="features" className="py-20 md:py-28 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                        <Cpu className="w-3.5 h-3.5" />
                        Next-Gen Capability Matrix
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                        Built for Scalable Autonomous Swarms
                    </h2>
                    <p className="text-zinc-400 text-base leading-relaxed">
                        Agentrix bridges high-level AI reasoning with low-level execution sandboxes, offering everything you need to deploy production-grade multi-agent swarms.
                    </p>
                </div>

                {/* Grid of 6 Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -4 }}
                            className={`group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b ${feat.color} bg-zinc-950/80 backdrop-blur-xl border shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300 flex flex-col justify-between`}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform duration-300">
                                        {feat.icon}
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 text-[11px] font-mono font-medium">
                                        {feat.badge}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                                    {feat.title}
                                </h3>

                                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                    {feat.description}
                                </p>
                            </div>

                            <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-emerald-400 transition-colors">
                                <span>Learn architectural details</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturesGrid;
