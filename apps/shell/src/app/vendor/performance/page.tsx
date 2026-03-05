"use client";

import React from "react";
import useSWR from "swr";
import { vendorService } from "@bventy/services";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Skeleton
} from "@bventy/ui";
import {
    TrendingUp,
    BarChart3,
    LineChart as LineChartIcon,
    Clock,
    ChevronDown,
    Filter,
    Target,
    Users,
    Loader2,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from "recharts";

export default function PerformancePage() {
    const [isMounted, setIsMounted] = React.useState(false);
    const { data, error, isLoading } = useSWR("vendor-performance", vendorService.getVendorPerformance, {
        revalidateOnFocus: false
    });

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="shadow-sm">
                            <CardHeader className="pb-2">
                                <Skeleton className="h-4 w-24" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-3 w-32" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="h-[400px]"><Skeleton className="h-full w-full" /></Card>
                    <Card className="h-[400px]"><Skeleton className="h-full w-full" /></Card>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="p-4 rounded-full bg-destructive/10 text-destructive">
                    <BarChart3 className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold">Failed to load performance data</h2>
                <p className="text-muted-foreground text-center max-w-sm">
                    There was an error retrieving your analytics. Please try again later.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline">
                    Retry
                </Button>
            </div>
        );
    }

    const { summary, funnel, trends } = data || {};

    const stats = [
        {
            label: "Quote Count",
            value: summary?.quote_count || 0,
            trend: `${summary?.quote_count_delta > 0 ? "+" : ""}${summary?.quote_count_delta?.toFixed(1) || 0}%`,
            up: summary?.quote_count_delta >= 0,
            icon: BarChart3,
            sublabel: "Last 30 days"
        },
        {
            label: "Acceptance Rate",
            value: `${(summary?.acceptance_rate || 0).toFixed(1)}%`,
            trend: `${summary?.acceptance_rate_delta > 0 ? "+" : ""}${summary?.acceptance_rate_delta?.toFixed(1) || 0}%`,
            up: summary?.acceptance_rate_delta >= 0,
            icon: Target,
            sublabel: "Engagement rate"
        },
        {
            label: "Avg Response",
            value: summary?.avg_response_time > 0 ? `${summary.avg_response_time.toFixed(1)}h` : "N/A",
            trend: `${summary?.avg_response_time_delta > 0 ? "+" : ""}${summary?.avg_response_time_delta?.toFixed(1) || 0}%`,
            up: summary?.avg_response_time_delta >= 0,
            icon: Clock,
            sublabel: "Response speed"
        },
        {
            label: "Conversion Rate",
            value: `${(summary?.conversion_rate || 0).toFixed(1)}%`,
            trend: `${summary?.conversion_rate_delta > 0 ? "+" : ""}${summary?.conversion_rate_delta?.toFixed(1) || 0}%`,
            up: summary?.conversion_rate_delta >= 0,
            icon: TrendingUp,
            sublabel: "Booking success"
        },
    ];

    const funnelData = [
        { label: "Requested Quotes", value: funnel?.requested || 0, width: "100%", color: "bg-primary/20", fill: "hsl(var(--primary) / 0.2)" },
        { label: "Responded", value: funnel?.responded || 0, width: `${(funnel?.responded / (funnel?.requested || 1) * 100).toFixed(0)}%`, color: "bg-primary/40", fill: "hsl(var(--primary) / 0.4)" },
        { label: "In Negotiation", value: funnel?.negotiating || 0, width: `${(funnel?.negotiating / (funnel?.requested || 1) * 100).toFixed(0)}%`, color: "bg-primary/60", fill: "hsl(var(--primary) / 0.6)" },
        { label: "Confirmed Bookings", value: funnel?.confirmed || 0, width: `${(funnel?.confirmed / (funnel?.requested || 1) * 100).toFixed(0)}%`, color: "bg-primary", fill: "hsl(var(--primary))" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
                    <p className="text-muted-foreground">Analyze your business growth and conversion metrics.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        Last 30 Days <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-1 h-full ${stat.up ? 'bg-emerald-500' : 'bg-red-500'} opacity-50`} />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                                <div className={`flex items-center text-[10px] font-bold ${stat.up ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {stat.up ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                                    {stat.trend}
                                </div>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1 font-medium opacity-70">
                                {stat.sublabel}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Quote Volume vs. Conversions Chart */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-md font-semibold">Quote Volume vs. Conversions</CardTitle>
                        <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary" /> Quotes</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Confirmed</div>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[350px] pt-4">
                        {!isMounted ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trends}>
                                    <defs>
                                        <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: '8px',
                                            fontSize: '12px'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="quotes"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorQuotes)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="confirmed"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorConfirmed)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Conversion Funnel */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-md font-semibold">Conversion Funnel</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-5">
                            {funnelData.map((step, i) => (
                                <div key={i} className="space-y-1.5 group">
                                    <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                                        <span>{step.label}</span>
                                        <span className="font-bold text-foreground">{step.value}</span>
                                    </div>
                                    <div className="w-full h-10 bg-muted/20 rounded-lg overflow-hidden border border-muted/30">
                                        <div
                                            className={`h-full ${step.color} transition-all duration-1000 ease-in-out relative`}
                                            style={{ width: step.width }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent h-full w-full" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-dashed">
                            <div className="flex items-center justify-between text-sm px-2">
                                <span className="text-muted-foreground">Overall Conversion Rate</span>
                                <span className="font-bold text-emerald-500">
                                    {((funnel?.confirmed / (funnel?.requested || 1)) * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Trend Analytics */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-md font-semibold">Monthly Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] pt-4">
                    {!isMounted ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: '8px',
                                        fontSize: '12px'
                                    }}
                                />
                                <Bar dataKey="quotes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                                <Bar dataKey="confirmed" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
