"use client";

import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
    FileCheck, 
    User, 
    AlertCircle, 
    ShoppingCart, 
    Zap, 
    Scale, 
    Ban, 
    ShieldAlert, 
    Gavel,
    History
} from "lucide-react";

const sections = [
    {
        id: "01",
        title: "ACCEPTANCE",
        icon: <FileCheck className="w-5 h-5" />,
        content: "By accessing Bventy, you agree to these Terms. They form a binding contract between you and us. If you do not agree to everything here, you should not use the platform. Simple as that."
    },
    {
        id: "02",
        title: "ELIGIBILITY",
        icon: <User className="w-5 h-5" />,
        content: "Bventy is for adults. You must be at least 18 years old to create an account or use our marketplace. By joining, you represent that you have the legal capacity to enter into this agreement."
    },
    {
        id: "03",
        title: "USER CONDUCT",
        icon: <AlertCircle className="w-5 h-5" />,
        content: "We provide the platform, you provide the conduct. Any attempt to scrape our data, reverse engineer our services, or use Bventy for malicious coordination is a direct breach and will result in permanent suspension."
    },
    {
        id: "04",
        title: "MARKETPLACE",
        icon: <ShoppingCart className="w-5 h-5" />,
        content: "Bventy acts as a facilitator for bookings. While we handle the technical infrastructure, the actual service delivery is governed by the agreement between the Vendor and the Client. We are not responsible for the services rendered."
    },
    {
        id: "05",
        title: "SYNC LIMITATIONS",
        icon: <Zap className="w-5 h-5" />,
        isHighlight: true,
        content: "Our synchronization with 3rd-party services (like Google Calendar) is provided as-is. We strive for 99.9% accuracy, but we are not liable for any missed bookings or scheduling conflicts arising from external API failures or network latency."
    },
    {
        id: "06",
        title: "INTELLECTUAL PROPERTY",
        icon: <Scale className="w-5 h-5" />,
        content: "Our code, design, and branding are ours. Your data and content are yours. We grant you a limited license to use Bventy; you grant us a license to host your content so we can provide our services to you."
    },
    {
        id: "07",
        title: "TERMINATION",
        icon: <Ban className="w-5 h-5" />,
        content: "You can leave at any time. We can also end this relationship if you break the rules. Upon termination, your data is handled as per our Privacy Policy—securely and swiftly purged."
    },
    {
        id: "08",
        title: "DISCLAIMERS",
        icon: <ShieldAlert className="w-5 h-5" />,
        content: "Bventy is provided 'as is' without warranties of any kind. We don't guarantee that the platform will be error-free or uninterrupted. Use it at your own risk, though we work hard to keep it stable."
    },
    {
        id: "09",
        title: "LIABILITY",
        icon: <Scale className="w-5 h-5" />,
        content: "To the maximum extent permitted by law, Bventy shall not be liable for any indirect, incidental, or consequential damages. Our total liability is limited to the amount you've paid us in the last 6 months."
    },
    {
        id: "10",
        title: "GOVERNING LAW",
        icon: <Gavel className="w-5 h-5" />,
        content: "Any disputes arising from these Terms will be governed by the laws of India. We prefer resolving issues through direct communication, but legal proceedings will take place in the competent courts of India."
    },
    {
        id: "11",
        title: "MODIFICATIONS",
        icon: <History className="w-5 h-5" />,
        content: "As Bventy evolves, so will these Terms. We will notify you of major updates. Continued use of the platform after changes constitute your acceptance of the new Terms."
    }
];

export default function TermsOfServicePage() {
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
                        Terms. <br />
                        <span className="text-white/40 italic">The foundation of trust.</span>
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
                                        If you have questions about our terms or need clarification on our policies, we are here to help.
                                    </p>
                                    <div className="space-y-4">
                                        <p className="text-2xl md:text-3xl font-bold tracking-tight text-white selection:bg-white selection:text-black hover:text-white/80 transition-colors">
                                            legal@bventy.in
                                        </p>
                                        <div className="pt-2">
                                            <Link href="/privacy" className="text-white/40 text-sm hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-white">
                                                View Privacy Policy
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
