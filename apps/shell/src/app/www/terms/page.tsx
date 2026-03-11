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

                <header className="mb-24 space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                        Terms. <br />
                        <span className="text-white/40">The rules of the road.</span>
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-white/50 text-sm font-medium pt-4">
                        <p>Effective Date: March 11, 2026</p>
                        <span className="hidden md:block text-white/20">|</span>
                        <p>Version 2.1.0</p>
                    </div>
                </header>

                <div className="space-y-32">
                    
                    {/* Section 1: Acceptance */}
                    <section className="max-w-2xl">
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">01 / Agreement</h2>
                        <p className="text-white/70 text-2xl leading-relaxed font-medium tracking-tight">
                            By using Bventy, you are agreeing to these terms. It is a simple agreement between you and us to make sure everyone plays fair in our marketplace.
                        </p>
                    </section>

                    {/* Section 2: Eligibility */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">02 / Who Can Use Bventy</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4 text-white/60 leading-relaxed">
                                <p>
                                    You must be at least 18 years old to use this platform. This is because our services involve legal agreements between users.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-white font-medium mb-2">Business Use</h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    If you are signing up for a company, you represent that you have the authority to do so.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Accounts */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">03 / Your Account</h2>
                        <div className="space-y-12">
                            <p className="text-white/70 text-xl leading-relaxed">
                                You are responsible for keeping your account secure. If you share your password, you are responsible for what happens next.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                                    <h4 className="text-white font-medium italic">Honesty</h4>
                                    <p className="text-white/50 text-sm leading-relaxed">Don't create fake profiles. Everything you tell us should be true.</p>
                                </div>
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                                    <h4 className="text-white font-medium italic">Security</h4>
                                    <p className="text-white/50 text-sm leading-relaxed">Let us know immediately if you think someone else has accessed your account.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: What We Do */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">04 / Our Role</h2>
                        <div className="p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10">
                            <h3 className="text-3xl font-bold tracking-tight mb-8 text-white/90">We are a marketplace.</h3>
                            <p className="text-white/60 leading-relaxed max-w-2xl mb-8">
                                Bventy helps Organizers find Vendors. We provide the tools for you to connect, but we aren't part of the actual event services.
                            </p>
                            <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] shrink-0 font-bold">!</div>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Contracts for services are between the Organizer and the Vendor. Bventy is not responsible for the quality or delivery of those services.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Marketplace Rules */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">05 / How it Works</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-semibold italic underline decoration-white/10 underline-offset-8">Quotes</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Once a vendor sends a quote, they should honor those terms for the duration they specified.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-white font-medium mb-4 italic">Fees</h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    We will be clear about any platform fees before you commit to anything. No surprises.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Communication */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">06 / Chat & Contact</h2>
                        <div className="space-y-8 max-w-2xl">
                            <p className="text-white/70 text-xl leading-relaxed">
                                We keep contact details hidden until a quote is accepted. This helps prevent spam and ensures a professional environment.
                            </p>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Taking transactions off-platform to avoid policies may result in your account being closed.
                            </p>
                        </div>
                    </section>

                    {/* Section 7: Google Calendar */}
                    <section className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10">
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">07 / Google Calendar Sync</h2>
                        <div className="space-y-8 max-w-3xl">
                            <h3 className="text-2xl font-bold">Technical Disclaimer</h3>
                            <p className="text-white/60 leading-relaxed">
                                We offer Google Calendar sync as a convenience. We aren't liable for sync delays, double bookings, or outages in Google's services. Always double check your schedule.
                            </p>
                        </div>
                    </section>

                    {/* Section 8: Your Content */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">08 / Photos & Portfolios</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl mb-8">
                            When you upload photos or descriptions, you give us permission to show them to other users on Bventy. You still own your content, but we need this license to make the platform work.
                        </p>
                    </section>

                    {/* Section 9: Prohibited Behavior */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">09 / Common Sense</h2>
                        <ul className="grid md:grid-cols-2 gap-4 text-sm text-white/40 list-disc list-inside">
                            <li>No scraping our data.</li>
                            <li>No fake portfolios.</li>
                            <li>No spamming the chat.</li>
                            <li>No illegal activities.</li>
                        </ul>
                    </section>

                    {/* Section 10: Ending our Relationship */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">10 / Termination</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            You can stop using Bventy at any time. We also reserve the right to stop providing the service to you if you violate these rules.
                        </p>
                    </section>

                    {/* Section 11: Liability */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">11 / Legalese</h2>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-white/40 text-xs uppercase leading-relaxed space-y-4">
                            <p>
                                BVENTY IS PROVIDED "AS IS." WE DON'T PROMISE IT WILL BE PERFECT OR UNINTERRUPTED.
                            </p>
                            <p>
                                OUR LIABILITY IS LIMITED TO THE AMOUNT YOU HAVE PAID US IN THE LAST 12 MONTHS. WE AREN'T LIABLE FOR INDIRECT DAMAGES LIKE LOST PROFITS.
                            </p>
                        </div>
                    </section>

                    {/* Section 12: Disputes */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">12 / Governing Law</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            These terms are governed by the laws of India. Any formal disputes will be handled in Mumbai.
                        </p>
                    </section>

                    {/* Final Contact */}
                    <section className="pt-32 border-t border-white/10 pb-20">
                        <div className="flex flex-col md:flex-row justify-between gap-16">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold tracking-tight text-white">Contact Us</h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                                    Have questions about these rules? We are here to help.
                                </p>
                                <div className="space-y-1">
                                    <p className="text-white font-semibold">legal@bventy.in</p>
                                    <Link href="/privacy" className="text-white/30 text-xs hover:text-white transition-colors">View Privacy Policy</Link>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end text-right space-y-2">
                                <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">DESIGNED IN INDIA</p>
                                <p className="text-white/40 text-sm">© {new Date().getFullYear()} Bventy. All rights reserved.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
