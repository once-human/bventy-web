import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Bventy",
    description: "Bventy's transparent and open-source privacy policy.",
};

export default function PrivacyPolicyPage() {
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
                        Privacy. <br />
                        <span className="text-white/40">Transparency by design.</span>
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-white/50 text-sm font-medium pt-4">
                        <p>Effective Date: March 11, 2026</p>
                        <span className="hidden md:block text-white/20">|</span>
                        <p>Version 2.0.0 (Global Standard)</p>
                    </div>
                </header>

                <div className="space-y-32">
                    
                    {/* Section 1: Introduction */}
                    <section className="max-w-2xl">
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">01 / Philosophy</h2>
                        <p className="text-white/70 text-2xl leading-relaxed font-medium tracking-tight">
                            At Bventy, we believe privacy is not a feature but a fundamental human right. Our platform is engineered to protect your personal information through advanced security and a commitment to radical transparency. This policy outlines our exhaustive approach to data handling and your rights within our ecosystem.
                        </p>
                    </section>

                    {/* Section 2: Data Controller */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">02 / Documentation & Control</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">The Data Controller</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Bventy acts as the primary data controller for personal information collected through our website, mobile applications, and marketplace services. We govern the technical and legal frameworks that ensure your data is processed lawfully and securely.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-white font-medium mb-2">Legal Basis</h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    We process data under three primary legal pillars: your explicit consent, the necessity of fulfilling our contract with you, and our legitimate interests in maintaining platform integrity and resolving technical issues.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Information Collection */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">03 / Categorized Collection</h2>
                        <div className="space-y-12">
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="space-y-3">
                                    <h4 className="text-white font-medium">Anonymous Traffic</h4>
                                    <p className="text-white/50 text-sm leading-relaxed">Referring URLs, device architecture, localized geography, and page interaction timestamps.</p>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-white font-medium">Authenticated Data</h4>
                                    <p className="text-white/50 text-sm leading-relaxed">Legal names, verified email addresses, cryptographically hashed passwords, and profile preferences.</p>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-white font-medium">Marketplace Assets</h4>
                                    <p className="text-white/50 text-sm leading-relaxed">Business portfolios, event logistics, budget parameters, and secure message history.</p>
                                </div>
                            </div>
                            <p className="text-white/40 text-sm italic py-4 border-y border-white/5">
                                We prioritize data minimization, collecting only the absolute necessary identifiers required to facilitate a pristine marketplace experience.
                            </p>
                        </div>
                    </section>

                    {/* Section 4: Google API Services */}
                    <section className="p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="white">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white" />
                            </svg>
                        </div>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">04 / Google Ecosystem Integration</h2>
                        <div className="space-y-8 max-w-2xl">
                            <h3 className="text-3xl font-bold tracking-tight">The Calendar Sync & Data Safety Shield</h3>
                            <p className="text-white/70 leading-relaxed">
                                Our synchronization with Google services is governed by strict security protocols and the Google API Services User Data Policy.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0 font-bold">A</div>
                                    <p className="text-white/60 text-sm leading-relaxed"><span className="text-white font-semibold">Limited Use Compliance.</span> Bventy's use and transfer of information received from Google APIs to any other app will strictly adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy#limited-use" className="underline underline-offset-4 hover:text-white transition-colors duration-300">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0 font-bold">B</div>
                                    <p className="text-white/60 text-sm leading-relaxed"><span className="text-white font-semibold">Scope Minimization.</span> We only request "Calendar.Events" and "Userinfo.Email" scopes. These are used exclusively to manage your availability within Bventy and verify your account identity.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0 font-bold">C</div>
                                    <p className="text-white/60 text-sm leading-relaxed"><span className="text-white font-semibold">Zero Advertising.</span> We never transfer Google user data to third party ad platforms, data brokers, or information resellers. Your calendar remains private.</p>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5: Security & Encryption */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">05 / Security Architecture</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-semibold">Industry-Grade Encryption</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Security procedures are in place to protect the confidentiality of your personal information. We employ a layered defense strategy to safeguard your data at every state.
                                </p>
                            </div>
                            <div className="space-y-8">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-6 items-start">
                                    <div className="p-3 rounded-xl bg-white/5 text-xs font-mono">TLS 1.3</div>
                                    <div className="space-y-1">
                                        <p className="font-medium text-white">Data in Transit</p>
                                        <p className="text-xs text-white/40 leading-relaxed">All communications between your browser and our infrastructure are encrypted using modern Transport Layer Security protocols.</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-6 items-start">
                                    <div className="p-3 rounded-xl bg-white/5 text-xs font-mono">AES 256</div>
                                    <div className="space-y-1">
                                        <p className="font-medium text-white">Data at Rest</p>
                                        <p className="text-xs text-white/40 leading-relaxed">Sensitive identifiers and system logs are encrypted within our database using Advanced Encryption Standard algorithms.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Analytics & Reverse Proxies */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">06 / Analytics & Telemetry Transparency</h2>
                        <div className="space-y-12">
                            <p className="text-white/70 text-xl leading-relaxed">
                                To ensure technical integrity and platform stability, we use first party reverse proxies to route analytics traffic. This prevents data loss from network interruptions and allows our engineers to resolve bugs with high precision.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                                    <h4 className="text-lg font-semibold">Identity Mapping</h4>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        We associate technical telemetry with your Bventy profile. This allows us to provide targeted support if you experience a platform failure, eliminating the need for complex reproduction steps.
                                    </p>
                                </div>
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                                    <h4 className="text-lg font-semibold">Session Integrity</h4>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        Calculated interactions (clicks, latency, error triggers) are recorded to build a more responsive marketplace. We do not sell these behaviors to advertisers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 7: Third-Party Infrastructure */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">07 / Infrastructure Partners</h2>
                        <div className="space-y-8">
                            <p className="text-white/60 leading-relaxed">
                                Your data is housed and processed within a curated ecosystem of world class infrastructure providers. Each partner is selected for their adherence to global security standards.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {["Render (Application)", "Neon (PostgreSQL Database)", "Cloudflare (Media Storage & R2)", "PostHog (System Telemetry)", "Umami (Privacy Metrics)"].map((item) => (
                                    <div key={item} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Section 8: Retension */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">08 / Data Retention & Minimization</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Storage Duration</h3>
                                <p className="text-white/60 leading-relaxed">
                                    We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or to comply with legal obligations. Marketplace records (Quotes, Events) are preserved to provide users with a functional historical ledger.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Purge Cycles</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Temporary transaction logs and ephemeral system metrics are automatically purged every 90 days to maintain a lightweight and privacy focused architectural footprint.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 9: Cookies & Storage */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">09 / Sessions & Local Storage</h2>
                        <div className="space-y-6">
                            <p className="text-white/60 leading-relaxed">
                                Bventy uses essential cookies and browser local storage to maintain your authenticated session and provide a customized interface.
                            </p>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="font-medium mb-4">Functional Cookies</h4>
                                <ul className="grid md:grid-cols-2 gap-4 text-sm text-white/40 font-mono">
                                    <li>bventy_session (HTTPS Only, Secure)</li>
                                    <li>bventy_settings (Theme, Preferences)</li>
                                    <li>__posthog (Analytics ID)</li>
                                    <li>__umami (Anonymous Metrics)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 10: Rights and Controls */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">10 / Global Rights & Sovereignty</h2>
                        <div className="space-y-8">
                            <p className="text-white/70 text-xl leading-relaxed">
                                Regardless of your jurisdiction, Bventy provides a global standard of data rights, inspired by the frameworks of the GDPR and CCPA.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {["Right to Access", "Right to Erasure", "Right to Portability", "Right to Correction"].map((right) => (
                                    <div key={right} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                                        <p className="text-xs font-bold text-white uppercase tracking-tighter">{right}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed text-center">
                                You can exercise these rights instantly through your dashboard or by formal request to our privacy team.
                            </p>
                        </div>
                    </section>

                    {/* Section 11: International Transfers */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">11 / International Data Transfers</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            As a global platform, your information may be processed in servers located outside your country of residence (primarily in the United States and Singapore via our cloud providers). We maintain rigorous data protection agreements with all infrastructure partners to ensure your information remains secured across borders.
                        </p>
                    </section>

                    {/* Section 12: Marketplace Matching */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">12 / Marketplace Visibility & Matching</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            Public profile data (Vendor business names, city, category, and portfolios) are designed for search engine visibility and user discovery. Private data (Event budgets, precise addresses, and contact info) are only shared once an Organizer explicitly initiates a quote request or unlocks a communication channel.
                        </p>
                    </section>

                    {/* Section 13: Children's Privacy */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">13 / Digital Age of Consent</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            Bventy is designed for adult professionals and businesses. We do not knowingly collect personal information from children under the age of 18. If we discover a minor has created an account, we will purge all associated data immediately upon notification.
                        </p>
                    </section>

                    {/* Section 14: Automated Decisions */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">14 / Automated Decision Making</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            We may use automated algorithms to surface relevant vendors or detect fraudulent account activity. These systems are monitored by human administrators to ensure fairness and accuracy. We do not use automated profiling for discriminatory purposes.
                        </p>
                    </section>

                    {/* Section 15: Material Changes */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">15 / Policy Evolutions</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            Digital privacy is a dynamic landscape. We may update this policy to reflect platform changes or new regulations. While minor adjustments will be noted by the "Effective Date," material changes to how we handle sensitive information will be communicated directly via email.
                        </p>
                    </section>

                    {/* Section 16: Final Contact */}
                    <section className="pt-32 border-t border-white/10 pb-20">
                        <div className="flex flex-col md:flex-row justify-between gap-16">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold tracking-tight text-white">Bventy Privacy Team</h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                                    Our dedicated privacy officer is available to answer questions or address concerns regarding your data sovereignty.
                                </p>
                                <div className="space-y-1">
                                    <p className="text-white font-semibold">privacy@bventy.in</p>
                                    <p className="text-white/30 text-xs font-mono">Secure Legal Channel</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end text-right space-y-2">
                                <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.3em]">Built for the modern web</p>
                                <p className="text-white/40 text-sm">© {new Date().getFullYear()} Bventy Intellectual Property. All rights reserved.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
