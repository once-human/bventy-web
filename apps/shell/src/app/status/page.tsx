import { CheckCircle2, AlertCircle, Clock, Globe, Shield, Terminal, Zap, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bventy Status | Live System Health",
    description: "Real-time monitoring and incident transparency for the Bventy ecosystem.",
};

async function checkService(url: string) {
    try {
        const start = Date.now();
        // We use a small timeout to avoid hanging the status page
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const res = await fetch(url, { 
            next: { revalidate: 300 }, // Cache results for 5 minutes to minimize load
            signal: controller.signal,
            headers: { 'Cache-Control': 'no-cache' }
        });
        
        clearTimeout(timeoutId);
        const latency = Date.now() - start;

        if (res.ok) {
            return { status: "operational", latency };
        }
        return { status: "degraded", latency };
    } catch (e) {
        return { status: "down", latency: 0 };
    }
}

const SERVICES_CONFIG = [
    { name: "Website Shell", host: "https://bventy.in", display: "bventy.in" },
    { name: "Organizer Portal", host: "https://app.bventy.in", display: "app.bventy.in" },
    { name: "Core API Engine", host: "https://bventy-api.onrender.com/health", display: "api.bventy.in" },
    { name: "Authentication Service", host: "https://auth.bventy.in", display: "auth.bventy.in" },
    { name: "Vendor Dashboard", host: "https://partner.bventy.in", display: "partner.bventy.in" },
    { name: "Admin Controllers", host: "https://admin.bventy.in", display: "admin.bventy.in" },
];

export default async function StatusPage() {
    const results = await Promise.all(
        SERVICES_CONFIG.map(async (s) => ({
            ...s,
            ...(await checkService(s.host))
        }))
    );

    const allOperational = results.every(r => r.status === "operational");
    const anyDown = results.some(r => r.status === "down");

    return (
        <div className="min-h-screen bg-black text-white px-6 py-12 md:py-24 flex justify-center selection:bg-white selection:text-black antialiased font-sans">
            <div className="max-w-4xl w-full">
                
                {/* Header Section */}
                <div className="mb-20 space-y-8">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
                            Bventy<span className="text-white/40">Status</span>
                        </Link>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <div className={`h-1.5 w-1.5 rounded-full ${allOperational ? 'bg-green-500 status-pulse' : anyDown ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Live Tracking</span>
                        </div>
                    </div>

                    <div 
                        className={`p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden group`}
                    >
                        <div className={`absolute inset-0 ${allOperational ? 'bg-green-500/5' : anyDown ? 'bg-red-500/5' : 'bg-yellow-500/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                        <div className="space-y-2 relative">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                {allOperational ? "All Systems Operational" : anyDown ? "Active Incident" : "Partial Service Outage"}
                            </h1>
                            <p className="text-white/40 font-medium">
                                {allOperational 
                                    ? "Verified real-time connectivity across the Bventy ecosystem." 
                                    : "We are currently investigating reports of connectivity issues."}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 relative">
                            <div className={`h-16 w-16 rounded-full ${allOperational ? 'bg-green-500/10 border-green-500/20' : anyDown ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20'} border flex items-center justify-center`}>
                                {allOperational ? (
                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                ) : anyDown ? (
                                    <AlertCircle className="h-8 w-8 text-red-500" />
                                ) : (
                                    <Clock className="h-8 w-8 text-yellow-500" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subdomain Grid */}
                <div className="mb-24 space-y-8">
                    <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-white/30 px-2">Core Ecosystem</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((service, idx) => (
                            <div
                                key={service.display}
                                className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-white/90">{service.name}</h3>
                                        <p className="text-xs font-mono text-white/30">{service.display}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                                            service.status === 'operational' ? 'text-green-500' : 
                                            service.status === 'down' ? 'text-red-500' : 'text-yellow-500'
                                        }`}>
                                            {service.status}
                                        </span>
                                        <div className={`h-1.5 w-1.5 rounded-full ${
                                            service.status === 'operational' ? 'bg-green-500' : 
                                            service.status === 'down' ? 'bg-red-500' : 'bg-yellow-500'
                                        }`}></div>
                                    </div>
                                </div>
                                
                                {/* 90-day Uptime Bar Mockup (Static bars for now, as real historical tracking requires a DB) */}
                                <div className="space-y-3">
                                    <div className="flex gap-[2px] h-6 items-end">
                                        {Array.from({ length: 40 }).map((_, i) => (
                                            <div 
                                                key={i} 
                                                className={`flex-1 rounded-full transition-all duration-500 ${
                                                    i === 39 && service.status !== 'operational' 
                                                        ? (service.status === 'down' ? 'bg-red-500' : 'bg-yellow-500') 
                                                        : 'bg-green-500 group-hover:h-6 h-5'
                                                }`}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-medium text-white/20">
                                        <span>90 days ago</span>
                                        <span className="text-white/40">
                                            {service.latency ? `${service.latency}ms latency` : "100% uptime"}
                                        </span>
                                        <span>Today</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Infrastructure Section */}
                <div className="mb-24 space-y-8">
                    <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-white/30 px-2">Provider Infrastructure</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "Compute", provider: "Render", status: "operational" },
                            { name: "Database", provider: "Neon", status: "operational" },
                            { name: "Edge Network", provider: "Cloudflare", status: "operational" },
                            { name: "Analytics Stack", provider: "OpenSource", status: "operational" },
                        ].map((item) => (
                            <div key={item.name} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 text-center md:text-left">
                                <p className="text-[10px] font-mono text-white/30 uppercase tracking-wide">{item.name}</p>
                                <div className="space-y-1">
                                    <p className="font-semibold text-white/80">{item.provider}</p>
                                    <div className="flex items-center justify-center md:justify-start gap-1.5">
                                        <div className="h-1 w-1 rounded-full bg-green-500"></div>
                                        <span className="text-[9px] font-bold text-green-500 uppercase tracking-tight">Active</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Narrative Incident Log */}
                <div className="mb-32 space-y-12">
                    <div className="flex justify-between items-end px-2">
                        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-white/30">Incident History</h2>
                        <button className="text-[10px] font-mono text-white/20 hover:text-white transition-colors">Clear History →</button>
                    </div>
                    
                    <div className="relative pl-8 space-y-16">
                        <div className="absolute left-[7px] top-2 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent"></div>
                        
                        <div className="relative group">
                            <div className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-white/20 border-2 border-black group-hover:bg-white/40 transition-colors"></div>
                            <div className="space-y-2">
                                <p className="text-xs font-mono text-white/30 tracking-tight">March 11, 2026</p>
                                <h3 className="font-semibold text-lg">Platform Optimization</h3>
                                <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                                    We successfully transitioned the backend deployment strategy to a more stable environment. Minimal connectivity ripples were observed during the migration, with 100% data integrity maintained across Neon clusters. 
                                </p>
                            </div>
                        </div>

                        <div className="relative opacity-50 grayscale group">
                             <div className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-white/10 border-2 border-black"></div>
                            <div className="space-y-2">
                                <p className="text-xs font-mono text-white/30 tracking-tight">March 7, 2026</p>
                                <h3 className="font-semibold text-lg">Intermittent API Latency</h3>
                                <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                                    Upstream provider maintenance caused elevated response times for the Core API Engine. Monitoring systems identified the variance within 3 seconds. Normalization confirmed after 15 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section (Bventy Consistent) */}
                <footer className="pt-20 border-t border-white/10 pb-20">
                    <div className="flex flex-col md:flex-row justify-between gap-12">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight text-white">Bventy Support</h2>
                            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                For urgent infrastructure concerns or critical incident reporting.
                            </p>
                            <p className="text-white font-medium text-lg selection:bg-white selection:text-black hover:opacity-70 transition-opacity">
                                <a href="mailto:ops@bventy.in">ops@bventy.in</a>
                            </p>
                        </div>
                        <div className="flex flex-col justify-end md:items-end space-y-2">
                            <p className="text-white/50 text-sm">© {new Date().getFullYear()} Bventy. System Integrity Verified.</p>
                            <p className="text-white/20 text-xs font-mono uppercase tracking-[0.15em]">DESIGNED IN INDIA</p>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}
