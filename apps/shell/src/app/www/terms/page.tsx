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
                        Terms. <span className="text-white/40 italic font-normal">The foundation of trust.</span>
                    </h1>
                    <p className="text-white/50 font-medium">Last updated: March 11, 2026</p>
                </div>

                <p className="text-white/70 text-xl leading-relaxed mb-24">
                    These Terms of Service govern your use of Bventy. By accessing our platform, you agree to these terms. We have designed them to be easy to understand, reflecting our commitment to transparency and mutual respect.
                </p>

                <div className="space-y-24">

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            1. The Bventy Marketplace & Eligibility
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy provides a sophisticated platform to connect Event Organizers with professional Vendors. By accessing Bventy, you agree to these Terms. They form a binding contract between you and us.
                            </p>
                            <p>
                                Bventy is for adults. You must be at least 18 years old to create an account or use our marketplace. By joining, you represent that you have the legal capacity to enter into this agreement.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            2. Account Responsibilities & Conduct
                        </h2>
                        <div className="space-y-8 text-white/70 leading-relaxed">
                            <p>
                                To use certain features, you must create an account. You are responsible for all activities that occur under your credentials. 
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <h4 className="text-white font-medium mb-2">Professional Conduct</h4>
                                    <p className="text-sm text-white/50">We expect all users to interact with professional courtesy. Harassment, spam, or any illegal activity will result in immediate termination.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <h4 className="text-white font-medium mb-2">Platform Integrity</h4>
                                    <p className="text-sm text-white/50">Any attempt to scrape our data or reverse engineer our services is a direct breach and will result in permanent suspension.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            3. Calendar & Sync Limitations
                        </h2>
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                            <p className="text-white/70 leading-relaxed text-sm italic">
                                For Vendors using our Google Calendar integration:
                            </p>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Authorization.</span> You authorize Bventy to access your connected Google account to synchronize availability and bookings.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Accuracy.</span> While we aim for 99.9% accuracy, you are responsible for the ultimate accuracy of your calendar and availability.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Service Continuity.</span> We are not liable for scheduling conflicts arising from sync delays, technical interruptions, or external API failures.</p>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            4. Intellectual Property & Marketplace Facilitation
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Our code, design, and branding are ours. Your data and content are yours. We grant you a limited license to use Bventy; you grant us a license to host your content so we can provide our services.
                            </p>
                            <p>
                                Bventy acts as a facilitator. While we handle the technical infrastructure, the actual service delivery is governed by the agreement between the Vendor and the Client. We are not responsible for the services rendered.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            5. Disclaimers & Limitation of Liability
                        </h2>
                        <div className="space-y-8 text-white/70 leading-relaxed italic text-sm">
                            <p>
                                Bventy is provided "as is" and "as available". We don't guarantee that the platform will be error-free or uninterrupted. Use it at your own risk.
                            </p>
                            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 not-italic">
                                <h3 className="text-white font-medium mb-4">Liability Cap</h3>
                                <p className="leading-relaxed">
                                    To the maximum extent permitted by law, Bventy's total liability for any claim arising from these Terms is limited to the amount you've paid us in the last 6 months.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            6. Termination & Governing Law
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                You can leave at any time. Any disputes arising from these Terms will be governed by the laws of India. Legal proceedings will take place in the competent courts of India.
                            </p>
                            <p>
                                As Bventy evolves, so will these Terms. major updates will be communicated and continued use constitutes acceptance of the new Terms.
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
