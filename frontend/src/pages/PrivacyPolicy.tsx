import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    const appName = import.meta.env.VITE_APP_NAME || import.meta.env.APP_NAME || "Agentrix";

    return (
        <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-100 p-4 sm:p-8 md:p-12 overflow-x-hidden font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
            {/* Background Ambient Lighting & Gradients */}
            <div className="fixed -top-40 -left-40 w-96 h-96 bg-teal-600/15 rounded-full blur-[128px] pointer-events-none" />
            <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-[128px] pointer-events-none" />
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
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                        <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">{appName} Privacy</span>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
                        <p className="mt-2 text-sm text-zinc-400">
                            Effective Date: August 18, 2026 &bull; Last Updated: August 2026
                        </p>
                    </div>

                    <div className="space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed">
                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-teal-400">1. Information We Collect</h2>
                            <p>
                                At {appName}, we collect information necessary to provide and secure our multi-agent services:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-zinc-400">
                                <li><strong className="text-zinc-200">Account Data:</strong> Name, email address, password hash, avatar, and authentication provider details (e.g. Google OAuth tokens).</li>
                                <li><strong className="text-zinc-200">Session & Usage Data:</strong> HTTP-only cookies, Redis session tokens, IP address, and interaction metrics.</li>
                                <li><strong className="text-zinc-200">Agent Telemetry:</strong> Anonymized interaction logs for performance optimization and debugging.</li>
                            </ul>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-teal-400">2. How We Use Information</h2>
                            <p>
                                We utilize collected data strictly for providing services, managing secure sessions, routing agent workflows, preventing unauthorized access, and communicating platform updates.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-teal-400">3. Cookies & Session Storage</h2>
                            <p>
                                We use secure, HTTP-only cookies (`session_id`) to maintain authenticated states across gateway requests. We do not track your activity across unrelated third-party websites.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-teal-400">4. Third-Party Integrations</h2>
                            <p>
                                When using Google Sign-In, authentication credentials are processed in accordance with Google's Privacy Policy. We do not sell your personal information to third parties.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-teal-400">5. Data Security</h2>
                            <p>
                                Your data is protected using industry-standard measures, including salted bcrypt password hashing, encrypted TLS transport, and Redis-backed session invalidation upon logout.
                            </p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-lg font-semibold text-teal-400">6. Your Rights</h2>
                            <p>
                                You have the right to inspect, update, or request the deletion of your account and associated personal data at any time by contacting privacy@{appName.toLowerCase()}.dev.
                            </p>
                        </section>
                    </div>

                    <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-4">
                        <p>&copy; 2026 {appName} Multi-Agent Systems. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link to="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
                            <Link to="/" className="hover:text-teal-400 transition-colors">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
