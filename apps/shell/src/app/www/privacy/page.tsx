"use client";

import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";

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

                <div className="space-y-4 mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Privacy. <span className="text-white/40 italic font-normal">Open and transparent.</span>
                    </h1>
                    <p className="text-white/50 font-medium">Last updated: March 11, 2026</p>
                </div>

                <p className="text-white/70 text-xl leading-relaxed mb-24">
                    We take your privacy seriously because we are users too. Our approach is simple: your data belongs to you. We only collect what is essential, keep it only as long as necessary, and protect it as if it were our own.
                </p>

                <div className="space-y-24">

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            1. Data Controller & Philosophy
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy acts as the primary data controller. We manage your information with internal protocols designed to minimize exposure and maximize security. No marketing teams, no data brokers—just code and care.
                            </p>
                            <p>
                                We collect your name, email address, and profile details to establish a trusted connection between you and the vendors or organizers you interact with. This data is never sold or rented.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            2. Google API Services & Data Protection
                        </h2>
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                            <p className="text-white/70 leading-relaxed">
                                When you choose to integrate Bventy with Google Calendar, we access specific data to enable synchronization features.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs shrink-0 font-bold">1</div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Minimal Scopes.</span> We only request access to your calendar events and email address to manage availability and verify your identity.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs shrink-0 font-bold">2</div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Limited Use.</span> Bventy's use and transfer to any other app of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy#limited-use" className="underline hover:text-white transition-colors">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs shrink-0 font-bold">3</div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Data Integrity.</span> We do not use your Google data for advertising products or services, nor do we sell it to third party providers.</p>
                                </li>
                            </ul>
                            
                            <div className="pt-6 border-t border-white/10 mt-6">
                                <h3 className="text-white font-medium mb-3">Commitment to Security</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Security procedures are in place to protect the confidentiality of your data. We use industry standard encryption to protect your information, including TLS 1.3 for data in transit and AES-256 for data at rest within our infrastructure.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            3. Analytics and Operational Metrics
                        </h2>
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-8">
                            <div className="space-y-4 text-white/70 leading-relaxed text-sm">
                                <p>
                                    To maintain the health and performance of our platform, we use internal tools and privacy-first analytics (PostHog Cloud and Umami Cloud) to understand how Bventy is functioning.
                                </p>
                                <p>
                                    We route technical telemetry through our own secure proxies to strip identifiable markers before they reach third-party servers. Your IP is always anonymized.
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <h4 className="text-white font-medium mb-2">Service Integrity</h4>
                                    <p className="text-sm text-white/50">Basic technical identifiers like IP addresses and browser fingerprints are logged temporarily to maintain system stability and prevent fraud.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <h4 className="text-white font-medium mb-2">Performance Metrics</h4>
                                    <p className="text-sm text-white/50">We collect anonymous usage patterns to see which features are most helpful. We do not track your activity across other websites.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            4. Infrastructure & Safeguarding
                        </h2>
                        <div className="space-y-8 text-white/70 leading-relaxed">
                            <p>
                                Our core data resides in Neon (PostgreSQL) and Cloudflare R2 (Media). These providers are selected for their rigorous security compliance (SOC2 Type II) and global availability.
                            </p>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <h3 className="text-white font-medium">Data Retention</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        Personal data is retained only as long as your account is active. Upon deletion, we purge all identifiable records within 30 days.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-white font-medium">Encryption</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        We employ TLS 1.3 for data in transit and AES-256 hardware encryption at rest. Production environments are air-gapped.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            5. Your Rights & Erasure
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                You have the right to access, rectify, or export your data at any time. Our dashboard provides 1-click tools for data portability and account closure.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4 items-start">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-sm italic">The "Right to be Forgotten" is a core feature. Deleting your account triggers an automated workflow that wipes your history from our stack.</p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-sm italic">We use essential cookies to maintain your session. We do not use third-party tracking cookies or advertising pixels.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            6. Children & Revisions
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy is designed for adults (18+). We do not knowingly collect data from minors. Major policy updates are announced via email to ensure ongoing transparency.
                            </p>
                        </div>
                    </section>

                    <section className="pt-20 border-t border-white/10 pb-20">
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold tracking-tight text-white">Contact Us</h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                    If you have questions about our privacy standards or wish to exercise your data rights, our team is ready to assist.
                                </p>
                                <p className="text-white font-medium text-lg selection:bg-white selection:text-black">legal@bventy.in</p>
                                <div className="pt-2">
                                    <Link href="/terms" className="text-white/40 text-sm hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-white">
                                        View Terms of Service
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end md:items-end space-y-2">
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
