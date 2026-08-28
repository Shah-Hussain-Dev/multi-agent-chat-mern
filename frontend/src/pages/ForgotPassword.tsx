import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/axios';
import showToast from '../utils/toast';
import Auth3DBackground from '../components/common/Auth3DBackground';

type ResetStep = 1 | 2 | 3;

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [step, setStep] = useState<ResetStep>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form fields
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Dev preview code received from backend
    const [devCode, setDevCode] = useState<string | null>(null);

    // Countdown for redirect upon success
    const [countdown, setCountdown] = useState(5);

    const appName = import.meta.env.VITE_APP_NAME || "Agentrix";

    // Auto-fill from query params if coming via reset link (e.g. /forgot-password?email=...&code=...)
    useEffect(() => {
        const queryEmail = searchParams.get('email');
        const queryCode = searchParams.get('code');
        if (queryEmail) setEmail(queryEmail);
        if (queryCode) {
            setCode(queryCode);
            setStep(2);
        }
    }, [searchParams]);

    // Handle Countdown on Step 3
    useEffect(() => {
        if (step === 3 && countdown > 0) {
            const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (step === 3 && countdown === 0) {
            navigate('/');
        }
    }, [step, countdown, navigate]);

    // Password strength calculation helper
    const getPasswordStrength = (pass: string) => {
        let score = 0;
        if (!pass) return { score: 0, label: '', color: 'bg-zinc-800', textColor: 'text-zinc-400' };
        if (pass.length >= 6) score += 1;
        if (pass.length >= 10) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        if (score <= 2) return { score: 33, label: 'Weak', color: 'bg-red-500', textColor: 'text-red-400' };
        if (score <= 4) return { score: 66, label: 'Good', color: 'bg-amber-500', textColor: 'text-amber-400' };
        return { score: 100, label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-400' };
    };

    const strength = getPasswordStrength(newPassword);

    // Step 1: Request Reset Code
    const handleRequestCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post("/auth/forgot-password", { email });
            showToast.success("Verification Code Sent", "Check your email for the 6-digit code.");
            
            // Capture dev code if returned by backend API
            if (response.data?.data?.resetCode) {
                setDevCode(response.data.data.resetCode);
                setCode(response.data.data.resetCode); // Pre-fill for convenience
            }
            
            setStep(2);
        } catch (err: any) {
            console.error("Error sending reset code:", err);
            const errMsg = err?.response?.data?.message || "Failed to send reset code. Please check your email and try again.";
            setError(errMsg);
            showToast.error("Request Failed", errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2: Reset Password
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim() || !newPassword || !confirmPassword) {
            setError("Please complete all required fields.");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match. Please re-enter.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post("/auth/reset-password", {
                email,
                code,
                newPassword,
            });
            showToast.success("Password Updated!", "Your new password has been set successfully.");
            console.log("Password reset response:", response.data);
            setStep(3);
        } catch (err: any) {
            console.error("Error resetting password:", err);
            const errMsg = err?.response?.data?.message || "Invalid code or failed to reset password.";
            setError(errMsg);
            showToast.error("Reset Failed", errMsg);
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

            {/* Main Centered Container */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full max-w-md bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-emerald-950/20 my-6"
            >
                {/* Header Badge & Title */}
                <div className="flex flex-col items-center text-center space-y-3.5 mb-6">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20">
                        <div className="w-full h-full bg-zinc-950 rounded-[15px] flex items-center justify-center">
                            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold tracking-wide uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Account Security
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                            {step === 1 && "Forgot Password?"}
                            {step === 2 && "Generate New Password"}
                            {step === 3 && "Password Reset Complete!"}
                        </h1>
                        <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                            {step === 1 && "Enter your registered email address to receive a secure verification code."}
                            {step === 2 && `Enter the 6-digit code sent to ${email} and set your new password.`}
                            {step === 3 && "Your account credentials have been updated securely."}
                        </p>
                    </div>
                </div>

                {/* Multi-Step Indicator Bar */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-emerald-400' : 'w-2 bg-zinc-700'}`} />
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-emerald-400' : 'w-2 bg-zinc-700'}`} />
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 3 ? 'w-8 bg-emerald-400' : 'w-2 bg-zinc-700'}`} />
                </div>

                {/* Error Banner */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5"
                    >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </motion.div>
                )}

                {/* Step 1: Enter Email */}
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.form
                            key="step1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            onSubmit={handleRequestCode}
                            className="space-y-4"
                        >
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
                                        placeholder="name@company.com"
                                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-semibold rounded-xl text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Sending Code...
                                    </span>
                                ) : (
                                    <>
                                        <span>Send Verification Code</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            <div className="pt-2 text-center">
                                <Link
                                    to="/"
                                    className="text-xs text-zinc-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Sign In
                                </Link>
                            </div>
                        </motion.form>
                    )}

                    {/* Step 2: Verify Code & Set Password */}
                    {step === 2 && (
                        <motion.form
                            key="step2"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            onSubmit={handleResetPassword}
                            className="space-y-4"
                        >
                            {/* Dev Preview Notice if resetCode available */}
                            {devCode && (
                                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
                                    <span>Dev Reset Code: <strong className="font-mono text-white bg-zinc-800 px-2 py-0.5 rounded">{devCode}</strong></span>
                                    <button
                                        type="button"
                                        onClick={() => setCode(devCode)}
                                        className="text-[11px] underline hover:text-emerald-300"
                                    >
                                        Auto-fill
                                    </button>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">6-Digit Verification Code</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="e.g. 849201"
                                    className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-xl text-sm font-mono tracking-widest text-center text-emerald-400 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 pr-10 bg-zinc-950/60 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-200"
                                    >
                                        {showPassword ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.05 10.05 0 013.682-.787c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21m-4.225-4.225L3 3" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Meter */}
                                {newPassword && (
                                    <div className="space-y-1 pt-1">
                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-zinc-400">Strength</span>
                                            <span className={`font-semibold ${strength.textColor}`}>{strength.label}</span>
                                        </div>
                                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${strength.color} transition-all duration-300`}
                                                style={{ width: `${strength.score}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-medium text-zinc-300">Confirm New Password</label>
                                    {confirmPassword && newPassword && (
                                        <span className={`text-[11px] font-semibold ${newPassword === confirmPassword ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {newPassword === confirmPassword ? '✓ Passwords Match' : '✕ Passwords Do Not Match'}
                                        </span>
                                    )}
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all duration-200"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-semibold rounded-xl text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Updating Password...
                                    </span>
                                ) : (
                                    <span>Generate & Save Password</span>
                                )}
                            </button>

                            <div className="flex items-center justify-between pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                                >
                                    Change Email
                                </button>
                                <Link
                                    to="/"
                                    className="text-xs text-zinc-400 hover:text-emerald-400 transition-colors"
                                >
                                    Cancel & Sign In
                                </Link>
                            </div>
                        </motion.form>
                    )}

                    {/* Step 3: Celebration & Redirect */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-5 py-4"
                        >
                            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                    <svg className="w-8 h-8 text-zinc-950 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-white">Password Updated Successfully</h3>
                                <p className="text-xs text-zinc-400">
                                    Redirecting to sign in page in <span className="text-emerald-400 font-bold">{countdown}</span> seconds...
                                </p>
                            </div>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl text-xs border border-zinc-700/60 shadow-md transition-all duration-200 cursor-pointer"
                            >
                                Sign In Now
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
