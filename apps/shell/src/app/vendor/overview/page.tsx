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
import { format } from "date-fns";

export default function OverviewPage() {
    const { mutate } = useSWRConfig();
    const { data: stats, isLoading } = useSWR("vendor-overview-stats", vendorService.getOverviewStats);
    const [actionId, setActionId] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Fallbacks if data isn't loaded yet
    const requestCount = stats?.urgent_requests || 0;
    const pendingResponses = stats?.pending_responses || 0;
    const avgResponseTime = stats?.avg_response_time ? stats.avg_response_time.toFixed(1) : 0;
    const isAcceptingBookings = stats?.is_accepting_bookings ?? true;
    const viewCount = stats?.profile_views || 0;
    const bookings = stats?.upcoming_bookings || [];
    const holds = stats?.tentative_holds || [];

    const handleToggleAvailability = async () => {
        setIsUpdating(true);
        try {
            await vendorService.updateVendorProfile({ is_accepting_bookings: !isAcceptingBookings });
            toast.success(`Bookings ${!isAcceptingBookings ? "enabled" : "disabled"} successfully`);
            mutate("vendor-overview-stats");
        } catch (error) {
            console.error("Failed to toggle availability:", error);
            toast.error("Failed to update availability");
        } finally {
            setIsUpdating(false);
        }
    };

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                    <p className="text-muted-foreground">Manage your business activity and action items.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 rounded-xl border bg-card/50 backdrop-blur-sm p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <div className="text-sm font-semibold">Accepting Bookings</div>
                            <div className="text-[10px] text-muted-foreground">Toggle your marketplace status</div>
                        </div>
                        <Button
                            variant={isAcceptingBookings ? "default" : "outline"}
                            size="sm"
                            className={`h-8 px-3 font-bold transition-all ${isAcceptingBookings ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                            onClick={handleToggleAvailability}
                            disabled={isUpdating}
                        >
                            {isUpdating ? <Loader2 className="h-3 w-3 animate-spin" /> : (
                                <div className="flex items-center gap-2">
                                    <span className={`flex h-1.5 w-1.5 rounded-full ${isAcceptingBookings ? "bg-white animate-pulse" : "bg-muted-foreground"}`} />
                                    {isAcceptingBookings ? "ONLINE" : "OFFLINE"}
                                </div>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Urgent Actions */}
                <Card className="shadow-sm border-orange-500/20 bg-orange-50/10 dark:bg-orange-950/5">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">Urgent Actions</CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : (
                            <>
                                <div className="text-3xl font-bold">{requestCount}</div>
                                <p className="text-xs text-muted-foreground mt-1">Requiring immediate attention</p>
                            </>
                        )}
                        <Button variant="link" className="mt-4 h-auto p-0 text-xs text-orange-600 dark:text-orange-400 font-bold" asChild>
                            <Link href="/leads?tab=new">VIEW URGENT <ChevronRight className="ml-1 h-3 w-3" /></Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Pending Responses */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Pending Responses</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : (
                            <>
                                <div className="text-3xl font-bold">{pendingResponses}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Avg response: <span className="font-bold text-foreground">{avgResponseTime}h</span>
                                </p>
                            </>
                        )}
                        <Button variant="link" className="mt-4 h-auto p-0 text-xs font-bold" asChild>
                            <Link href="/messages">OPEN INBOX <ChevronRight className="ml-1 h-3 w-3" /></Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Profile Views */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Profile Reach</CardTitle>
                        <Eye className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : (
                            <>
                                <div className="text-3xl font-bold">{viewCount}</div>
                                <p className="text-xs text-emerald-500 flex items-center font-medium mt-1">
                                    <ArrowUpRight className="mr-1 h-3 w-3" /> Total impressions
                                </p>
                            </>
                        )}
                        <Button variant="link" className="mt-4 h-auto p-0 text-xs font-bold" asChild>
                            <Link href="/performance">VIEW INSIGHTS <ChevronRight className="ml-1 h-3 w-3" /></Link>
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
                            ) : bookings.length === 0 ? (
                                <div className="text-center p-4 text-sm text-muted-foreground">No upcoming bookings.</div>
                            ) : (
                                bookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-1">
                                            <p className="font-medium">{booking.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {format(new Date(booking.event_date), "PPP")}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                            Confirmed
                                        </Badge>
                                    </div>
                                ))
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
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium">{hold.title}</p>
                                                    {hold.status !== 'pending' && (
                                                        <Badge variant="outline" className="capitalize text-[10px] h-4 px-1">
                                                            {hold.status.replace('_', ' ')}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground">{hold.expires_in}</p>
                                            </div>
                                            {hold.status === 'pending' ? (
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
                                            ) : (
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={`/leads/${hold.id}`}>View Details</Link>
                                                </Button>
                                            )}
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
