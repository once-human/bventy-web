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
            next: { revalidate: 60 }, // Shorter revalidation for faster feedback
            headers: { 'Cache-Control': 'no-cache' }
        });
        
        if (!res.ok) throw new Error(`System status fetch failed with status ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error("Status Error:", e);
        return null;
    }
}

const DEFAULT_MONITORS = [
    { Name: "bventy.in", Display: "Website", Category: "Web", Status: "offline" },
    { Name: "app.bventy.in", Display: "User Portal", Category: "Web", Status: "offline" },
    { Name: "auth.bventy.in", Display: "Auth Service", Category: "Frontend", Status: "offline" },
    { Name: "partner.bventy.in", Display: "Partner Portal", Category: "Frontend", Status: "offline" },
    { Name: "admin.bventy.in", Display: "Admin Panel", Category: "Frontend", Status: "offline" },
    { Name: "api.bventy.in", Display: "Core API", Category: "API", Status: "offline" },
    { Name: "Neon", Display: "PostgreSQL Database", Category: "Backend", Status: "offline" },
    { Name: "Render", Display: "Compute Engine", Category: "Backend", Status: "offline" },
    { Name: "Cloudflare R2", Display: "Object Storage", Category: "Backend", Status: "offline" },
    { Name: "PostHog", Display: "User Analytics", Category: "Analytics", Status: "offline" },
    { Name: "Umami", Display: "Web Analytics", Category: "Analytics", Status: "offline" },
    { Name: "Resend", Display: "Email Delivery", Category: "Communications", Status: "offline" },
];

const CATEGORY_MAP: Record<string, { icon: any, title: string }> = {
    "Web": {
        title: "Web Services",
        icon: <Globe className="h-4 w-4" />
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
    },
    "Communications": {
        title: "Communications",
        icon: <Zap className="h-4 w-4" />
    }
};

export default async function StatusPage() {
    const data = await getStatusData();
    const isFallback = !data?.monitors || data.monitors.length === 0;
    
    const monitors = !isFallback ? data.monitors : DEFAULT_MONITORS.map(m => ({
        name: m.Name,
        display: m.Display,
        category: m.Category,
        status: m.Status,
        uptime_percentage: 100,
        avg_latency_ms: 0,
        daily_stats: []
    }));

    const incidents = data?.incidents || [];
    const overallUptime = data?.overall_uptime || 100;
    
    // Group monitors by category
    const groupedMonitors: Record<string, any[]> = {};
    monitors.forEach((m: any) => {
        if (!groupedMonitors[m.category]) {
            groupedMonitors[m.category] = [];
        }
        groupedMonitors[m.category].push(m);
    });

    const anyDown = monitors.some((m: any) => m.status === "down");
    const allOffline = monitors.length > 0 && monitors.every((m: any) => m.status === "offline");
    const anyOffline = monitors.some((m: any) => m.status === "offline");
    const anyOperational = monitors.some((m: any) => m.status === "operational");
    
    // Deeper logic: 
    // - Operational if at least one is up and none are down. 
    // - Incident if any are down. 
    // - Initializing ONLY if all are offline.
    const allOperational = monitors.length > 0 && !isFallback && !anyDown && !allOffline;

    return (
        <div className="min-h-screen bg-black text-white px-6 py-12 md:py-20 flex justify-center selection:bg-white selection:text-black antialiased font-sans">
            <div className="max-w-6xl w-full">
                
                {/* Header Section */}
                <div className="mb-12 space-y-6">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
                            Bventy<span className="text-white/40">Status</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-mono uppercase tracking-widest text-white/30">Global Uptime (90d)</span>
                                <span className="text-base font-bold text-white/90">{overallUptime.toFixed(2)}%</span>
                            </div>
                            <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                                <div className={`h-2 w-2 rounded-full ${allOperational ? 'bg-green-500 status-pulse' : anyDown ? 'bg-red-500' : 'bg-white/20'}`}></div>
                                <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                                    {isFallback ? "Tracking Offline" : "Live Tracking"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div 
                        className={`p-8 md:p-10 rounded-[2rem] bg-white/[0.03] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden group transition-all duration-500 hover:bg-white/[0.04]`}
                    >
                        <div className={`absolute inset-0 ${allOperational ? 'bg-green-500/5' : anyDown ? 'bg-red-500/5' : 'bg-white/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                        <div className="space-y-2 relative">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                                {anyDown ? "Active Incident" : allOffline ? "Tracking Initializing" : allOperational ? "All Systems Operational" : "Partial Tracking Active"}
                            </h1>
                            <p className="text-white/50 font-medium text-sm md:text-base max-w-2xl">
                                {isFallback ? "Real-time monitoring engine unreachable. Systems currently untracked." : <>Deep health verification every 30 minutes by our <span className="text-white">Internal Monitoring Engine</span>.</>}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 relative">
                            <div className={`h-12 w-12 rounded-full ${allOperational ? 'bg-green-500/10 border-green-500/20' : anyDown ? 'bg-red-500/10 border-red-500/20' : 'bg-white/10 border-white/20'} border flex items-center justify-center`}>
                                {allOperational ? (
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                ) : anyDown ? (
                                    <AlertCircle className="h-6 w-6 text-red-500" />
                                ) : (
                                    <Activity className="h-6 w-6 text-white/20" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categorized Service Grid */}
                <div className="space-y-12">
                    {Object.entries(groupedMonitors).map(([category, categoryMonitors]) => {
                        const catInfo = CATEGORY_MAP[category] || { title: category, icon: <Activity className="h-4 w-4" /> };
                        
                        return (
                                    <section key={category} className="space-y-6">
                                        <div className="flex items-center gap-3 px-2">
                                            <div className="text-white/20">{catInfo.icon}</div>
                                            <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">{catInfo.title}</h2>
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                            {categoryMonitors.map((service, idx) => {
                                                const dailyStats = service.daily_stats || [];
                                                const bars = Array.from({ length: 90 }).map((_, i) => {
                                                    const stat = dailyStats[i];
                                                    return stat || { date: '', uptime_percentage: -1, avg_latency_ms: 0 };
                                                }).reverse();

                                                return (
                                                    <div
                                                        key={`${category}-${idx}`}
                                                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group shadow-2xl"
                                                    >
                                                        <div className="flex justify-between items-start mb-5">
                                                            <div className="space-y-1.5">
                                                                <h3 className="text-base font-bold text-white/90">{service.display}</h3>
                                                                <div className="space-y-0.5">
                                                                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{service.name}</p>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[11px] font-bold text-white/50">{service.uptime_percentage.toFixed(2)}% uptime</span>
                                                                        <span className="text-[11px] text-white/30">• {service.avg_latency_ms}ms</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
                                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                                                                    service.status === 'operational' ? 'text-green-500' : 
                                                                    service.status === 'down' ? 'text-red-500' :
                                                                    'text-white/30'
                                                                }`}>
                                                                    {service.status}
                                                                </span>
                                                                <div className={`h-1.5 w-1.5 rounded-full ${
                                                                    service.status === 'operational' ? 'bg-green-500 status-pulse' : 
                                                                    service.status === 'down' ? 'bg-red-500' :
                                                                    'bg-white/10'
                                                                }`}></div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Daily Visualization (90 dots) */}
                                                        <div className="space-y-4">
                                                            <div className="flex gap-[2px] h-5 items-end">
                                                                {bars.map((stat, i) => {
                                                                    const color = stat.uptime_percentage === -1 ? 'bg-white/5' :
                                                                                stat.uptime_percentage === 100 ? 'bg-green-500/40 hover:bg-green-500 hover:scale-y-125' :
                                                                                'bg-red-500/60 hover:bg-red-500 hover:scale-y-125';
                                                                    const height = stat.uptime_percentage === -1 ? 'h-2.5' :
                                                                                stat.uptime_percentage === 100 ? 'h-5' : 'h-5';
                                                                    
                                                                    const dateStr = stat.date ? new Date(stat.date).toLocaleDateString() : 'Unknown Date';
                                                                    const latencyStr = stat.avg_latency_ms ? `${stat.avg_latency_ms}ms` : '0ms';

                                                                    return (
                                                                        <div key={i} className="flex-1 relative group">
                                                                            <div className={`w-full rounded-[1px] transition-all duration-500 cursor-crosshair ${color} ${height}`}></div>
                                                                            
                                                                            {/* Custom Premium Tooltip */}
                                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 transform translate-y-2 group-hover:translate-y-0">
                                                                                <div className="bg-[#0A0A0A] border border-white/10 rounded-xl py-3 px-4 shadow-[0_30px_60px_rgba(0,0,0,1)] flex flex-col gap-2 min-w-[170px] backdrop-blur-xl">
                                                                                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-1">
                                                                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{dateStr}</span>
                                                                                        <div className={`h-2 w-2 rounded-full ${stat.uptime_percentage === 100 ? 'bg-green-500' : stat.uptime_percentage === -1 ? 'bg-white/10' : 'bg-red-500'}`}></div>
                                                                                    </div>
                                                                                    <div className="space-y-1.5">
                                                                                        <div className="flex justify-between items-center">
                                                                                            <span className="text-xs text-white/50">Service Uptime</span>
                                                                                            <span className="text-xs font-bold text-white">{stat.uptime_percentage === -1 ? 'N/A' : `${stat.uptime_percentage.toFixed(1)}%`}</span>
                                                                                        </div>
                                                                                        <div className="flex justify-between items-center">
                                                                                            <span className="text-xs text-white/50">Response Time</span>
                                                                                            <span className="text-xs font-bold text-white/90">{latencyStr}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {/* Tooltip Arrow */}
                                                                                <div className="w-2.5 h-2.5 bg-[#0A0A0A] border-r border-b border-white/10 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                            <div className="flex justify-between items-center text-[9px] font-mono font-bold text-white/20 uppercase tracking-[0.2em]">
                                                                <span>90 Days Ago</span>
                                                                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.01]">
                                                                    <Activity className="h-2.5 w-2.5 text-white/10" />
                                                                    <span className="text-[8px] tracking-[0.1em]">Verification Engine Active</span>
                                                                </div>
                                                                <span>Today</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
        
                        {/* Real Incident Log */}
                        <div className="mt-28 mb-32 space-y-10">
                            <div className="flex justify-between items-end px-2">
                                <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">Incident History</h2>
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest underline decoration-white/5 underline-offset-8">Real-time Automated Log</span>
                            </div>
                            
                            <div className="relative pl-10 space-y-14">
                                <div className="absolute left-[7px] top-2 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent"></div>
                                
                                {incidents.length === 0 ? (
                                    <div className="relative group grayscale opaity-60">
                                        <div className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full bg-white/10 border-2 border-black"></div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">System Status</p>
                                            <h3 className="font-bold text-lg text-white/40 tracking-tight">No system incidents reported</h3>
                                            <p className="text-white/30 text-sm leading-relaxed max-w-2xl font-medium">
                                                All ecosystem nodes have been monitored with extreme stability over the recent tracking window.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    incidents.map((inc: any) => (
                                        <div key={inc.id} className="relative group animate-in fade-in slide-in-from-left-4 duration-700">
                                            <div className={`absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-black transition-all duration-500 group-hover:scale-125 ${inc.status === 'resolved' ? 'bg-white/20' : 'bg-red-500 status-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}></div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-4">
                                                    <p className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                                                        {new Date(inc.created_at).toLocaleDateString()} — {inc.monitor_name}
                                                    </p>
                                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${inc.status === 'resolved' ? 'bg-white/10 text-white/40' : 'bg-red-500/10 text-red-500'}`}>
                                                        {inc.status}
                                                    </span>
                                                </div>
                                                <h3 className={`font-bold text-xl tracking-tight ${inc.status === 'resolved' ? 'text-white/60' : 'text-white'}`}>
                                                    {inc.issue_type}
                                                </h3>
                                                <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-2xl font-medium italic">
                                                    "{inc.description}" {inc.resolved_at && <span className="not-italic text-white/20 ml-2">— Resolved after automated health node verification at {new Date(inc.resolved_at).toLocaleTimeString()}.</span>}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                {/* Footer Section */}
                <footer className="pt-16 border-t border-white/10 pb-20">
                    <div className="flex flex-col md:flex-row justify-between gap-12">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold tracking-tight text-white">Bventy Status System</h2>
                            <p className="text-white/40 text-xs leading-relaxed max-w-xs">
                                Independent monitoring nodes verify service availability every 30 minutes. Transparency is our baseline.
                            </p>
                            <p className="text-white font-medium text-base hover:opacity-70 transition-opacity">
                                <a href="mailto:support@bventy.in">support@bventy.in</a>
                            </p>
                        </div>
                        <div className="flex flex-col justify-end md:items-end space-y-2">
                            <p className="text-white/40 text-xs">© {new Date().getFullYear()} Bventy. System Integrity Verified.</p>
                            <p className="text-white/10 text-[9px] font-mono uppercase tracking-[0.15em]">DESIGNED IN INDIA</p>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}
