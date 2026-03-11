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
                        Privacy. <span className="text-white/40 font-bold">Open and transparent.</span>
                    </h1>
                    <p className="text-white/50 font-medium">Last updated: March 11, 2026</p>
                </div>

                <p className="text-white/70 text-xl leading-relaxed mb-24">
                    We take your privacy seriously because we are users too. Our approach is simple: your data belongs to you. We only collect what is essential, keep it only as long as necessary, and protect it as if it were our own.
                </p>

                <div className="space-y-24">

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            1. Our Philosophy
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                At Bventy, privacy isn't a feature; it's the foundation of everything we build. We believe that professional coordination shouldn't come at the cost of personal anonymity. We operate on a data-minimization principle, ensuring that our systems only ever handle the information they absolutely need to function.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            2. Data Controller
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy acts as the primary data controller for all information collected through the platform. We manage your data with strict internal protocols designed to isolate sensitive identifiers from general application logic. We do not employ third-party data brokers or marketing teams.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            3. Identity Data
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                We collect your name, email address, and profile details to establish a trusted connection between you and the vendors or organizers you interact with. This information is used strictly for authentication, account management, and facilitating marketplace interactions.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            4. Technical Logging
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                For security and stability, basic technical identifiers like IP addresses, browser types, and device fingerprints are logged temporarily. This data is used to detect fraudulent activity, optimize our global infrastructure, and maintain the health of our real-time services.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            5. Google API Services & Data Protection
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
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Data Integrity.</span> We do not use your Google data for advertising products or services, nor do we sell it to third party providers. Your data remains in your control.</p>
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
                            6. Analytics Stack
                        </h2>
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-8">
                            <div className="space-y-4 text-white/70 leading-relaxed text-sm">
                                <p>
                                    To maintain the health and performance of our platform, we use internal tools and privacy-first analytics (PostHog Cloud and Umami Cloud) to understand how Bventy is functioning.
                                </p>
                                <p>
                                    We route technical telemetry through our own secure proxies to strip identifiable markers before they reach third-party servers. Your IP is always anonymized at the edge.
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <h4 className="text-white font-medium mb-2">Service Integrity</h4>
                                    <p className="text-sm text-white/50">Basic technical identifiers are logged temporarily to maintain system stability and prevent coordinated attacks.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <h4 className="text-white font-medium mb-2">Performance Metrics</h4>
                                    <p className="text-sm text-white/50">We collect anonymous usage patterns to optimize feature delivery. We do not track your activity across other domains.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            7. Infrastructure & Safeguarding
                        </h2>
                        <div className="space-y-8 text-white/70 leading-relaxed">
                            <p>
                                Our core data resides in Neon (PostgreSQL) and Cloudflare R2 (Media Storage). These providers are selected for their rigorous security compliance (SOC2 Type II) and global availability.
                            </p>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <h3 className="text-white font-medium">Network Security</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        We employ TLS 1.3 for all data in transit. Production environments are air-gapped from internal development networks to prevent accidental leaks.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-white font-medium">Data Encryption</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        All sensitive data is encrypted at rest using AES-256 hardware-level encryption, ensuring that physical access to servers does not compromise your identity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            8. Retention Policy
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Personal data is retained only as long as your account is active and for a short period thereafter for legal compliance. Upon deletion, we initiate an automated process to purge all identifiable records from our active systems within 30 days.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            9. Cookie Usage
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                We use essential cookies to maintain your session, security context, and preferences. We do not use third-party tracking cookies, advertising pixels, or cross-site behavioral indicators. Your digital footprint remains yours alone.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            10. User Rights
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                You have the right to access, rectify, or export your data at any time. Our platform provides self-service tools for data portability, allowing you to take your information wherever you choose.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            11. Data Erasure & "Right to be Forgotten"
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Deleting your Bventy account triggers an automated workflow that wipes your profile history, media uploads, and analytics telemetry from our stack. We believe deletion should be absolute, not a request waiting for approval.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            12. Children's Privacy
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy is designed for professional use by adults (18+). We do not knowingly collect data from minors. If such data is discovered, it is purged immediately and without exception from our production archives.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            13. International Data Transfers
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                As a global platform, your data may be processed in various secure regions. We ensure all cross-border transfers comply with standard contractual clauses (SCCs) and the highest possible encryption standards throughout the lifecycle.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            14. Policy Revisions
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                We update this policy as we ship new features and iterate on our infrastructure. Major changes are announced via email and through your dashboard to ensure ongoing transparency and informed consent.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            15. Transparency Commitment
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Our commitment to privacy is absolute. We invite you to review our security headers and technical disclosures any time. We build in the open, with your trust as our primary metric of success.
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
