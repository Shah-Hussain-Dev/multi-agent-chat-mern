import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
    question: string;
    answer: string;
}

const FAQS: FaqItem[] = [
    {
        question: "What makes Agentrix different from standard single-prompt AI tools?",
        answer: "Agentrix deploys collaborative multi-agent swarms using LangGraph topologies. Instead of relying on a single prompt, specialized agents (Router, Coder, Researcher, Sentinel) decompose complex tasks, cross-verify outputs, execute sandboxed code, and render live interactive artifacts in real time."
    },
    {
        question: "How does the LangGraph Router optimize cost and latency?",
        answer: "The LangGraph Router dynamically evaluates task intent and complexity. Simple sub-tasks are routed to ultra-fast micro-models, while complex multi-step reasoning is routed to specialized LLMs. This hybrid DAG routing cuts execution latency by up to 60% and reduces API token costs."
    },
    {
        question: "Can agents safely execute shell commands and code in production?",
        answer: "Yes! All tool calls, shell executions, and code evaluations run inside isolated microservice sandboxes guarded by AST security sentinels. Zero-trust policies ensure code cannot access private host memory or unauthorized networks."
    },
    {
        question: "How are vector memory and session state stored?",
        answer: "Agentrix utilizes high-performance Redis pub/sub for real-time state synchronization paired with vector store persistence (Pinecone/Qdrant). Your swarm agents retain context across sessions while enforcing strict tenant isolation."
    },
    {
        question: "Does Agentrix support Google OAuth & Custom Email Auth?",
        answer: "Yes, Agentrix includes built-in Firebase Google OAuth, custom Email/Password authentication, and encrypted JWT session token management with Redis token revocation."
    },
    {
        question: "Can I stream live UI artifacts to my end users?",
        answer: "Absolutely. The Real-Time Artifact Engine streams rendered React components, mermaid diagrams, markdown reports, and JSON payloads directly to your frontend via WebSockets."
    }
];

export const FaqSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section id="faq" className="py-20 md:py-28 relative bg-zinc-950/60 border-t border-zinc-800/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Frequently Asked Questions
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                        Everything You Need to Know
                    </h2>
                    <p className="text-zinc-400 text-base">
                        Have questions about Agentrix multi-agent swarm architecture? We've got answers.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                                    isOpen
                                        ? 'bg-zinc-900/90 border-emerald-500/50 shadow-xl shadow-emerald-950/20'
                                        : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700'
                                }`}
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                                >
                                    <span className="text-base font-bold text-white">
                                        {faq.question}
                                    </span>
                                    <div className={`p-2 rounded-xl bg-zinc-950 border border-zinc-800 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400' : 'text-zinc-400'}`}>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-5 sm:px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default FaqSection;
