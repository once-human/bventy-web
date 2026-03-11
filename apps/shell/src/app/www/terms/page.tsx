"use client";

import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";

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

                <div className="space-y-4 mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Terms. <span className="text-white/40 font-bold">The foundation of trust.</span>
                    </h1>
                    <p className="text-white/50 font-medium">Last updated: March 11, 2026</p>
                </div>

                <p className="text-white/70 text-xl leading-relaxed mb-24">
                    These Terms of Service govern your use of Bventy. By accessing our platform, you agree to these legal obligations. We have designed them to be easy to understand, reflecting our commitment to transparency and mutual respect in the marketplace.
                </p>

                <div className="space-y-24">

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            1. Acceptance of Terms
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                By accessing or using Bventy, you agree to be bound by these Terms of Service. They form a binding legal contract between you and Bventy. If you do not agree with any part of these terms, you should not access our services or interact with the marketplace.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            2. Eligibility & Access
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy is for adults. You must be at least 18 years old to create an account or use our marketplace. By joining, you represent and warrant that you have the legal capacity to enter into this agreement and that your use of the service complies with all applicable laws.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            3. User Conduct
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                We provide the platform, you provide the professional conduct. We expect all users to interact with honesty and integrity. Any attempt to scrape our data, reverse engineer our software, or use Bventy for malicious coordination is a direct breach and will result in permanent account suspension.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            4. The Marketplace Facilitation
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy acts as a facilitator for professional event connections. While we provide the technical infrastructure and coordination tools, the actual delivery of services is governed by the agreement between the Vendor and the Client. Bventy is not a party to the independent service contracts formed on the platform.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            5. Calendar & Sync Limitations
                        </h2>
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                            <p className="text-white/70 leading-relaxed text-sm italic">
                                For Vendors utilizing our Google Calendar integration features:
                            </p>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Authorization.</span> You authorize Bventy to access your connected Google account to synchronize your availability, manage bookings, and prevent scheduling conflicts across the marketplace.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Accuracy.</span> While we strive for 99.9% synchronization accuracy, you remain solely responsible for the ultimate veracity of your calendar, your availability, and your professional responses.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Technical Continuity.</span> We are not liable for scheduling conflicts resulting from upstream API failures, third-party service outages, or network latency affecting real-time updates.</p>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            6. Intellectual Property & Licenses
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Our code, interface design, branding, and platform logic are the property of Bventy. Your data, portfolios, and uploaded content remain yours. We grant you a limited, revocable license to use Bventy as intended; you grant us a license to host and process your content to provide these services to you.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            7. Account Termination
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                You may end this agreement at any time by deleting your account. Bventy reserves the right to suspend or terminate your access if we believe you have violated these Terms or if your actions pose a security risk to our ecosystem.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            8. Disclaimers & Warranties
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p className="italic text-sm">
                                Bventy is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. We do not guarantee that the platform will be error-free, uninterrupted, or perfectly compatible with all external systems at all times.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            9. Limitation of Liability
                        </h2>
                        <div className="space-y-8 text-white/70 leading-relaxed italic text-sm">
                            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 not-italic">
                                <h3 className="text-white font-medium mb-4">Liability Cap</h3>
                                <p className="leading-relaxed">
                                    To the maximum extent permitted by law, Bventy shall not be liable for any indirect, incidental, or consequential damages. Our total liability for any specific claim arising from these Terms is capped at the amount you have paid Bventy in the six months preceding the incident.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            10. Governing Law & Disputes
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Any disputes arising from these Terms or your use of Bventy shall be governed by the laws of India. We prefer resolving issues through direct professional communication, but legal proceedings will take place within the competent courts of India.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            11. Modifications to Service
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                As Bventy evolves, so will these Terms. We will notify you of major updates via email or dashboard alerts. Your continued use of the platform after such changes constitutes your acceptance of the updated Terms.
                            </p>
                        </div>
                    </section>

                    <section className="pt-20 border-t border-white/10 pb-20">
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold tracking-tight text-white">Contact Us</h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                    For formal legal notices or questions regarding these terms, please contact our administrative team.
                                </p>
                                <p className="text-white font-medium text-lg selection:bg-white selection:text-black">legal@bventy.in</p>
                                <div className="pt-2">
                                    <Link href="/privacy" className="text-white/40 text-sm hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-white">
                                        View Privacy Policy
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
