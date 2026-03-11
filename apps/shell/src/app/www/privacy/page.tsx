import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Bventy",
    description: "Bventy's transparent and open-source privacy policy.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-white px-6 py-20 flex justify-center selection:bg-white selection:text-black">
            <div className="max-w-3xl w-full">
                <div className="mb-16">
                    <Link
                        href="/"
                        className="text-white/50 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide flex items-center gap-2"
                    >
                        &larr; Back to Home
                    </Link>
                </div>

                <div className="space-y-4 mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Privacy. Built into everything we do.
                    </h1>
                    <p className="text-white/50 font-medium">Last updated: March 11, 2026</p>
                </div>

                <p className="text-white/70 text-xl leading-relaxed mb-16">
                    At Bventy, we believe privacy is a fundamental human right. Our platform is designed from the ground up to protect your information, providing you with transparency and control over your data. This policy explains how we handle your personal information and the choices you have.
                </p>

                <div className="space-y-20">

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            1. Information We Collect
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                We collect information to provide a better experience for everyone using Bventy. The types of data we collect depend on how you interact with our platform.
                            </p>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="text-white font-medium mb-2">Account Information</h3>
                                    <p className="text-sm">When you create an account, we collect your name, email address, and profile preferences. Your password is never stored in plain text; we use secure hashing to protect it.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="text-white font-medium mb-2">Profile Content</h3>
                                    <p className="text-sm">For vendors and organizers, we store the content you choose to share, such as portfolios, event descriptions, and business details, to facilitate the marketplace.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            2. Google API Services & Data Protection
                        </h2>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
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
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Limited Use.</span> Bventy's use and transfer to any other app of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy#limited-use" className="underline hover:text-white">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs shrink-0 font-bold">3</div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Data Integrity.</span> We do not use your Google data for advertising products or services, nor do we sell it to third party providers.</p>
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
                            3. Analytics and Operational Metrics
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                To maintain the health and performance of our platform, we use internal tools and privacy first analytics providers to understand how Bventy is functioning.
                            </p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h4 className="text-white font-medium">Service Integrity</h4>
                                        <p className="text-sm">We route technical telemetry through our own servers to ensure we have the necessary data to resolve bugs and improve platform responsiveness. This data is linked to your profile only when necessary for technical support.</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h4 className="text-white font-medium">Performance Metrics</h4>
                                        <p className="text-sm">We collect anonymous usage patterns to see which features are most helpful. We do not track your activity across other websites or services.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            4. Your Data. Your Control.
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                You are the owner of your data. Bventy provides clear tools to manage, export, or delete your information at any time.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4 items-center">
                                    <div className="h-2 w-2 rounded-full bg-white/20"></div>
                                    <p className="text-sm italic">You can revoke Google Calendar access instantly through your dashboard settings.</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="h-2 w-2 rounded-full bg-white/20"></div>
                                    <p className="text-sm italic">Permanent account deletion removes all associated personal data from our active databases.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="pt-20 border-t border-white/10">
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold tracking-tight">Contact Us</h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                    If you have questions about our privacy standards or wish to exercise your data rights, our team is ready to assist.
                                </p>
                                <p className="text-white font-medium">privacy@bventy.in</p>
                            </div>
                            <div className="text-white/30 text-xs flex flex-col justify-end">
                                <p>© {new Date().getFullYear()} Bventy. All rights reserved.</p>
                                <p className="mt-1 font-mono uppercase tracking-widest">Designed in India</p>
                            </div>
                        </div>
                    </section>

                </div>

            </div>
        </div>
    );
}
