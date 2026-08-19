import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
import api from '../utils/axios';
import showToast from '../utils/toast';
import Auth3DBackground from './common/Auth3DBackground';

type AuthMode = 'login' | 'register';

const LoginWithGoogle = () => {
    const [mode, setMode] = useState<AuthMode>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form inputs state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Retrieve app name from environment variables with fallback
    const appName = import.meta.env.VITE_APP_NAME || import.meta.env.APP_NAME || "Agentrix";

    // Handle Google OAuth login
    const googleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await signInWithPopup(auth, googleProvider);
            const token = await data.user.getIdToken();
            const response = await api.post("/auth/login", { token });
            showToast.success(
                `Welcome to ${appName}!`, 
                `Successfully signed in as ${data.user.displayName || data.user.email}`
            );
            console.log("Google Login success:", response.data);
        } catch (err: any) {
            console.error("Error logging in with Google", err);
            if (err?.code !== 'auth/popup-closed-by-user') {
                const errMsg = err?.response?.data?.message || err?.message || "Google authentication failed. Please try again.";
                setError(errMsg);
                showToast.error("Sign in failed", errMsg);
            } else {
                showToast.info("Sign in cancelled", "Popup was closed before completing.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Email & Password Login
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in both email and password.");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post("/auth/login-email", { email, password });
            showToast.success(`Welcome back!`, `Successfully signed in as ${response.data.user.name || response.data.user.email}`);
            console.log("Email Login success:", response.data);
        } catch (err: any) {
            console.error("Error in email login:", err);
            const errMsg = err?.response?.data?.message || "Invalid email or password. Please try again.";
            setError(errMsg);
            showToast.error("Sign in failed", errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Email & Password Register
    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Please complete all required fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post("/auth/register", { name, email, password });
            showToast.success(`Account Created!`, `Welcome to ${appName}, ${response.data.user.name}!`);
            console.log("Registration success:", response.data);
        } catch (err: any) {
            console.error("Error in email registration:", err);
            const errMsg = err?.response?.data?.message || "Registration failed. Please try again.";
            setError(errMsg);
            showToast.error("Registration failed", errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
            {/* Interactive 3D Canvas Background */}
            <Auth3DBackground />

            {/* Background Ambient Lighting & Gradients */}
            <div className="fixed -top-40 -left-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-teal-600/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none" />

            {/* Subtle Grid Overlay */}
            <div 
                className="fixed inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" 
            />

            {/* Main Centered Auth Container */}
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full max-w-md bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-emerald-950/20 my-6"
            >
                {/* Top Logo & Header */}
                <div className="flex flex-col items-center text-center space-y-3.5 mb-6">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20">
                        <div className="w-full h-full bg-zinc-950 rounded-[15px] flex items-center justify-center">
                            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold tracking-wide uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Multi-Agent Ecosystem
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            {appName}
                        </h1>
                        <p className="text-xs text-zinc-400 max-w-xs">
                            {mode === 'login' 
                                ? "Sign in to access your swarm control workspace." 
                                : "Create your account to deploy autonomous agents."}
                        </p>
                    </div>
                </div>

                {/* Segmented Mode Selector Tabs */}
                <div className="p-1 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl flex items-center mb-6 relative">
                    <button
                        type="button"
                        onClick={() => { setMode('login'); setError(null); }}
                        className={`relative z-10 flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                            mode === 'login' 
                                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/60' 
                                : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => { setMode('register'); setError(null); }}
                        className={`relative z-10 flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                            mode === 'register' 
                                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/60' 
                                : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        Create Account
                    </button>
                </div>

                {/* Error Banner */}
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5"
                    >
                        <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </motion.div>
                )}

                {/* Animated Form Fields */}
                <AnimatePresence mode="wait">
                    <motion.form 
                        key={mode}
                        initial={{ opacity: 0, x: mode === 'login' ? -12 : 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: mode === 'login' ? 12 : -12 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={mode === 'login' ? handleEmailLogin : handleEmailRegister} 
                        className="space-y-4"
                    >
                        {mode === 'register' && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Jane Doe"
                                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-300">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@domain.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-medium text-zinc-300">Password</label>
                                {mode === 'login' && (
                                    <button 
                                        type="button"
                                        onClick={() => showToast.info("Password Reset", "Contact your administrator or sign in with Google.")} 
                                        className="text-xs text-emerald-400 hover:underline cursor-pointer"
                                    >
                                        Forgot?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-2.5 bg-zinc-950/70 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.682-.782c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.092-2.122a3 3 0 10-4.243-4.243" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 flex items-center justify-center gap-2 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:opacity-90 rounded-xl font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-3"
                        >
                            {isLoading ? (
                                <svg className="w-5 h-5 animate-spin text-zinc-950" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <span>{mode === 'login' ? "Sign In with Email" : "Create Account"}</span>
                            )}
                        </button>
                    </motion.form>
                </AnimatePresence>

                {/* Divider */}
                <div className="relative my-6 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-800/80" />
                    </div>
                    <span className="relative px-3 bg-zinc-900 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                        Or continue with
                    </span>
                </div>

                {/* Google OAuth Action Button */}
                <div>
                    <button
                        type="button"
                        onClick={googleLogin}
                        disabled={isLoading}
                        className="group relative w-full h-11 flex items-center justify-center gap-3 px-6 bg-zinc-800 hover:bg-zinc-700/80 active:bg-zinc-800 border border-zinc-700/60 hover:border-zinc-600 rounded-xl font-medium text-zinc-100 shadow-md hover:shadow-emerald-500/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden text-sm"
                    >
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000" />

                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        <span className="font-semibold tracking-wide">
                            Continue with Google
                        </span>
                    </button>
                </div>

                {/* Feature Pills */}
                <div className="mt-6 pt-5 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center text-[11px] text-zinc-400">
                    <div className="p-2 rounded-lg bg-zinc-950/40 border border-zinc-800/50">
                        ⚡ Fast AI
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-950/40 border border-zinc-800/50">
                        🔒 Secure
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-950/40 border border-zinc-800/50">
                        🤖 Multi-Agent
                    </div>
                </div>

                {/* Legal Links Footer */}
                <p className="mt-5 text-center text-xs text-zinc-500 leading-relaxed">
                    By signing in, you agree to {appName}'s{" "}
                    <Link to="/terms" className="underline hover:text-emerald-400 transition-colors font-medium">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="underline hover:text-emerald-400 transition-colors font-medium">
                        Privacy Policy
                    </Link>.
                </p>
            </motion.div>
        </div>
    );
};

export default LoginWithGoogle;
