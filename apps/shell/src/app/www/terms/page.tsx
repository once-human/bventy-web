import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service | Bventy",
    description: "Bventy's terms of service and usage guidelines.",
};

export default function TermsOfServicePage() {
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
                        Terms of Service. Clear and simple.
                    </h1>
                    <p className="text-white/50 font-medium">Last updated: March 11, 2026</p>
                </div>

                <p className="text-white/70 text-xl leading-relaxed mb-16">
                    These Terms of Service govern your use of Bventy. By accessing our platform, you agree to these terms. We have designed them to be easy to understand, reflecting our commitment to transparency and mutual respect.
                </p>

                <div className="space-y-20">

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            1. The Bventy Marketplace
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                Bventy provides a sophisticated platform to connect Event Organizers with professional Vendors. We are the architects of this marketplace, facilitating connections and providing tools for seamless planning.
                            </p>
                            <p>
                                It is important to note that Bventy does not provide the event services or vendor services ourselves. Any agreement for services is directly between the Organizer and the Vendor.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            2. Account Responsibilities
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                To use certain features of Bventy, you must create an account. You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account.
                            </p>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-white font-medium mb-2">Professional Conduct</h3>
                                <p className="text-sm">We expect all users to interact with professional courtesy. Harassment, spam, or any illegal activity will result in immediate termination of account access.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            3. Calendar Synchronization
                        </h2>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
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
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Accuracy.</span> While we aim for perfect synchronization, you are responsible for the ultimate accuracy of your calendar and availability.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-white/20 mt-2 shrink-0"></div>
                                    <p className="text-white/70 text-sm"><span className="text-white font-medium">Service Continuity.</span> We are not liable for scheduling conflicts arising from sync delays, technical interruptions, or third party service outages.</p>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            4. Intellectual Property
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed">
                            <p>
                                You retain ownership of the content you upload to Bventy. By sharing content on our platform, you grant Bventy a non exclusive license to display and distribute that content to facilitate our services.
                            </p>
                            <p>
                                The Bventy brand, platform design, and original software are the intellectual property of Bventy and are protected by applicable copyright and trademark laws.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-6">
                            5. Limitation of Liability
                        </h2>
                        <div className="space-y-6 text-white/70 leading-relaxed italic text-sm">
                            <p>
                                Bventy is provided on an "as is" and "as available" basis. To the maximum extent permitted by law, Bventy shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the platform.
                            </p>
                            <p>
                                We do not guarantee that the platform will be uninterrupted or error free. Your use of Bventy is at your own professional risk.
                            </p>
                        </div>
                    </section>

                    <section className="pt-20 border-t border-white/10">
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold tracking-tight">Legal Inquiry</h2>
                                <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                    For formal legal notices or questions regarding these terms, please contact our administrative team.
                                </p>
                                <p className="text-white font-medium">legal@bventy.in</p>
                            </div>
                            <div className="text-white/30 text-xs flex flex-col justify-end">
                                <p>© {new Date().getFullYear()} Bventy. All rights reserved.</p>
                            </div>
                        </div>
                    </section>

                </div>

                <div className="mt-12 flex gap-6 text-white/40 text-sm">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                </div>
            </div>
        </div>
    );
}
