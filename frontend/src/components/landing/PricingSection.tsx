import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

export const PricingSection: React.FC = () => {
    const [annual, setAnnual] = useState(true);

    const plans = [
        {
            name: "Developer Free",
            priceMonthly: "$0",
            priceAnnual: "$0",
            period: "forever free",
            description: "Ideal for individual developers exploring multi-agent workflows.",
            badge: "Starter",
            popular: false,
            cta: "Get Started Free",
            ctaLink: "/auth?mode=register",
            features: [
                "1,000 Swarm Executions / mo",
                "Up to 3 Active Agent Nodes",
                "Standard LangGraph Router",
                "Public Sandbox Sandbox",
                "Community Discord Support"
            ]
        },
        {
            name: "Pro Swarm",
            priceMonthly: "$29",
            priceAnnual: "$23",
            period: "per month",
            description: "For teams and startups building production-grade autonomous agent pipelines.",
            badge: "Most Popular",
            popular: true,
            cta: "Deploy Pro Swarm",
            ctaLink: "/auth?mode=register",
            features: [
                "50,000 Swarm Executions / mo",
                "Unlimited Custom Agent Nodes",
                "Priority LangGraph Routing (<60ms)",
                "Persistent Redis & Vector Memory",
                "Real-time Live Artifact Stream",
                "Zero-Trust Enterprise Sandbox",
                "Priority Email & Chat Support"
            ]
        },
        {
            name: "Enterprise",
            priceMonthly: "Custom",
            priceAnnual: "Custom",
            period: "tailored SLA",
            description: "Dedicated swarm infrastructure, self-hosting, and compliance for enterprise.",
            badge: "Enterprise",
            popular: false,
            cta: "Contact Enterprise Team",
            ctaLink: "/auth?mode=register",
            features: [
                "Unlimited Swarm Executions",
                "Dedicated On-Premise / VPC Nodes",
                "Custom Agent Fine-Tuning & Plugins",
                "SOC2 & HIPAA Compliance Isolation",
                "99.99% Guaranteed SLA",
                "24/7 Dedicated Solutions Engineer"
            ]
        }
    ];

    return (
        <section id="pricing" className="py-20 md:py-28 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Transparent Pricing
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                        Flexible Plans for Every Agent Swarm
                    </h2>
                    <p className="text-zinc-400 text-base leading-relaxed">
                        Start free, scale seamlessly as your autonomous agent workflows grow.
                    </p>

                    {/* Monthly / Annual Toggle Switch */}
                    <div className="pt-4 flex items-center justify-center gap-3">
                        <span className={`text-xs font-semibold ${!annual ? 'text-white' : 'text-zinc-500'}`}>
                            Monthly Billing
                        </span>
                        <button
                            type="button"
                            onClick={() => setAnnual(!annual)}
                            className="relative w-14 h-8 rounded-full bg-zinc-900 border border-zinc-700 p-1 transition-colors cursor-pointer"
                        >
                            <div
                                className={`w-6 h-6 rounded-full bg-emerald-400 shadow-md transition-transform duration-200 ${
                                    annual ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            />
                        </button>
                        <span className={`text-xs font-semibold flex items-center gap-1.5 ${annual ? 'text-white' : 'text-zinc-500'}`}>
                            Annual Billing
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                                Save 20%
                            </span>
                        </span>
                    </div>
                </div>

                {/* 3 Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.12 }}
                            className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                                plan.popular
                                    ? 'bg-zinc-900/90 border-2 border-emerald-500/80 shadow-2xl shadow-emerald-950/40 scale-105 z-10'
                                    : 'bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 text-[11px] font-black uppercase tracking-wider shadow-md">
                                    🌟 Recommended for Swarms
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px] font-mono">
                                            {plan.badge}
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-normal">{plan.description}</p>
                                </div>

                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                                        {annual ? plan.priceAnnual : plan.priceMonthly}
                                    </span>
                                    <span className="text-xs text-zinc-400 font-medium">{plan.period}</span>
                                </div>

                                <div className="space-y-3 pt-2 border-t border-zinc-800/80">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                                        What's Included:
                                    </span>
                                    {plan.features.map((feat, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8">
                                <Link
                                    to={plan.ctaLink}
                                    className={`w-full py-3.5 px-6 rounded-2xl text-center font-bold text-xs transition-all duration-200 block shadow-lg cursor-pointer ${
                                        plan.popular
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 shadow-emerald-500/25'
                                            : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white'
                                    }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PricingSection;
