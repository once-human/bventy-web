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

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                    Terms of Service
                </h1>

                <p className="text-white/70 text-lg leading-relaxed mb-12">
                    Effective Date: March 8, 2026<br />
                    Welcome to Bventy. By using our platform, you agree to these terms. Please read them carefully.
                </p>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-white/70 leading-relaxed">
                            By accessing or using Bventy, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-4">
                            2. Use License
                        </h2>
                        <div className="space-y-4 text-white/70 leading-relaxed">
                            <p>
                                Bventy is an open-source platform. While the source code is available under its respective license, our hosted service ("Bventy Cloud") is subject to these terms.
                            </p>
                            <p>
                                You may not use the platform for any illegal purpose, to harass others, or to distribute spam. We reserve the right to terminate accounts that violate these guidelines.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-4">
                            3. Calendar Synchronization
                        </h2>
                        <div className="space-y-4 text-white/70 leading-relaxed">
                            <p>
                                Our platform offers a Google Calendar synchronization feature for vendors. By enabling this feature:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>You represent that you have the authority to grant us access to the connected Google account.</li>
                                <li>You understand that Bventy will read your busy slots to update your availability and write new events for confirmed bookings.</li>
                                <li>Maintaining the accuracy of your synced calendar is your responsibility. Bventy is not liable for missed bookings or scheduling conflicts due to sync delays or user error.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-4">
                            4. Disclaimer
                        </h2>
                        <p className="text-white/70 leading-relaxed">
                            The materials on Bventy's website are provided on an 'as is' basis. Bventy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-4">
                            5. Limitations
                        </h2>
                        <p className="text-white/70 leading-relaxed">
                            In no event shall Bventy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Bventy's website, even if Bventy or a Bventy authorized representative has been notified orally or in writing of the possibility of such damage.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight mb-4">
                            6. Governing Law
                        </h2>
                        <p className="text-white/70 leading-relaxed">
                            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
                    <p>© {new Date().getFullYear()} Bventy. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
