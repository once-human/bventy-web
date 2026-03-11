"use client";

import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
    Shield, 
    Lock, 
    Eye, 
    UserCheck, 
    Database, 
    Globe, 
    Mail, 
    Clock, 
    RefreshCw, 
    FileText,
    Settings,
    UserMinus,
    Cookie
} from "lucide-react";

const sections = [
    {
        id: "01",
        title: "OUR PHILOSOPHY",
        icon: <Shield className="w-5 h-5" />,
        content: "We take your privacy seriously because we are users too. Our approach is simple: your data belongs to you. We only collect what is essential, keep it only as long as necessary, and protect it as if it were our own."
    },
    {
        id: "02",
        title: "DATA CONTROLLER",
        icon: <UserCheck className="w-5 h-5" />,
        content: "Bventy acts as the primary data controller. We manage your information with internal protocols designed to minimize exposure and maximize security. No marketing teams, no data brokers—just code and care."
    },
    {
        id: "03",
        title: "IDENTITY DATA",
        icon: <UserCheck className="w-5 h-5" />,
        content: "We collect your name, email address, and profile details to establish a trusted connection between you and the vendors or organizers you interact with. This data is never sold or rented."
    },
    {
        id: "04",
        title: "TECHNICAL LOGGING",
        icon: <Database className="w-5 h-5" />,
        content: "Basic technical identifiers like IP addresses and browser fingerprints are logged temporarily to maintain system stability, prevent fraud, and optimize our global infrastructure performance."
    },
    {
        id: "05",
        title: "GOOGLE ECOSYSTEM",
        icon: <Globe className="w-5 h-5" />,
        isHighlight: true,
        content: "Bventy's use and transfer of information received from Google APIs will adhere to the Google API Service User Data Policy, including the Limited Use requirements. We only access your calendar to synchronize availability, ensuring your scheduling is seamless. Your Google data is never used for advertising, profiling, or third-party marketing."
    },
    {
        id: "06",
        title: "ANALYTICS STACK",
        icon: <Eye className="w-5 h-5" />,
        content: "We use PostHog Cloud and Umami Cloud for privacy-first analytics. We route traffic through our own secure proxies to strip identifiable markers before they reach third-party servers. Your IP is always anonymized."
    },
    {
        id: "07",
        title: "SAFEGUARDING",
        icon: <Lock className="w-5 h-5" />,
        content: "We employ TLS 1.3 for data in transit and AES-256 hardware encryption for data at rest. Our production environments are air-gapped from internal development networks to prevent accidental leaks."
    },
    {
        id: "08",
        title: "INFRASTRUCTURE",
        icon: <Globe className="w-5 h-5" />,
        content: "Our core data resides in Neon (PostgreSQL) and Cloudflare R2 (Media). These providers are selected for their rigorous security compliance (SOC2 Type II) and global availability."
    },
    {
        id: "09",
        title: "RETENTION POLICY",
        icon: <Clock className="w-5 h-5" />,
        content: "Personal data is retained only as long as your account is active. Upon deletion, we purge all identifiable records within 30 days, retaining only anonymized transaction logs required for tax compliance."
    },
    {
        id: "10",
        title: "COOKIE USAGE",
        icon: <Cookie className="w-5 h-5" />,
        content: "We use essential cookies to maintain your session and security context. We do not use third-party tracking cookies or advertising pixels. Your digital footprint remains yours alone."
    },
    {
        id: "11",
        title: "USER RIGHTS",
        icon: <Settings className="w-5 h-5" />,
        content: "You have the right to access, rectify, or export your data at any time. Our dashboard provides 1-click tools for data portability, allowing you to take your information wherever you choose."
    },
    {
        id: "12",
        title: "DATA ERASURE",
        icon: <UserMinus className="w-5 h-5" />,
        content: "The 'Right to be Forgotten' is a core feature, not a request. Deleting your account triggers an automated workflow that wipes your profile, media, and analytics history from our stack."
    },
    {
        id: "13",
        title: "CHILDREN'S PRIVACY",
        icon: <Shield className="w-5 h-5" />,
        content: "Bventy is designed for adults (18+). We do not knowingly collect data from minors. If such data is discovered, it is purged immediately without exception."
    },
    {
        id: "14",
        title: "INTERNATIONAL DATA",
        icon: <Globe className="w-5 h-5" />,
        content: "As a global platform, your data may be processed in various secure regions. We ensure all cross-border transfers comply with standard contractual clauses (SCCs) and high encryption standards."
    },
    {
        id: "15",
        title: "POLICY REVISIONS",
        icon: <RefreshCw className="w-5 h-5" />,
        content: "We update this policy as we ship new features. Major changes are announced via email. Your continued use of Bventy constitutes acceptance of these evolving transparency standards."
    }
];

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-white px-6 py-12 md:py-24 flex justify-center selection:bg-white selection:text-black antialiased">
            <div className="max-w-4xl w-full">
                <div className="mb-16">
                    <Link
                        href="/"
                        className="text-white/40 hover:text-white transition-all duration-300 text-sm font-medium tracking-tight flex items-center gap-2 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> Back to Home
                    </Link>
                </div>

                <header className="mb-24 space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                        Privacy. <br />
                        <span className="text-white/40 italic">Open and transparent.</span>
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono uppercase tracking-widest pt-4">
                        <p>Updated: March 11, 2026</p>
                        <span className="hidden md:block text-white/10">•</span>
                        <p>Version 2.3.0</p>
                    </div>
                </header>

                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <motion.section 
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-8 rounded-3xl border transition-all duration-500 ${
                                section.isHighlight 
                                ? 'bg-white/5 border-white/20 shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)]' 
                                : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-2 rounded-xl ${section.isHighlight ? 'bg-white/10 text-white' : 'bg-white/5 text-white/40'}`}>
                                    {section.icon}
                                </div>
                                <h2 className="text-xs uppercase tracking-[0.25em] text-white/40 font-black">
                                    {section.id} / {section.title}
                                </h2>
                            </div>
                            <p className={`leading-relaxed text-white/70 ${section.isHighlight ? 'text-lg md:text-xl font-medium text-white/90' : 'text-base'}`}>
                                {section.content}
                            </p>
                        </motion.section>
                    ))}

                    {/* Final Footer Section */}
                    <section className="pt-32 border-t border-white/10 pb-20 mt-20">
                        <div className="grid md:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Contact Us</h2>
                                <div className="space-y-6">
                                    <p className="text-white/50 text-base leading-relaxed max-w-sm">
                                        If you have questions about our privacy standards or wish to exercise your data rights, our team is ready to assist.
                                    </p>
                                    <div className="space-y-4">
                                        <p className="text-2xl md:text-3xl font-bold tracking-tight text-white selection:bg-white selection:text-black hover:text-white/80 transition-colors">
                                            legal@bventy.in
                                        </p>
                                        <div className="pt-2">
                                            <Link href="/terms" className="text-white/40 text-sm hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-white">
                                                View Terms of Service
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end md:items-end space-y-4">
                                <p className="text-white/50 text-sm">© {new Date().getFullYear()} Bventy. All rights reserved.</p>
                                <p className="text-white/20 text-xs font-mono uppercase tracking-[0.4em]">DESIGNED IN INDIA</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
