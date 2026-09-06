import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Shield, Users } from 'lucide-react';

const stats = [
    {
        value: "10M+",
        label: "Swarm Tasks Executed",
        description: "Across production microservices",
        icon: <Zap className="w-5 h-5 text-emerald-400" />
    },
    {
        value: "<120ms",
        label: "DAG Routing Latency",
        description: "LangGraph edge resolution",
        icon: <Activity className="w-5 h-5 text-teal-400" />
    },
    {
        value: "99.99%",
        label: "Cluster Uptime",
        description: "Redis pub/sub fault-tolerant mesh",
        icon: <Shield className="w-5 h-5 text-indigo-400" />
    },
    {
        value: "50,000+",
        label: "Swarm Developers",
        description: "Building autonomous AI agents",
        icon: <Users className="w-5 h-5 text-purple-400" />
    }
];

export const MetricsSection: React.FC = () => {
    return (
        <section className="py-16 md:py-24 relative bg-zinc-950/80 border-y border-zinc-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl space-y-2 text-center flex flex-col items-center justify-center"
                        >
                            <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 mb-2">
                                {stat.icon}
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-zinc-300">
                                {stat.label}
                            </div>
                            <div className="text-[11px] text-zinc-400">
                                {stat.description}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default MetricsSection;
