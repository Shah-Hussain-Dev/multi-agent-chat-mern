import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Menu, X, ArrowRight, UserCheck, LogOut } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { clearUser } from '../../redux/userSlice';
import { logoutUser } from '../../features/user';
import showToast from '../../utils/toast';

export const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, user } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const appName = import.meta.env.VITE_APP_NAME || import.meta.env.APP_NAME || "Agentrix";

    const handleNavbarLogout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error("Error logging out:", err);
        }
        dispatch(clearUser());
        showToast.success("Signed Out", "Successfully logged out.");
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Architecture', href: '#architecture' },
        { name: 'Live Playground', href: '#playground' },
        { name: 'SDK & Docs', href: '#sdk' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80 py-3 shadow-2xl shadow-emerald-950/20'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                {/* Logo & Status Indicator */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 p-[1px] shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
                            <Bot className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                                {appName}
                            </span>

                        </div>
                        <span className="text-[10px] text-zinc-400 font-mono hidden md:block">
                            Autonomous Graph Engine
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-1 bg-zinc-900/60 backdrop-blur-md p-1.5 rounded-full border border-zinc-800/70 shadow-inner">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-full transition-all duration-200"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right Action CTA Buttons */}
                <div className="hidden sm:flex items-center gap-3">
                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-full">
                                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                            </span>
                            <button
                                onClick={() => navigate('/chat')}
                                className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
                                <span>Get Started</span>
                            </button>
                            <button
                                onClick={handleNavbarLogout}
                                title="Sign Out"
                                className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-800"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/auth?mode=login"
                                className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-xl transition-all"
                            >
                                Sign In
                            </Link>

                            <Link
                                to="/auth?mode=register"
                                className="group relative px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 transition-all duration-200 overflow-hidden"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-zinc-950 group-hover:rotate-12 transition-transform" />
                                <span>Get Started</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="lg:hidden flex items-center gap-2">
                    <Link
                        to={isAuthenticated ? "/chat" : "/auth?mode=register"}
                        className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 text-zinc-950 sm:hidden"
                    >
                        Get Started
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Navigation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-2xl overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4 max-w-7xl mx-auto">
                            <div className="flex flex-col space-y-2">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 rounded-xl transition-all"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
                                {isAuthenticated ? (
                                    <Link
                                        to="/chat"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-3 text-center text-xs font-bold rounded-xl bg-emerald-500 text-zinc-950"
                                    >
                                        Get Started
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            to="/auth?mode=login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="w-full py-2.5 text-center text-xs font-semibold text-zinc-300 border border-zinc-800 rounded-xl hover:bg-zinc-900"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/auth?mode=register"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="w-full py-2.5 text-center text-xs font-bold text-zinc-950 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl shadow-lg shadow-emerald-500/20"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
