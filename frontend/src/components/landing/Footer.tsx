import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Disc as Discord, Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
    const appName = import.meta.env.VITE_APP_NAME || import.meta.env.APP_NAME || "Agentrix";

    return (
        <footer className="bg-zinc-950 border-t border-zinc-800/80 pt-16 pb-12 text-zinc-400 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    
                    {/* Brand Col */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px]">
                                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-emerald-400" />
                                </div>
                            </div>
                            <span className="text-xl font-black text-white">{appName}</span>
                        </Link>

                        <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                            Autonomous Multi-Agent Swarm Orchestration Platform. Deploy collaborating AI agents with LangGraph routing, sandboxed tool execution, and live streaming UI artifacts.
                        </p>

                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 w-fit">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>All Swarm Systems Operational</span>
                        </div>
                    </div>

                    {/* Links Col 1: Product */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">Product</h4>
                        <ul className="space-y-2 text-xs">
                            <li><a href="#features" className="hover:text-emerald-400 transition-colors">LangGraph Router</a></li>
                            <li><a href="#playground" className="hover:text-emerald-400 transition-colors">Live Playground</a></li>
                            <li><a href="#architecture" className="hover:text-emerald-400 transition-colors">Swarm Topology</a></li>
                            <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing Plans</a></li>
                        </ul>
                    </div>

                    {/* Links Col 2: Developers */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">Developers</h4>
                        <ul className="space-y-2 text-xs">
                            <li><a href="#sdk" className="hover:text-emerald-400 transition-colors">TypeScript SDK</a></li>
                            <li><a href="#sdk" className="hover:text-emerald-400 transition-colors">Python SDK</a></li>
                            <li><a href="#sdk" className="hover:text-emerald-400 transition-colors">REST OpenAPI Spec</a></li>
                            <li><Link to="/chat" className="hover:text-emerald-400 transition-colors">Chat Workspace</Link></li>
                        </ul>
                    </div>

                    {/* Links Col 3: Legal & Security */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal &amp; Trust</h4>
                        <ul className="space-y-2 text-xs">
                            <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                            <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Security Sandboxes</a></li>
                            <li><a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} {appName} Inc. All rights reserved.</p>

                    <div className="flex items-center gap-4 text-zinc-400">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                            <Globe className="w-4 h-4" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                            <Share2 className="w-4 h-4" />
                        </a>
                        <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                            <Discord className="w-4 h-4" />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
