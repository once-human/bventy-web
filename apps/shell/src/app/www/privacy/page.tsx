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
                    <div className="space-y-1">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Privacy. <span className="text-white/40 font-bold">Open and transparent.</span>
                        </h1>
                        <p className="text-white/30 text-xs font-medium tracking-wide uppercase">Version 2.3.0 • March 11, 2026</p>
                    </div>
                </div>

                <p className="text-white/70 text-xl leading-relaxed mb-24">
                    At Bventy, your privacy is a fundamental commitment, not a secondary choice. We engineer our platform with the belief that your data belongs exclusively to you. Every line of code we write is governed by a singular intent: protecting your information with the highest standards of integrity and transparency.
                </p>

                <div className="space-y-24">

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            1. Our Philosophy
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Privacy is the bedrock of professional trust. We operate on a strict data-minimization framework, ensuring that our systems only process information that is essential for delivering a seamless marketplace experience. This philosophy ensures that your professional interactions remain secure, private, and entirely under your control.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            2. Data Controller
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy acts as the primary data controller for all personal information collected through our services. We maintain rigorous internal protocols to isolate sensitive identifiers from general application logic. We do not engage with third-party data brokers, ensuring your identity is never commoditized.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            3. Identity Data
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                To facilitate trusted connections between organizers and vendors, we collect essential identity markers such as name, email address, and verified profile attributes. This data is utilized solely for authentication, professional representation, and maintaining the security of the Bventy ecosystem.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            4. Technical Logging
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                To ensure system stability and defense against coordinated threats, we log technical telemetry including IP addresses and device identifiers. This information is utilized for platform optimization, security forensic analysis, and ensuring the consistent availability of our global infrastructure.
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
                                    We route technical telemetry through our own secure proxies to strip identifiable markers before they reach any third-party infrastructure. Your IP is anonymized at our edge servers.
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <h4 className="text-white font-medium mb-2">Service Integrity</h4>
                                    <p className="text-sm text-white/50">Technical identifiers are processed temporarily to ensure platform stability and protect against automated attacks.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <h4 className="text-white font-medium mb-2">Performance Metrics</h4>
                                    <p className="text-sm text-white/50">We analyze aggregated usage patterns to refine our feature delivery. We never track your activity across secondary domains.</p>
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
                                Our infrastructure is architected for resilience and security, utilizing Neon (PostgreSQL) and Cloudflare R2 (Media Storage). These partners are selected for their compliance with global standards, including SOC2 Type II.
                            </p>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <h3 className="text-white font-medium">Network Security</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        All data is transmitted via TLS 1.3. Our production environments are logically isolated from development networks to prevent unauthorized data exposure.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-white font-medium">Encryption at Rest</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        Personal information is stored using AES-256 hardware-level encryption, ensuring that data remains protected even at the physical storage layer.
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
                                We retain personal data only for as long as necessary to fulfill the purposes for which it was collected. Upon account termination, an automated workflow initiates the permanent deletion of identifiable records within 30 days.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            9. Cookie Usage
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy utilizes essential cookies strictly for session management, security, and personalizing your dashboard experience. We do not participate in cross-site tracking, behavioral advertising, or third-party pixel tracking.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            10. User Rights
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                You possess the unambiguous right to access, rectify, or export your personal information. We provide intuitive tools for data portability, allowing you to maintain ownership of your professional history.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            11. Data Erasure & "Right to be Forgotten"
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy honors your right to erasure. Deleting your account triggers a comprehensive purge of your profile existence, including media assets and telemetry. This process is absolute and irreversible once initiated.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            12. Children's Privacy
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Our platform is designed for professional use by individuals aged 18 and older. We do not knowingly process data from minors. Any such data identified within our systems is immediately and permanently deleted.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            13. International Data Transfers
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                As a global service, your information may be processed in various secure jurisdictions. We ensure all transfers adhere to standard contractual clauses (SCCs) and maintain consistent security standards worldwide.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            14. Policy Revisions
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                We periodically update this policy to reflect platform evolutions. Significant modifications will be communicated via direct notification to ensure continued transparency and informed consent.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            15. Commitment to Transparency
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Our commitment to your privacy is unwavering. We invite you to examine our security disclosures and platform integrity any time. We build with the knowledge that your trust is our most significant asset.
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
                                <p className="text-white/20 text-xs font-mono uppercase tracking-[0.15em]">DESIGNED IN INDIA</p>
                            </div>
                        </div>
                    </section>

                </div>

            </div>
        </div>
    );
}
