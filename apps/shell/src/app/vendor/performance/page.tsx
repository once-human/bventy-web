"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button
} from "@bventy/ui";
import {
    TrendingUp,
    BarChart3,
    LineChart,
    Clock,
    ChevronDown,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Target
} from "lucide-react";
export default function PerformancePage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
                    <p className="text-muted-foreground">Analyze your business growth and conversion metrics.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        Last 30 Days <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Quote Count", value: "84", trend: "+12%", up: true, icon: BarChart3 },
                    { label: "Acceptance Rate", value: "68%", trend: "+5%", up: true, icon: Target },
                    { label: "Response Time", value: "3.2h", trend: "-15%", up: true, icon: Clock },
                    { label: "Conversion Rate", value: "24%", trend: "-2%", up: false, icon: TrendingUp },
                ].map((stat, i) => (
                    <Card key={i} className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground opacity-50" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className={`flex items-center text-xs mt-1 font-medium ${stat.up ? "text-emerald-500" : "text-rose-500"}`}>
                                {stat.up ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                                {stat.trend} <span className="text-muted-foreground ml-1 font-normal text-[10px]">from last month</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Quote Activity Chart */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-md font-semibold">Quote Volume vs. Conversions</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg m-6 border border-dashed">
                        {/* 
                          Using the shared GrowthCharts component or similar.
                          Placeholder for actual chart implementation.
                        */}
                        <div className="text-center space-y-2 opacity-40">
                            <BarChart3 className="h-10 w-10 mx-auto" />
                            <p className="text-xs font-medium">Chart Data Visualization Placeholder</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Conversion Funnel */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-md font-semibold">Conversion Funnel</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-4">
                            {[
                                { label: "Requested Quotes", value: "124", width: "100%", color: "bg-primary/20" },
                                { label: "Responded", value: "112", width: "90%", color: "bg-primary/40" },
                                { label: "In Negotiation", value: "68", width: "55%", color: "bg-primary/60" },
                                { label: "Confirmed Bookings", value: "24", width: "20%", color: "bg-primary" },
                            ].map((step, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between items-center text-xs font-medium">
                                        <span>{step.label}</span>
                                        <span className="font-bold">{step.value}</span>
                                    </div>
                                    <div className="w-full h-8 bg-muted/30 rounded overflow-hidden">
                                        <div
                                            className={`h-full ${step.color} transition-all duration-1000`}
                                            style={{ width: step.width }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Breakdown */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-md font-semibold">Monthly Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center bg-muted/20 rounded-lg m-2 border border-dashed">
                    <div className="text-center space-y-2 opacity-40">
                        <LineChart className="h-10 w-10 mx-auto" />
                        <p className="text-xs font-medium">Monthly Trend Analysis Placeholder</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
