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
                        <span className="text-white/40">Open and transparent.</span>
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-white/50 text-sm font-medium pt-4">
                        <p>Effective Date: March 11, 2026</p>
                        <span className="hidden md:block text-white/20">|</span>
                        <p>Version 2.1.0</p>
                    </div>
                </header>

                <div className="space-y-32">
                    
                    {/* Section 1: Introduction */}
                    <section className="max-w-2xl">
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">01 / Introduction</h2>
                        <p className="text-white/70 text-2xl leading-relaxed font-medium tracking-tight">
                            We take your privacy seriously because we are users too. This policy explains what data we collect, why we need it, and how we keep it safe. No hidden clauses, just the facts.
                        </p>
                    </section>

                    {/* Section 2: Data Controller */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">02 / Who We Are</h2>
                        <div className="grid md:grid-cols-2 gap-12 text-white/60 leading-relaxed">
                            <p>
                                Bventy is a small, dedicated team building a marketplace for events. When we say "we" or "us", we are referring to the people behind the Bventy platform. We act as the data controller for the information you provide.
                            </p>
                            <p>
                                We believe in data minimization. If we don't need a piece of information to make the platform work, we won't ask for it.
                            </p>
                        </div>
                    </section>

                    {/* Section 3: Collection Categories */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">03 / Data Collection</h2>
                        <div className="space-y-12">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                                    <h3 className="text-xl font-semibold">Account Information</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        We collect your name, email address, and profile details to personalize your experience. This is necessary for you to use our services.
                                    </p>
                                </div>
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                                    <h3 className="text-xl font-semibold">Technical Data</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">
                                        Browser type, IP address, and device information are logged to ensure the security and stability of our platform.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Google API Usage */}
                    <section className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10">
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">04 / Google Calendar Integration</h2>
                        <div className="space-y-8 max-w-3xl">
                            <h3 className="text-2xl font-bold tracking-tight">Limited Use Disclosure</h3>
                            <p className="text-white/60 leading-relaxed">
                                Bventy's use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes" className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-white transition-all">Google API Service User Data Policy</a>, including the Limited Use requirements.
                            </p>
                            <div className="space-y-4 pt-4">
                                <div className="flex gap-4">
                                    <div className="h-1.5 w-1.5 rounded-full bg-white/40 mt-2 shrink-0"></div>
                                    <p className="text-sm text-white/50">We only access your calendar to sync availability and bookings.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-1.5 w-1.5 rounded-full bg-white/40 mt-2 shrink-0"></div>
                                    <p className="text-sm text-white/50">Your Google data is never shared with advertisers or third parties.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-1.5 w-1.5 rounded-full bg-white/40 mt-2 shrink-0"></div>
                                    <p className="text-sm text-white/50">You can revoke access at any time through your account settings.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Security */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">05 / Data Protection</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-semibold">Encryption Standards</h3>
                                <p className="text-white/60 leading-relaxed">
                                    We use TLS 1.3 to protect your data while it is moving across the internet. Once it reaches us, we use AES-256 encryption at rest to keep it safe in our databases.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-white font-medium mb-2">Access Control</h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Access to production data is strictly limited to necessary personnel. We use multi factor authentication and audit logs to monitor all internal activity.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Analytics */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">06 / Analytics & Tracking</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl mb-8">
                            We want to know what features you like. We use PostHog and Umami to track usage patterns. To protect your privacy, we route this traffic through our own servers rather than directly to third party trackers.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">PostHog</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Umami</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Self-hosted</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">No ads</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 7: Storage */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">07 / Infrastructure</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold italic">Database</h3>
                                <p className="text-white/60 leading-relaxed">
                                    We use Neon (PostgreSQL) for storing your account information and event data. It is highly secure and regularly backed up.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold italic">Cloud Storage</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Images and event portfolios are stored on Cloudflare R2. This ensures fast delivery while keeping your files secure.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 8: Your Rights */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">08 / Your Control</h2>
                        <div className="space-y-8">
                            <p className="text-white/70 text-xl leading-relaxed">You own your data. We provide the tools for you to manage it.</p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <h4 className="text-white font-medium">Export</h4>
                                    <p className="text-xs text-white/40 leading-relaxed">Download a copy of your personal data at any time from your settings.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-white font-medium">Correction</h4>
                                    <p className="text-xs text-white/40 leading-relaxed">Update your profile information instantly to keep it accurate.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-white font-medium">Erasure</h4>
                                    <p className="text-xs text-white/40 leading-relaxed">Deleting your account removes your personal data from our active databases.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 9: Retention */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">09 / Data Retention</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            We keep your data as long as your account is active. If you choose to delete your account, we will purge your personal information within 30 days, except for data we are required to keep by law (like transaction records).
                        </p>
                    </section>

                    {/* Section 10: Cookies */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">10 / Cookies</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            We use cookies to keep you logged in and remember your preferences. These are essential for the platform to function. We do not use third party advertising cookies.
                        </p>
                    </section>

                    {/* Section 11: Children's Privacy */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">11 / Children</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            Bventy is not for children under 18. We do not knowingly collect data from minors. If we discover we have accidentally collected such data, we will delete it immediately.
                        </p>
                    </section>

                    {/* Section 12: International Transfers */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">12 / Data Location</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            Your data may be stored and processed in countries where we or our service providers have facilities. By using Bventy, you consent to the transfer of information to these locations.
                        </p>
                    </section>

                    {/* Section 13: Communications */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">13 / Email</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            We will send you service related emails (like booking updates). You can opt out of non essential marketing emails at any time through your dashboard.
                        </p>
                    </section>

                    {/* Section 14: Platform Changes */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">14 / Policy Updates</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            As Bventy grows, we may update this policy. Major changes will be announced via email. Please check the "Effective Date" at the top to see when it was last updated.
                        </p>
                    </section>

                    {/* Section 15: Contact */}
                    <section>
                        <h2 className="text-sm uppercase tracking-widest text-white/30 font-bold mb-8">15 / Contact Us</h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            Have questions? We are here to help. Reach out to us directly for any privacy concerns.
                        </p>
                        <p className="text-white font-semibold mt-6 text-xl tracking-tight">legal@bventy.in</p>
                    </section>

                    {/* Final Footer */}
                    <section className="pt-32 border-t border-white/10 pb-20">
                        <div className="flex flex-col md:flex-row justify-between gap-16">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold tracking-tight text-white">Contact Us</h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                                    If you have questions about our privacy standards or wish to exercise your data rights, we are ready to assist.
                                </p>
                                <div className="space-y-1">
                                    <p className="text-white font-semibold">legal@bventy.in</p>
                                    <Link href="/terms" className="text-white/30 text-xs hover:text-white transition-colors">View Terms of Service</Link>
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
