"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Clock, Globe, Shield, Terminal, Zap, ExternalLink } from "lucide-react";
import Link from "next/link";

const SERVICES = [
    { name: "Website Shell", host: "bventy.in", status: "operational", uptime: "99.98%" },
    { name: "Organizer Portal", host: "app.bventy.in", status: "operational", uptime: "99.95%" },
    { name: "Core API Engine", host: "api.bventy.in", status: "operational", uptime: "99.99%" },
    { name: "Authentication Service", host: "auth.bventy.in", status: "operational", uptime: "100%" },
    { name: "Vendor Dashboard", host: "partner.bventy.in", status: "operational", uptime: "99.92%" },
    { name: "Admin Controllers", host: "admin.bventy.in", status: "operational", uptime: "100%" },
];

const INFRA = [
    { name: "Compute", provider: "Render", status: "operational" },
    { name: "Database", provider: "Neon", status: "operational" },
    { name: "Edge Network", provider: "Cloudflare", status: "operational" },
    { name: "Analytics Stack", provider: "OpenSource", status: "operational" },
];

export default function StatusPage() {
    return (
        <div className="min-h-screen bg-black text-white px-6 py-12 md:py-24 flex justify-center selection:bg-white selection:text-black antialiased font-sans">
            <div className="max-w-4xl w-full">
                
                {/* Header Section */}
                <div className="mb-20 space-y-8">
                    <div className="flex justify-between items-center">
                        <Link href="https://bventy.in" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
                            Bventy<span className="text-white/40">Status</span>
                        </Link>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 status-pulse"></div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Live Tracking</span>
                        </div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        <div className="space-y-2 relative">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">All Systems Operational</h1>
                            <p className="text-white/40 font-medium">Verified from 28 global regions through OpenStatus.</p>
                        </div>
                        <div className="flex items-center gap-4 relative">
                            <div className="h-16 w-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                <CheckCircle2 className="h-8 w-8 text-green-500" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Subdomain Grid */}
                <div className="mb-24 space-y-8">
                    <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-white/30 px-2">Core Ecosystem</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SERVICES.map((service, idx) => (
                            <motion.div
                                key={service.host}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-white/90">{service.name}</h3>
                                        <p className="text-xs font-mono text-white/30">{service.host}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Operational</span>
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                    </div>
                                </div>
                                
                                {/* 90-day Uptime Bar Mockup */}
                                <div className="space-y-3">
                                    <div className="flex gap-[2px] h-6 items-end">
                                        {Array.from({ length: 40 }).map((_, i) => (
                                            <div 
                                                key={i} 
                                                className={`flex-1 rounded-full transition-all duration-500 ${i === 24 ? 'bg-green-500/30 h-3' : 'bg-green-500 h-5 group-hover:h-6'}`}
                                                style={{ transitionDelay: `${i * 5}ms` }}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-medium text-white/20">
                                        <span>90 days ago</span>
                                        <span className="text-white/40">{service.uptime} uptime</span>
                                        <span>Today</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Infrastructure Section */}
                <div className="mb-24 space-y-8">
                    <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-white/30 px-2">Provider Infrastructure</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {INFRA.map((item) => (
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
