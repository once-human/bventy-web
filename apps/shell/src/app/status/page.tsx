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
            next: { revalidate: 1800 }, // 30 minutes revalidation to match backend heartbeat
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

import StatusDashboard from "./StatusDashboard";

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
    
    const anyDown = monitors.some((m: any) => m.status === "down");
    const allOffline = monitors.length > 0 && monitors.every((m: any) => m.status === "offline");
    const allOperational = monitors.length > 0 && !isFallback && !anyDown && !allOffline;

    const dashboardData = {
        monitors,
        incidents,
        overall_uptime: overallUptime,
        allOperational,
        anyDown,
        allOffline
    };

    return <StatusDashboard data={dashboardData} isFallback={isFallback} />;
}
