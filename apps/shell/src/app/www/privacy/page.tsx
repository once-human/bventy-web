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

                <header className="mb-32 space-y-8">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
                        Privacy. <br />
                        <span className="text-white/40">Open and transparent.</span>
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-6 text-white/50 text-xs font-mono uppercase tracking-widest pt-4">
                        <p>Updated: March 11, 2026</p>
                        <span className="hidden md:block text-white/10">•</span>
                        <p>Version 2.2.0</p>
                    </div>
                </header>

                <div className="space-y-48">
                    
                    {/* Section 1: Philosophy */}
                    <section className="max-w-3xl">
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">01 / OUR PHILOSOPHY</h2>
                        <p className="text-white/90 text-3xl md:text-4xl leading-[1.2] font-semibold tracking-tight">
                            We take your privacy seriously because we are users too. Our approach is simple: your data belongs to you. We only collect what is essential, keep it only as long as necessary, and protect it as if it were our own.
                        </p>
                    </section>

                    {/* Section 2: Principles */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">02 / CORE PRINCIPLES</h2>
                        <div className="grid md:grid-cols-3 gap-16 text-white/60 leading-relaxed">
                            <div className="space-y-4">
                                <h3 className="text-white font-semibold text-lg">Transparency</h3>
                                <p className="text-sm">No hidden scripts. No complex legal jargon. We tell you exactly what we do with your information.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-white font-semibold text-lg">Control</h3>
                                <p className="text-sm">You have complete authority over your data. Export it, update it, or delete it at any time.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-white font-semibold text-lg">Minimization</h3>
                                <p className="text-sm">If a data point doesn't directly improve your experience, we simply don't ask for it.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Data Collection */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">03 / DATA LANDSCAPE</h2>
                        <div className="space-y-16">
                            <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
                                <div className="p-10 bg-black space-y-4">
                                    <h3 className="text-xl font-semibold text-white">Identity</h3>
                                    <p className="text-white/50 leading-relaxed">
                                        Your name, email, and profile details allow us to build a personalized connection between you and the vendors you trust.
                                    </p>
                                </div>
                                <div className="p-10 bg-black space-y-4">
                                    <h3 className="text-xl font-semibold text-white">Technical</h3>
                                    <p className="text-white/50 leading-relaxed">
                                        We log basic technical identifiers to maintain the integrity, security, and performance of our global infrastructure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Google API Usage */}
                    <section className="bg-white/5 p-12 md:p-20 rounded-[3rem] border border-white/10">
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">04 / GOOGLE ECOSYSTEM</h2>
                        <div className="space-y-10 max-w-3xl">
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">Limited Use Disclosure</h3>
                            <p className="text-white/70 text-lg leading-relaxed">
                                Bventy's use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes" className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-white transition-all">Google API Service User Data Policy</a>, including the Limited Use requirements.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8 pt-6">
                                <div className="space-y-2">
                                    <h4 className="text-white font-medium">Contextual Sync</h4>
                                    <p className="text-sm text-white/40">We only access your calendar to synchronize availability, ensuring your scheduling is seamless.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-white font-medium">Zero Monetization</h4>
                                    <p className="text-sm text-white/40">Your Google data is never used for advertising, profiling, or third-party marketing.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Security */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">05 / SAFEGUARDING</h2>
                        <div className="grid md:grid-cols-2 gap-20">
                            <div className="space-y-8">
                                <p className="text-white/90 text-2xl font-semibold leading-tight">We employ industry-leading protection to ensure your data remains yours.</p>
                                <ul className="space-y-4 text-white/50 text-sm">
                                    <li className="flex gap-3">
                                        <span className="text-white">•</span>
                                        <span>TLS 1.3 for all data in transit.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-white">•</span>
                                        <span>AES-256 hardware encryption for data at rest.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-white">•</span>
                                        <span>Continuous security audits and real-time monitoring.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-10 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-center">
                                <h4 className="text-white font-semibold mb-3">Air-Gapped Access</h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Direct access to production environments is strictly gated and monitored. We use ephemeral, short-lived credentials for all maintenance operations.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Analytics */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">06 / ANALYTICS</h2>
                        <div className="max-w-2xl space-y-8">
                            <p className="text-white/60 text-lg leading-relaxed">
                                To improve Bventy, we use PostHog and Umami—the gold standard in privacy-preserving analytics. These tools help us understand usage patterns while respecting your digital boundaries.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['PostHog Cloud', 'Umami Cloud', 'Privacy First', 'Anonymized IP'].map(tag => (
                                    <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/40 font-bold">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Section 7: Retention */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-10">07 / RETENTION & CONTROL</h2>
                        <div className="grid md:grid-cols-2 gap-16">
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-white">Your data, your timeline.</h3>
                                <p className="text-white/50 leading-relaxed text-sm">
                                    We retain your personal information only as long as your account remains active. Upon deletion, we purge all identifiable markers within 30 days, retaining only what is legally mandated.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-white">Instant Rectification.</h3>
                                <p className="text-white/50 leading-relaxed text-sm">
                                    Through your dashboard, you can correct, update, or completely remove your information with a single click. We believe control should be that simple.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Final Footer */}
                    <section className="pt-48 border-t border-white/10 pb-20">
                        <div className="grid md:grid-cols-2 gap-16">
                            <div className="space-y-12">
                                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">Contact Us</h2>
                                <div className="space-y-8">
                                    <p className="text-white/50 text-lg leading-relaxed max-w-sm">
                                        If you have questions about our privacy standards or wish to exercise your data rights, our team is ready to assist.
                                    </p>
                                    <div className="space-y-4">
                                        <p className="text-3xl md:text-4xl font-bold tracking-tight text-white selection:bg-white selection:text-black">legal@bventy.in</p>
                                        <div className="pt-4">
                                            <Link href="/terms" className="text-white/40 text-sm hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-white">View Terms of Service</Link>
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
