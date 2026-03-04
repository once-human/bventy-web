"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@bventy/ui";
import Link from "next/link";
import {
    Calendar,
    Clock,
    AlertCircle,
    Eye,
    ChevronRight,
    ArrowUpRight,
    CheckCircle2,
    Loader2
} from "lucide-react";
import useSWR, { useSWRConfig } from "swr";
import { vendorService } from "@bventy/services";
import { toast } from "sonner";

export default function OverviewPage() {
    const { mutate } = useSWRConfig();
    const { data: stats, isLoading } = useSWR("vendor-overview-stats", vendorService.getOverviewStats);
    const [actionId, setActionId] = useState<string | null>(null);

    // Fallbacks if data isn't loaded yet
    const requestCount = stats?.urgent_requests || 0;
    const responseTime = stats?.avg_response_time ? stats.avg_response_time.toFixed(1) : 0;
    const viewCount = stats?.profile_views || 0;
    const bookings = stats?.upcoming_bookings || 0;
    const holds = stats?.tentative_holds || [];

    const handleAction = async (id: string, action: 'confirm' | 'reject') => {
        setActionId(id);
        try {
            if (action === 'confirm') {
                await vendorService.confirmHold(id);
                toast.success("Hold confirmed successfully");
            } else {
                await vendorService.rejectHold(id);
                toast.success("Hold rejected");
            }
            mutate("vendor-overview-stats");
        } catch (error) {
            console.error(`Failed to ${action} hold:`, error);
            toast.error(`Failed to ${action} hold`);
        } finally {
            setActionId(null);
        }
    };

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
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : (
                            <>
                                <div className="text-2xl font-bold">{requestCount}</div>
                                <p className="text-xs text-muted-foreground">Urgent action needed</p>
                            </>
                        )}
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
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : (
                            <>
                                <div className="text-2xl font-bold">{responseTime} <span className="text-base font-normal text-muted-foreground">hrs</span></div>
                                <p className="text-xs text-muted-foreground">Average response time</p>
                            </>
                        )}
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
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : (
                            <>
                                <div className="text-2xl font-bold">{viewCount}</div>
                                <p className="text-xs text-emerald-500 flex items-center">
                                    <ArrowUpRight className="mr-1 h-3 w-3" /> Last 30 days
                                </p>
                            </>
                        )}
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
                            {isLoading ? (
                                <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
                            ) : bookings === 0 ? (
                                <div className="text-center p-4 text-sm text-muted-foreground">No upcoming bookings.</div>
                            ) : (
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-1">
                                        <p className="font-medium">You have {bookings} upcoming event(s)</p>
                                        <p className="text-xs text-muted-foreground">Check calendar for details</p>
                                    </div>
                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                        Confirmed
                                    </Badge>
                                </div>
                            )}
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
                                {isLoading ? (
                                    <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
                                ) : holds.length === 0 ? (
                                    <div className="text-center p-4 text-sm text-muted-foreground">No tentative holds.</div>
                                ) : (
                                    holds.map((hold) => (
                                        <div key={hold.id} className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-1">
                                                <p className="font-medium">{hold.title}</p>
                                                <p className="text-xs text-muted-foreground">{hold.expires_in}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleAction(hold.id, 'reject')}
                                                    disabled={actionId === hold.id}
                                                >
                                                    {actionId === hold.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Reject"}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleAction(hold.id, 'confirm')}
                                                    disabled={actionId === hold.id}
                                                >
                                                    {actionId === hold.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Confirm"}
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
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
