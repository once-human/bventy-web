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
                        <span className="text-white/40">The foundation of trust.</span>
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-white/50 text-sm font-medium pt-4">
                        <p>Effective Date: March 11, 2026</p>
                        <span className="hidden md:block text-white/20">|</span>
                        <p>Version 2.0.0 (Global Marketplace Standard)</p>
                    </div>
                </header>

                <div className="space-y-32">
                    
                    {/* Section 1: Acceptance */}
                    <section className="max-w-2xl">
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">01 / Acceptance of Terms</h2>
                        <p className="text-white/70 text-2xl leading-relaxed font-medium tracking-tight">
                            By accessing or using the Bventy platform, you agree to be legally bound by these Terms of Service. This document constitutes a master agreement between you and Bventy, governing our digital relationship and your use of our marketplace architecture.
                        </p>
                    </section>

                    {/* Section 2: Eligibility */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">02 / Capacity & Eligibility</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">User Capacity</h3>
                                <p className="text-white/60 leading-relaxed">
                                    You must be at least 18 years of age and possess the legal authority to enter into binding contracts to use this platform. Use by minors is strictly prohibited.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-white font-medium mb-2">Business Representation</h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    If you are using Bventy on behalf of a company or legal entity, you represent that you have the authority to bind that entity to these terms.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Account Integrity */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">03 / Account Integrity</h2>
                        <div className="space-y-12">
                            <p className="text-white/70 text-xl leading-relaxed">
                                You are the sole architect of your account security. You are responsible for all activities that occur under your credentials.
                            </p>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="space-y-3">
                                    <h4 className="text-white font-medium">Credential Safety</h4>
                                    <p className="text-white/50 text-sm leading-relaxed">Maintain strict confidentiality of your password. Change credentials immediately if a breach is suspected.</p>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-white font-medium">Identity Truthfulness</h4>
                                    <p className="text-white/50 text-sm leading-relaxed">All profile information, business details, and event descriptions must be accurate and verifiable.</p>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-white font-medium">Single Identity</h4>
                                    <p className="text-white/50 text-sm leading-relaxed">Duplicate accounts intended to manipulate the marketplace or ratings are grounds for permanent suspension.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Service Definition */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">04 / The Bventy Service Definition</h2>
                        <div className="p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10">
                            <h3 className="text-3xl font-bold tracking-tight mb-8 text-white/90">The Facilitator Principle</h3>
                            <p className="text-white/60 leading-relaxed max-w-2xl mb-8">
                                Bventy provides the software architecture and marketplace ecosystem to connect Service Providers (Vendors) with Service Seekers (Organizers). 
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="h-6 w-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-[10px] shrink-0 font-bold">!</div>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        <span className="text-white font-semibold">Bventy is not a party to your transactions.</span> We do not provide the event services, nor do we employ the vendors. Any contract for service is strictly between the Organizer and the Vendor.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Marketplace Mechanics */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">05 / Marketplace Mechanics</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-semibold">The Quoting Flow</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Our quoting architecture is designed to protect both parties. Organizers initiate requests, and Vendors respond with detailed proposals.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h4 className="text-white font-medium mb-1">Binding Quotes</h4>
                                    <p className="text-xs text-white/40">Once a quote is submitted through our system, it remains valid for the duration specified by the vendor.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h4 className="text-white font-medium mb-1">Fee Disclosure</h4>
                                    <p className="text-xs text-white/40">Any platform service fees or transaction charges will be clearly disclosed before any financial finalization.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Communication Protocol */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">06 / Communication Intelligence</h2>
                        <div className="space-y-12">
                            <p className="text-white/70 text-xl leading-relaxed">
                                To prevent marketplace circumvention and ensure professional integrity, Bventy utilizes a tiered communication system.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                                    <h4 className="text-lg font-semibold italic">Chat Unlock Policy</h4>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        Direct messaging channels and detailed contact information are locked until a specific marketplace milestone (such as a quote acceptance) is achieved.
                                    </p>
                                </div>
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                                    <h4 className="text-lg font-semibold italic">Off-Platform Transactions</h4>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        Attempting to move transactions off the platform to avoid service policies may result in account termination and legal action.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 7: Vendor Conduct */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">07 / Vendor Responsibilities</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            Vendors registered on Bventy must maintain a high standard of professional excellence. This includes delivering quoted services as promised, maintaining valid licenses required by their jurisdiction, and adhering to all local safety and taxation regulations. You represent that you are a legitimate business entity capable of fulfilling your marketplace obligations.
                        </p>
                    </section>

                    {/* Section 8: Organizer Conduct */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">08 / Organizer Responsibilities</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            As an Organizer, you agree to provide truthful event details, respect vendor time, and fulfill your financial commitments for services rendered. Any harassment or fraudulent event postings will result in immediate platform expulsion.
                        </p>
                    </section>

                    {/* Section 9: Google Sync Disclaimers */}
                    <section className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10">
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">09 / Google Calendar Sync Disclaimers</h2>
                        <div className="space-y-8 max-w-3xl">
                            <h3 className="text-2xl font-bold">Authorization & Technical Liability</h3>
                            <p className="text-white/60 leading-relaxed">
                                By enabling Google Calendar synchronization, you grant Bventy the technical authority to modify your calendar based on marketplace activities (e.g., booking confirmations).
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <h4 className="text-white font-medium">Sync Accuracy</h4>
                                    <p className="text-xs text-white/40 leading-relaxed">Bventy is not liable for missed events, double bookings, or scheduling conflicts resulting from network latency, API service outages, or synchronization failures.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-white font-medium">Third Party Outages</h4>
                                    <p className="text-xs text-white/40 leading-relaxed">We provide sync as an accommodation. Any failure of the Google Calendar service itself is outside of our control and liability.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 10: Intellectual Property */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">10 / Intellectual Property</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Platform IP</h3>
                                <p className="text-white/60 leading-relaxed">
                                    The Bventy brand, logo, code, interface designs, and proprietary logic are the exclusive property of Bventy and are protected by global copyright and trademark laws.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Project & Portfolio License</h3>
                                <p className="text-white/60 leading-relaxed">
                                    By uploading portfolios, event photos, or descriptions, you grant Bventy a worldwide, royalty free license to store and display this content to facilitate the marketplace.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 11: Prohibited Activities */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">11 / Prohibited Activities</h2>
                        <p className="text-white/60 leading-relaxed mb-6">You are strictly prohibited from:</p>
                        <ul className="grid md:grid-cols-2 gap-4 text-sm text-white/40 font-medium list-disc list-inside">
                            <li>Scraping or mining data from the platform.</li>
                            <li>Reverse engineering our marketplace logic.</li>
                            <li>Posting fraudulent or deceptive portfolios.</li>
                            <li>Using the chat for spam or unsolicited solicitations.</li>
                            <li>Bypassing our security layers or reverse proxies.</li>
                        </ul>
                    </section>

                    {/* Section 12: Suspension & Termination */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">12 / Suspension & Termination</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            Bventy reserves the right to suspend or terminate any account at our sole discretion, without prior notice, for conduct that we believe violates these terms or is harmful to other users or the platform's reputation. You may terminate your account at any time by contacting support, but marketplace historical data may be retained as per our Privacy Policy.
                        </p>
                    </section>

                    {/* Section 13: Warranty Disclaimers */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">13 / Warranty Disclaimers</h2>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <p className="text-white font-bold mb-4 italic text-sm">AS-IS BASIS</p>
                            <p className="text-white/50 text-sm leading-relaxed uppercase tracking-tight">
                                BVENTY IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON INFRINGEMENT. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR FREE.
                            </p>
                        </div>
                    </section>

                    {/* Section 14: Limitation of Liability */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">14 / Limitation of Liability</h2>
                        <div className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10 space-y-6">
                            <p className="text-white/60 leading-relaxed">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, BVENTY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF THE SERVICE.
                            </p>
                            <p className="text-white/60 leading-relaxed border-t border-white/10 pt-6 font-semibold">
                                IN NO EVENT SHALL BVENTY'S AGGREGATE LIABILITY FOR ALL CLAIMS EXCEED THE TOTAL AMOUNT PAID BY YOU TO BVENTY IN THE TWELVE MONTHS PRECEDING THE CLAIM.
                            </p>
                        </div>
                    </section>

                    {/* Section 15: Indemnification */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">15 / Mutual Indemnification</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            You agree to defend, indemnify, and hold harmless Bventy and its officers, directors, and employees from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your access to or use of the service.
                        </p>
                    </section>

                    {/* Section 16: Dispute Resolution */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">16 / Dispute Resolution & Arbitration</h2>
                        <div className="space-y-6">
                            <p className="text-white/60 leading-relaxed">
                                Any disputes arising from these terms will first be attempted to be resolved via informal mediation. If a resolution is not reached within 60 days, the dispute shall be resolved through binding arbitration in Mumbai, Maharashtra, India.
                            </p>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h4 className="text-white font-medium mb-1">Class Action Waiver</h4>
                                <p className="text-xs text-white/40 uppercase">You agree that you may bring claims against Bventy only in your individual capacity, and not as a plaintiff or class member in any purported class or representative proceeding.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 17: Governing Law */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">17 / Jurisdictional Law</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            These Terms of Service are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any legal action not subject to arbitration shall be brought exclusively in the courts of Mumbai.
                        </p>
                    </section>

                    {/* Section 18: General Provisions */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">18 / Final Provisions</h2>
                        <div className="grid md:grid-cols-2 gap-8 text-sm text-white/50 leading-relaxed">
                            <p><span className="text-white font-semibold">Severability.</span> If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.</p>
                            <p><span className="text-white font-semibold">Entire Agreement.</span> These Terms and our Privacy Policy constitute the entire and exclusive agreement between you and Bventy regarding the platform.</p>
                        </div>
                    </section>

                    {/* Final Contact */}
                    <section className="pt-32 border-t border-white/10 pb-20">
                        <div className="flex flex-col md:flex-row justify-between gap-16">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold tracking-tight text-white">Bventy Legal Team</h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                                    Our legal corridors are always open for formal inquiries or policy clarifications.
                                </p>
                                <div className="space-y-1">
                                    <p className="text-white font-semibold">legal@bventy.in</p>
                                    <p className="text-white/30 text-xs font-mono">Formal Marketplace Correspondence</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end text-right space-y-2">
                                <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.3em]">Architecting Connections</p>
                                <p className="text-white/40 text-sm">© {new Date().getFullYear()} Bventy Intellectual Property. All rights reserved.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
