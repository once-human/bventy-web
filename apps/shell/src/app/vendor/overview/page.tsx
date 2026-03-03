"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@bventy/ui";
import Link from "next/link";
import {
    Calendar,
    Clock,
    AlertCircle,
    Eye,
    ChevronRight,
    ArrowUpRight,
    CheckCircle2
} from "lucide-react";

export default function OverviewPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                    <p className="text-muted-foreground">Manage your business activity and action items.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                        Available for Bookings
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Pending Quote Requests */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending Quote Requests</CardTitle>
                        <Clock className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">4 urgent requests</p>
                        <Button variant="link" className="mt-4 h-auto p-0 text-xs" asChild>
                            <Link href="/leads?tab=new">View all <ChevronRight className="ml-1 h-3 w-3" /></Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Awaiting Response */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Awaiting Response</CardTitle>
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Average wait: 4 hours</p>
                        <Button variant="link" className="mt-4 h-auto p-0 text-xs" asChild>
                            <Link href="/messages">Open inbox <ChevronRight className="ml-1 h-3 w-3" /></Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Profile Views */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                        <Eye className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,284</div>
                        <p className="text-xs text-emerald-500 flex items-center">
                            <ArrowUpRight className="mr-1 h-3 w-3" /> 12% from last week
                        </p>
                        <Button variant="link" className="mt-4 h-auto p-0 text-xs" asChild>
                            <Link href="/performance">Insights <ChevronRight className="ml-1 h-3 w-3" /></Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Upcoming Bookings */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Upcoming Bookings (Next 14 Days)</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-1">
                                        <p className="font-medium">Corporate Annual Gala</p>
                                        <p className="text-xs text-muted-foreground">March 15, 2026 • Grand Ballroom</p>
                                    </div>
                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                        Confirmed
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="mt-4 w-full" asChild>
                            <Link href="/calendar">View Calendar</Link>
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {/* Tentative Holds */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Tentative Holds</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-1">
                                        <p className="font-medium">Wedding Reception - Kapur</p>
                                        <p className="text-xs text-muted-foreground">Expires in 2 days</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost">Reject</Button>
                                        <Button size="sm">Confirm</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Expiring Negotiations */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Expiring Negotiations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg border border-dashed p-8 text-center">
                                <CheckCircle2 className="mx-auto h-8 w-8 text-muted-foreground/30" />
                                <p className="mt-2 text-sm text-muted-foreground">All negotiations are up to date.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
