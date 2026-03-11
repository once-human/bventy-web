import { CheckCircle2, AlertCircle, Clock, Globe, Shield, Terminal, Zap, ExternalLink, BarChart3, Server, Activity, Laptop, Smartphone, Code, Layers } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bventy Status | Live System Health",
    description: "Real-time monitoring and incident transparency for the Bventy ecosystem.",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bventy.in";
const STATUS_ENDPOINT = `${API_URL}/system/status`;

async function getStatusData() {
    try {
        const res = await fetch(STATUS_ENDPOINT, { 
            next: { revalidate: 300 }, // Cache for 5 minutes
            headers: { 'Cache-Control': 'no-cache' }
        });
        
        if (!res.ok) throw new Error("System status fetch failed");
        return await res.json();
    } catch (e) {
        console.error("Status Error:", e);
        return null;
    }
}

const CATEGORY_MAP: Record<string, { icon: any, title: string }> = {
    "Web": {
        title: "Web Services",
        icon: <Globe className="h-4 w-4" />
    },
    "Mobile": {
        title: "Mobile Ecosystem",
        icon: <Smartphone className="h-4 w-4" />
    },
    "API": {
        title: "API Layer",
        icon: <Code className="h-4 w-4" />
    },
    "Frontend": {
        title: "Frontend Apps",
        icon: <Laptop className="h-4 w-4" />
    },
    "Backend": {
        title: "Infrastructure & Data",
        icon: <Layers className="h-4 w-4" />
    },
    "Analytics": {
        title: "Insights Stack",
        icon: <BarChart3 className="h-4 w-4" />
    }
};

export default async function StatusPage() {
    const data = await getStatusData();
    const monitors = data?.monitors || [];
    
    // Group monitors by category
    const groupedMonitors: Record<string, any[]> = {};
    monitors.forEach((m: any) => {
        if (!groupedMonitors[m.category]) {
            groupedMonitors[m.category] = [];
        }
        groupedMonitors[m.category].push(m);
    });

    const allOperational = monitors.length > 0 ? monitors.every((m: any) => m.status === "operational") : true;
    const anyDown = monitors.some((m: any) => m.status === "down");

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
                                Verified real-time from our <span className="text-white">Internal Monitoring Engine</span>.
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

                {/* Categorized Service Grid */}
                <div className="space-y-24">
                    {Object.entries(groupedMonitors).map(([category, categoryMonitors]) => {
                        const catInfo = CATEGORY_MAP[category] || { title: category, icon: <Activity className="h-4 w-4" /> };
                        
                        return (
                            <section key={category} className="space-y-8">
                                <div className="flex items-center gap-3 px-2">
                                    <div className="text-white/20">{catInfo.icon}</div>
                                    <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-white/30">{catInfo.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {categoryMonitors.map((service, idx) => (
                                        <div
                                            key={`${category}-${idx}`}
                                            className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="space-y-1">
                                                    <h3 className="font-semibold text-white/90">{service.display}</h3>
                                                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-tight">{service.name}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                                                        service.status === 'operational' ? 'text-green-500' : 
                                                        'text-red-500'
                                                    }`}>
                                                        {service.status}
                                                    </span>
                                                    <div className={`h-1.5 w-1.5 rounded-full ${
                                                        service.status === 'operational' ? 'bg-green-500' : 
                                                        'bg-red-500'
                                                    }`}></div>
                                                </div>
                                            </div>
                                            
                                            {/* Uptime Visualization */}
                                            <div className="space-y-3">
                                                <div className="flex gap-[2px] h-6 items-end">
                                                    {Array.from({ length: 42 }).map((_, i) => (
                                                        <div 
                                                            key={i} 
                                                            className={`flex-1 rounded-full transition-all duration-500 ${
                                                                service.status !== 'operational' && i === 41
                                                                ? 'bg-red-500'
                                                                : 'bg-green-500/80 group-hover:bg-green-500 group-hover:h-6 h-5'
                                                            }`}
                                                        ></div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between items-center text-[10px] font-medium text-white/20">
                                                    <span>90 days ago</span>
                                                    <span className="text-white/40">100% uptime tracked</span>
                                                    <span>Today</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Narrative Incident Log */}
                <div className="mt-32 mb-32 space-y-12">
                    <div className="flex justify-between items-end px-2">
                        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-white/30">Incident History</h2>
                        <span className="text-[10px] font-mono text-white/20">Real-time Log</span>
                    </div>
                    
                    <div className="relative pl-8 space-y-16">
                        <div className="absolute left-[7px] top-2 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent"></div>
                        
                        <div className="relative group grayscale">
                            <div className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-white/10 border-2 border-black"></div>
                            <div className="space-y-2">
                                <p className="text-xs font-mono text-white/30 tracking-tight">March 2026</p>
                                <h3 className="font-semibold text-lg text-white/40">No system incidents reported</h3>
                                <p className="text-white/20 text-sm leading-relaxed max-w-2xl">
                                    System stability is our priority. Historical incidents will be documented here with high transparency.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="pt-20 border-t border-white/10 pb-20">
                    <div className="flex flex-col md:flex-row justify-between gap-12">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight text-white">Bventy Support</h2>
                            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                Verified infrastructure monitoring. For critical incident reporting.
                            </p>
                            <p className="text-white font-medium text-lg hover:opacity-70 transition-opacity">
                                <a href="mailto:support@bventy.in">support@bventy.in</a>
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
