import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service | Bventy",
    description: "Bventy's terms of service and usage guidelines.",
};

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-black text-white px-6 py-24 flex justify-center selection:bg-white selection:text-black antialiased">
            <div className="max-w-4xl w-full">
                <div className="mb-20">
                    <Link
                        href="/"
                        className="text-white/40 hover:text-white transition-all duration-300 text-sm font-medium tracking-tight flex items-center gap-2 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> Back to Home
                    </Link>
                </div>

                <header className="mb-32 space-y-8">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
                        Terms. <br />
                        <span className="text-white/40">The foundation of trust.</span>
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-6 text-white/50 text-xs font-mono uppercase tracking-widest pt-4">
                        <p>Updated: March 11, 2026</p>
                        <span className="hidden md:block text-white/10">•</span>
                        <p>Version 2.2.0</p>
                    </div>
                </header>

                <div className="space-y-48">
                    
                    {/* Section 1: Agreement */}
                    <section className="max-w-3xl">
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">01 / THE AGREEMENT</h2>
                        <p className="text-white/90 text-3xl md:text-4xl leading-[1.2] font-semibold tracking-tight">
                            By accessing or using Bventy, you are engaging in a shared commitment. These terms define the foundation of our relationship and ensure a safe, fair environment for everyone in our marketplace.
                        </p>
                    </section>

                    {/* Section 2: Eligibility */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">02 / ACCESS & ELIGIBILITY</h2>
                        <div className="grid md:grid-cols-2 gap-20 text-white/60 leading-relaxed">
                            <div className="space-y-4">
                                <h3 className="text-white font-semibold text-lg">Maturity</h3>
                                <p className="text-sm">You must be at least 18 years of age. Our platform facilitates legal agreements, requiring the capacity for digital binding.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-white font-semibold text-lg">Representation</h3>
                                <p className="text-sm">If you act on behalf of a company or entity, you confirm that you hold the legal authority to bind that entity to these terms.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Identity */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">03 / DIGITAL IDENTITY</h2>
                        <div className="space-y-12">
                            <p className="text-white/70 text-xl leading-relaxed max-w-2xl">
                                Your account is the gateway to your profile. You are responsible for all activity that occurs under your credentials.
                            </p>
                            <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
                                <div className="p-10 bg-black space-y-4">
                                    <h4 className="text-white font-semibold">Integrity</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">We expect absolute truthfulness in your profile details, portfolios, and communications.</p>
                                </div>
                                <div className="p-10 bg-black space-y-4">
                                    <h4 className="text-white font-semibold">Vigilance</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">Notify us immediately if you suspect any unauthorized access to your digital workspace.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Ecosystem Role */}
                    <section className="bg-white/5 p-12 md:p-20 rounded-[3rem] border border-white/10">
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">04 / THE MARKETPLACE</h2>
                        <div className="space-y-10 max-w-3xl">
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">We Architect Connections.</h3>
                            <p className="text-white/70 text-lg leading-relaxed">
                                Bventy is a platform that bridges the gap between Organizers and Vendors. While we provide the infrastructure for discovery and coordination, we do not participate in the underlying service contracts.
                            </p>
                            <div className="flex gap-6 p-8 rounded-3xl bg-white/5 border border-white/5 items-center">
                                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-xs shrink-0 font-bold text-white tracking-widest">INFO</div>
                                <p className="text-white/50 text-sm leading-relaxed italic">
                                    Contracts for events are strictly between the Organizer and the Vendor. We are not responsible for the performance or quality of external services.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Conduct */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">05 / PROFESSIONAL CONDUCT</h2>
                        <div className="grid md:grid-cols-2 gap-20">
                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold text-white">Ethical Transactions</h3>
                                <p className="text-white/50 leading-relaxed text-sm">
                                    Quotes sent through Bventy represent a commitment. Vendors are expected to honor the terms of their quotes for the specified duration.
                                </p>
                            </div>
                            <div className="p-10 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-white font-semibold mb-4">Platform Integrity</h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    We maintain a high standard of communication. Circumventing our platform to avoid policies may result in account restriction.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Google Integration */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">06 / GOOGLE SYNC</h2>
                        <div className="space-y-10 max-w-3xl">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">Technical Boundaries</h3>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Google Calendar integration is provided as a utility to enhance your scheduling. We are not liable for any discrepancies caused by third-party API delays or outages. Always verify your schedule independently.
                            </p>
                        </div>
                    </section>

                    {/* Section 7: Content Ownership */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">07 / INTELLECTUAL PROPERTY</h2>
                        <div className="max-w-2xl space-y-8">
                            <p className="text-white/70 text-lg leading-relaxed">
                                You retain ownership of all content you upload. By sharing it on Bventy, you grant us a non-exclusive license to display it to our global community to facilitate our services.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">You Own It</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">We Shield It</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 8: Limitations */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">08 / LEGAL LIMITATIONS</h2>
                        <div className="p-10 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                            <p className="text-white/50 text-xs uppercase tracking-widest font-black leading-relaxed">
                                BVENTY IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED.
                            </p>
                            <p className="text-white/30 text-xs uppercase tracking-widest font-bold leading-relaxed">
                                OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF THESE TERMS SHALL NOT EXCEED THE TOTAL FEES PAID TO US BY YOU DURING THE PRECEDING TWELVE MONTHS.
                            </p>
                        </div>
                    </section>

                    {/* Section 9: Governing Law */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">09 / JURISDICTION</h2>
                        <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                            These terms are governed by the laws of the Republic of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai.
                        </p>
                    </section>

                    {/* Final Footer */}
                    <section className="pt-48 border-t border-white/10 pb-20">
                        <div className="grid md:grid-cols-2 gap-16">
                            <div className="space-y-12">
                                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">Contact Us</h2>
                                <div className="space-y-8">
                                    <p className="text-white/50 text-lg leading-relaxed max-w-sm">
                                        If you have questions about these standards or wish to exercise your rights, our team is ready to assist.
                                    </p>
                                    <div className="space-y-4">
                                        <p className="text-3xl md:text-4xl font-bold tracking-tight text-white selection:bg-white selection:text-black">legal@bventy.in</p>
                                        <div className="pt-4">
                                            <Link href="/privacy" className="text-white/40 text-sm hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-white">View Privacy Policy</Link>
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
