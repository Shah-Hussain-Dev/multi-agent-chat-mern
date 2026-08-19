import { Link } from 'react-router-dom';

const TermsOfService = () => {
    const appName = import.meta.env.VITE_APP_NAME || import.meta.env.APP_NAME || "Agentrix";

    return (
        <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-100 p-4 sm:p-8 md:p-12 overflow-x-hidden font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
            {/* Background Ambient Lighting & Gradients */}
            <div className="fixed -top-40 -left-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-[128px] pointer-events-none" />
            <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-teal-600/15 rounded-full blur-[128px] pointer-events-none" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none" />

            {/* Subtle Grid Overlay */}
            <div 
                className="fixed inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" 
            />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800/80">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-sm font-medium transition-all shadow-sm group"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Auth
                    </Link>

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">{appName} Legal</span>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Terms of Service</h1>
                        <p className="mt-2 text-sm text-zinc-400">
                            Effective Date: August 18, 2026 &bull; Last Updated: August 2026
                        </p>
                    </div>

                    <div className="space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed">
                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-emerald-400">1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using the {appName} platform, services, and associated multi-agent ecosystem APIs, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from accessing or using our services.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-emerald-400">2. Description of Service</h2>
                            <p>
                                {appName} provides an advanced, high-performance Multi-Agent System platform enabling automated tasks, AI workflows, and distributed agent collaboration. We continuously update and refine our service capabilities.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-emerald-400">3. Account Registration & Security</h2>
                            <p>
                                When creating an account on {appName}, you must provide accurate and complete information. You are solely responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-emerald-400">4. Acceptable Use Policy</h2>
                            <p>
                                You agree not to engage in any of the following prohibited activities:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-zinc-400">
                                <li>Using agents to generate, store, or distribute malicious code or harmful content.</li>
                                <li>Attempting to bypass security controls or rate limits on the platform gateway.</li>
                                <li>Reverse engineering or exploiting unauthorized access to underlying agent microservices.</li>
                                <li>Violating any applicable local, national, or international laws or regulations.</li>
                            </ul>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-emerald-400">5. Multi-Agent Ecosystem Disclaimer</h2>
                            <p>
                                AI agent outputs are generated algorithmically. While {appName} strives for precision and safety, outputs should be independently evaluated before deployment in critical environments.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-emerald-400">6. Termination</h2>
                            <p>
                                We reserve the right to suspend or terminate your access to the platform immediately, without prior notice, if you breach any provision of these Terms.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-emerald-400">7. Contact Information</h2>
                            <p>
                                If you have questions regarding these Terms, please contact our support team at <span className="text-emerald-300">support@{appName.toLowerCase()}.dev</span>.
                            </p>
                        </section>
                    </div>

                    <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-4">
                        <p>&copy; 2026 {appName} Multi-Agent Systems. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                            <Link to="/" className="hover:text-emerald-400 transition-colors">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
