'use client';

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Clock, Globe, Shield, Terminal, Zap, ExternalLink, BarChart3, Server, Activity, Laptop, Smartphone, Code, Layers } from "lucide-react";
import Link from "next/link";

const CATEGORY_MAP: Record<string, { icon: any, title: string }> = {
    "Web": { title: "Web Services", icon: <Globe className="h-4 w-4" /> },
    "API": { title: "API Layer", icon: <Code className="h-4 w-4" /> },
    "Frontend": { title: "Frontend Apps", icon: <Laptop className="h-4 w-4" /> },
    "Backend": { title: "Infrastructure & Data", icon: <Layers className="h-4 w-4" /> },
    "Insights Stack": { title: "Insights Stack", icon: <BarChart3 className="h-4 w-4" /> },
    "Analytics": { title: "Insights Stack", icon: <BarChart3 className="h-4 w-4" /> },
    "Communications": { title: "Communications", icon: <Zap className="h-4 w-4" /> }
};

export default function StatusDashboard({ data, isFallback }: { data: any, isFallback: boolean }) {
    const monitors = data.monitors;
    const incidents = data.incidents;
    const overallUptime = data.overall_uptime;
    const allOperational = data.allOperational;
    const anyDown = data.anyDown;
    const allOffline = data.allOffline;

    const groupedMonitors: Record<string, any[]> = {};
    monitors.forEach((m: any) => {
        if (!groupedMonitors[m.category]) groupedMonitors[m.category] = [];
        groupedMonitors[m.category].push(m);
    });

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
                                <span className="text-lg font-bold text-white/90">{overallUptime.toFixed(2)}%</span>
                            </div>
                            <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
                            <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10">
                                <div className={`h-2.5 w-2.5 rounded-full ${allOperational ? 'bg-green-500 status-pulse' : anyDown ? 'bg-red-500' : 'bg-white/20'}`}></div>
                                <span className="text-sm font-mono uppercase tracking-wider text-white/60">
                                    {isFallback ? "Tracking Offline" : "Live Tracking"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden group transition-all duration-500 hover:bg-white/[0.04]">
                        <div className={`absolute inset-0 ${allOperational ? 'bg-green-500/5' : anyDown ? 'bg-red-500/5' : 'bg-white/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                        <div className="space-y-3 relative">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                                {anyDown ? "Active Incident" : allOffline ? "Tracking Initializing" : allOperational ? "All Systems Operational" : "Partial Tracking Active"}
                            </h1>
                            <p className="text-white/50 font-medium text-base md:text-lg max-w-2xl">
                                {isFallback ? "Real-time monitoring engine unreachable. Systems currently untracked." : <>Deep health verification every 30 minutes by our <span className="text-white">Internal Monitoring Engine</span>.</>}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 relative">
                            <div className={`h-16 w-16 rounded-3xl ${allOperational ? 'bg-green-500/10 border-green-500/20' : anyDown ? 'bg-red-500/10 border-red-500/20' : 'bg-white/10 border-white/20'} border flex items-center justify-center transform rotate-6 group-hover:rotate-0 transition-transform duration-500`}>
                                {allOperational ? <CheckCircle2 className="h-8 w-8 text-green-500" /> : anyDown ? <AlertCircle className="h-8 w-8 text-red-500" /> : <Activity className="h-8 w-8 text-white/20" />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categorized Service Grid */}
                <div className="space-y-16">
                    {Object.entries(groupedMonitors).map(([category, categoryMonitors]) => (
                        <MonitorGroup key={category} category={category} monitors={categoryMonitors} />
                    ))}
                </div>

                {/* Real Incident Log */}
                <div className="mt-32 mb-40 space-y-12">
                    <div className="flex justify-between items-end px-2">
                        <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-white/40">Incident History</h2>
                        <span className="text-[12px] font-mono text-white/20 uppercase tracking-widest underline decoration-white/5 underline-offset-8 font-bold">Real-time Automated Log</span>
                    </div>
                    
                    <div className="relative pl-12 space-y-16">
                        <div className="absolute left-[7px] top-2 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent"></div>
                        {incidents.length === 0 ? (
                            <div className="relative group grayscale opacity-60">
                                <div className="absolute -left-[40px] top-1.5 h-5 w-5 rounded-full bg-white/10 border-2 border-black"></div>
                                <div className="space-y-3">
                                    <p className="text-[12px] font-mono text-white/30 uppercase tracking-[0.3em]">System Status</p>
                                    <h3 className="font-bold text-xl text-white/40 tracking-tight">No system incidents reported</h3>
                                    <p className="text-white/30 text-base leading-relaxed max-w-2xl font-medium">
                                        All ecosystem nodes have been monitored with extreme stability over the recent tracking window.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            incidents.map((inc: any) => (
                                <div key={inc.id} className="relative group animate-in fade-in slide-in-from-left-4 duration-700">
                                    <div className={`absolute -left-[40px] top-1.5 h-5 w-5 rounded-full border-2 border-black transition-all duration-500 group-hover:scale-125 ${inc.status === 'resolved' ? 'bg-white/20' : 'bg-red-500 status-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}></div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4">
                                            <p className="text-[12px] font-mono text-white/50 tracking-widest uppercase font-bold">
                                                {new Date(inc.created_at).toLocaleDateString()} — {inc.monitor_name}
                                            </p>
                                            <span className={`px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-widest ${inc.status === 'resolved' ? 'bg-white/10 text-white/40' : 'bg-red-500/10 text-red-500'}`}>
                                                {inc.status}
                                            </span>
                                        </div>
                                        <h3 className={`font-bold text-2xl tracking-tight ${inc.status === 'resolved' ? 'text-white/60' : 'text-white'}`}>
                                            {inc.issue_type}
                                        </h3>
                                        <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-2xl font-medium italic">
                                            "{inc.description}" {inc.resolved_at && <span className="not-italic text-white/20 ml-2">— Resolved after health node verification at {new Date(inc.resolved_at).toLocaleTimeString()}.</span>}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <footer className="pt-20 border-t border-white/10 pb-24">
                    <div className="flex flex-col md:flex-row justify-between gap-16">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold tracking-tight text-white">Bventy Status System</h2>
                            <p className="text-white/40 text-lg leading-relaxed max-w-md">
                                Independent monitoring nodes verify service availability every 30 minutes. Transparency is our baseline.
                            </p>
                            <p className="text-white font-bold text-lg hover:opacity-70 transition-opacity">
                                <a href="mailto:support@bventy.in">support@bventy.in</a>
                            </p>
                        </div>
                        <div className="flex flex-col justify-end md:items-end space-y-3">
                            <p className="text-white/40 text-lg">© {new Date().getFullYear()} Bventy. System Integrity Verified.</p>
                            <p className="text-white/10 text-[14px] font-mono uppercase tracking-[0.2em] font-black">DESIGNED IN INDIA</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

function MonitorGroup({ category, monitors }: { category: string, monitors: any[] }) {
    const catInfo = CATEGORY_MAP[category] || { title: category, icon: <Activity className="h-4 w-4" /> };
    return (
        <section className="space-y-8">
            <div className="flex items-center gap-4 px-2">
                <div className="text-white/20 transform scale-125">{catInfo.icon}</div>
                <h2 className="text-sm font-mono uppercase tracking-[0.35em] text-white/40 font-black">{catInfo.title}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {monitors.map((service, idx) => <MonitorCard key={idx} service={service} />)}
            </div>
        </section>
    );
}

function MonitorCard({ service }: { service: any }) {
    const [hoveredStat, setHoveredStat] = useState<any>(null);
    const dailyStats = service.daily_stats || [];
    const bars = Array.from({ length: 90 }).map((_, i) => dailyStats[i] || { date: '', uptime_percentage: -1, avg_latency_ms: 0 }).reverse();

    return (
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group relative">
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                    <h3 className="text-lg font-black text-white/90 tracking-tight">{service.display}</h3>
                    <div className="space-y-1">
                        <p className="text-[12px] font-mono text-white/20 uppercase tracking-widest font-black leading-none">{service.name}</p>
                        <div className="flex items-center gap-3">
                            <span className="text-[14px] font-bold text-white/40 tracking-tight">{service.uptime_percentage.toFixed(2)}% uptime</span>
                            <span className="text-[14px] text-white/20">• {service.avg_latency_ms}ms</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-1.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className={`text-[11px] font-black uppercase tracking-[0.15em] ${service.status === 'operational' ? 'text-green-500' : service.status === 'down' ? 'text-red-500' : service.status === 'degraded' ? 'text-yellow-500' : 'text-white/20'}`}>
                        {service.status}
                    </span>
                    <div className={`h-2 w-2 rounded-full ${service.status === 'operational' ? 'bg-green-500 status-pulse' : service.status === 'down' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : service.status === 'degraded' ? 'bg-yellow-500' : 'bg-white/10'}`}></div>
                </div>
            </div>
            
            <div className="space-y-5" onMouseLeave={() => setHoveredStat(null)}>
                <div className="flex gap-[2px] h-6 items-end relative">
                    {bars.map((stat, i) => {
                        const color = stat.uptime_percentage === -1 ? 'bg-white/5' : stat.uptime_percentage === 100 ? 'bg-green-500/40 hover:bg-green-500' : stat.uptime_percentage === 50 ? 'bg-yellow-500/50 hover:bg-yellow-500' : 'bg-red-500/60 hover:bg-red-500';
                        const height = stat.uptime_percentage === -1 ? 'h-3' : 'h-6';
                        return (
                            <div 
                                key={i} 
                                className={`flex-1 rounded-[1px] transition-all duration-300 cursor-crosshair hover:scale-y-125 ${color} ${height}`}
                                onMouseEnter={() => setHoveredStat(stat)}
                            />
                        );
                    })}

                    {/* Shared Single Instance Tooltip */}
                    {hoveredStat && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 pointer-events-none animate-in fade-in zoom-in-95 duration-200 z-[100]">
                            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 px-5 shadow-[0_30px_60px_rgba(0,0,0,1)] flex flex-col gap-3 min-w-[200px] backdrop-blur-3xl">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] font-mono text-white/30 uppercase tracking-[0.25em] font-bold">
                                        {hoveredStat.date ? new Date(hoveredStat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Snapshot'}
                                    </span>
                                    <span className="text-base font-black text-white/90">Diagnostic Data</span>
                                </div>
                                <div className="space-y-3 border-t border-white/5 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[12px] font-bold text-white/40 uppercase tracking-tighter">Stability</span>
                                        <span className={`text-[12px] font-black uppercase tracking-widest ${hoveredStat.uptime_percentage === 100 ? 'text-green-500' : hoveredStat.uptime_percentage === 50 ? 'text-yellow-500' : hoveredStat.uptime_percentage === 0 ? 'text-red-500' : 'text-white/10'}`}>
                                            {hoveredStat.uptime_percentage === -1 ? 'N/A' : hoveredStat.uptime_percentage === 100 ? 'Stable' : hoveredStat.uptime_percentage === 50 ? 'Blip' : 'Down'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[12px] font-bold text-white/40 uppercase tracking-tighter">Response</span>
                                        <span className="text-[12px] font-black text-white/80 font-mono tracking-tight">{hoveredStat.avg_latency_ms}ms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="flex justify-between items-center text-[13px] font-mono font-black text-white/20 uppercase tracking-[0.25em]">
                    <span>90 Days</span>
                    <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.01]">
                        <Activity className="h-3.5 w-3.5 text-white/10" />
                        <span className="text-[12px] font-black text-white/40 tracking-[0.3em] uppercase">Active</span>
                    </div>
                    <span>Today</span>
                </div>
            </div>
        </div>
    );
}
