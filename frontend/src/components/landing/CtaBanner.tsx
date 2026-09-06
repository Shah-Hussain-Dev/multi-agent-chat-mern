import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Bot, Shield, Zap } from 'lucide-react';
import { useAppSelector } from '../../redux/store';

export const CtaBanner: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.user);

    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-teal-950/80 border border-emerald-500/30 shadow-2xl overflow-hidden backdrop-blur-2xl text-center space-y-8">
                    
                    {/* Background Glow Spheres */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />

                    <div className="space-y-4 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                            <Bot className="w-3.5 h-3.5" />
                            Autonomous Agent Ecosystem
                        </div>

                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                            Ready to Supercharge Your AI Workflows with Autonomous Swarms?
                        </h2>

                        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
                            Join thousands of developers building next-generation multi-agent applications today.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <Link
                            to={isAuthenticated ? "/chat" : "/auth?mode=register"}
                            className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4 text-zinc-950 group-hover:rotate-12 transition-transform" />
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {!isAuthenticated && (
                            <Link
                                to="/auth?mode=login"
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900/90 border border-zinc-700 hover:border-zinc-600 text-zinc-200 hover:text-white font-semibold text-sm backdrop-blur-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                            >
                                <span>Existing Workspace Login</span>
                            </Link>
                        )}
                    </div>

                    {/* Footer features summary */}
                    <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-400 max-w-xl mx-auto">
                        <div className="flex items-center justify-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-emerald-400" />
                            <span>1,000 Free Executions/mo</span>
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-teal-400" />
                            <span>Zero-Trust Sandbox</span>
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                            <Bot className="w-3.5 h-3.5 text-indigo-400" />
                            <span>LangGraph Node Router</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CtaBanner;
