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
                    <div className="space-y-1">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Terms. <span className="text-white/40 font-bold">The foundation of trust.</span>
                        </h1>
                        <p className="text-white/30 text-xs font-medium tracking-wide uppercase">Version 2.3.0 • March 11, 2026</p>
                    </div>
                </div>

                <p className="text-white/70 text-xl leading-relaxed mb-24">
                    These Terms of Service govern your relationship with Bventy. By accessing our platform, you accept these legal obligations and engage with our commitment to excellence, transparency, and professional integrity in the marketplace.
                </p>

                <div className="space-y-24">

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            1. Acceptance of Terms
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Engagement with Bventy constitutes a binding legal agreement. By utilizing our marketplace services, you affirm your acceptance of these Terms of Service. If you do not agree to these conditions, you must refrain from accessing our platform or interacting with our coordination tools.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            2. Eligibility & Access
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy is a professional environment architected for adults. You must be at least 18 years of age to establish an account or participate in our marketplace. By registering, you warrant that you possess the legal authority to enter into this agreement and that your activities comply with all applicable regional regulations.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            3. Professional Conduct
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                We provide the infrastructure; you provide the professional standards. Engagement on Bventy requires absolute honesty and integrity. Any attempt to compromise our platform through data scraping, reverse engineering, or malicious coordination will result in immediate and permanent suspension of access privileges.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            4. Marketplace Facilitation
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy serves as a sophisticated facilitator for professional event connections. While we provide the technical coordination layer, the actual delivery of services is governed by the independent agreement between the Vendor and the Client. Bventy is not a party to, nor liable for, the individual service contracts formed through our platform.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            5. Calendar & Sync Limitations
                        </h2>
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                            <p className="text-white/70 leading-relaxed text-sm italic">
                                For Vendors utilizing our Google Calendar integration:
                            </p>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Authorization.</span> You authorize Bventy to access your connected Google account to synchronize availability, manage professional bookings, and prevent scheduling conflicts.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Accuracy.</span> While we maintain high-precision synchronization, you remain the ultimate authority for the veracity of your calendar and your professional availability.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Technical Continuity.</span> Bventy is not liable for scheduling conflicts arising from upstream API latencies, third-party infrastructure outages, or network interruptions.</p>
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
                                All software, interface design, and branding are the exclusive property of Bventy. You retain absolute ownership of the portfolios and media assets you upload. We grant you a limited license to utilize our ecosystem; you grant us the necessary permissions to process and present your content as part of our service delivery.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            7. Account Termination
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                You may terminate this agreement at any time through the complete deletion of your account. Bventy reserves the right to suspend access if we identify a breach of these Terms or if your activity poses a security risk to the broader marketplace community.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            8. Warranties & Disclaimers
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p className="italic text-sm">
                                Bventy is provided on an "as is" and "as available" basis. We do not warrant that platform availability will be uninterrupted or that the service will be entirely free of technical imperfections. Your engagement with the marketplace is conducted at your own professional risk.
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
                                    To the maximum extent permitted by law, Bventy shall not be liable for incidental or consequential damages. Our aggregate liability for any specific claim is limited to the fees paid by you to Bventy in the six months preceding the catalyst event.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            10. Governing Law
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Any disputes arising from these Terms or your use of Bventy shall be governed exclusively by the laws of India. We advocate for direct professional resolution, though legal proceedings will be conducted within the competent courts of India.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            11. Modifications to Service
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                As our platform evolves, we may update these Terms to reflect new capabilities or regulatory shifts. Major revisions will be communicated directly, and your continued usage signifies your acceptance of the updated legal framework.
                            </p>
                        </div>
                    </section>

                    <section className="pt-20 border-t border-white/10 pb-20">
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold tracking-tight text-white">Contact Us</h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                    For formal legal notices or questions regarding our terms, please contact our administrative team.
                                </p>
                                <p className="text-white font-medium text-lg selection:bg-white selection:text-black">support@bventy.in</p>
                                <div className="pt-2">
                                    <Link href="/privacy" className="text-white/40 text-sm hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-white">
                                        View Privacy Policy
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
