"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Badge,
    Separator,
    Skeleton,
} from "@bventy/ui";
import {
    Calendar,
    MapPin,
    Users,
    ArrowLeft,
    MessageSquare,
    CheckCircle2,
    XCircle,
    Info,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { vendorService } from "@bventy/services";
import { format } from "date-fns";
import { toast } from "sonner";

export default function LeadDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [isActioning, setIsActioning] = useState<string | null>(null);

    const { data: lead, error, isLoading } = useSWR(
        id ? [`quote-detail`, id] : null,
        () => vendorService.getQuoteDetail(id)
    );

    const handleAction = async (action: 'confirm' | 'reject') => {
        setIsActioning(action);
        try {
            if (action === 'confirm') {
                await vendorService.confirmHold(id);
                toast.success("Availability confirmed!");
            } else {
                await vendorService.rejectHold(id);
                toast.success("Lead declined.");
            }
            mutate([`quote-detail`, id]);
            mutate("vendor-overview-stats");
            mutate("vendor-quotes");
        } catch (err) {
            console.error(`Failed to ${action} lead:`, err);
            toast.error(`Failed to ${action} lead`);
        } finally {
            setIsActioning(null);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-10 space-y-6">
                <Skeleton className="h-8 w-64" />
                <div className="grid gap-6 lg:grid-cols-3">
                    <Skeleton className="lg:col-span-2 h-[400px]" />
                    <Skeleton className="h-[400px]" />
                </div>
            </div>
        );
    }

    if (error || !lead) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <p className="text-muted-foreground">Failed to load lead details.</p>
                <Button asChild variant="outline">
                    <Link href="/leads">Back to Leads</Link>
                </Button>
            </div>
        );
    }

    const timeline = [
        { status: "Lead Received", time: lead.created_at, active: true },
        lead.responded_at && { status: "Quote Submitted", time: lead.responded_at, active: true },
        lead.revision_requested_at && { status: "Revision Requested", time: lead.revision_requested_at, active: true },
        lead.accepted_at && { status: "Booking Confirmed", time: lead.accepted_at, active: true },
        lead.rejected_at && { status: "Lead Declined", time: lead.rejected_at, active: true },
        !lead.responded_at && lead.status === 'pending' && { status: "Awaiting Quote Submission", time: "Pending", active: false }
    ].filter(Boolean) as { status: string; time: string; active: boolean }[];

    return (
        <div className="container mx-auto py-10 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{lead.event.title}</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Lead ID: #{lead.id.slice(0, 8).toUpperCase()}</span>
                        <span>•</span>
                        <Badge variant="outline" className="capitalize">
                            {lead.status.replace('_', ' ')}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    {/* Event Summary */}
                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Event Summary</CardTitle>
                            <Info className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</p>
                                    <div className="flex items-center gap-2 font-medium">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        {format(new Date(lead.event.event_date), "MMMM d, yyyy")}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</p>
                                    <div className="flex items-center gap-2 font-medium">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        {lead.event.city || "TBD"}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Guests</p>
                                    <div className="flex items-center gap-2 font-medium">
                                        <Users className="h-4 w-4 text-primary" />
                                        Approx. {lead.event.guest_count || "N/A"}
                                    </div>
                                </div>
                            </div>
                            <Separator className="my-6" />
                            <div className="space-y-4">
                                <h4 className="font-semibold text-sm">Description</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {lead.message || (lead.event.event_type ? `Request for ${lead.event.event_type}` : "No description provided.")}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quote Timeline */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Quote Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {timeline.map((step, idx) => (
                                <div key={idx} className="relative pl-8">
                                    {idx < timeline.length - 1 && (
                                        <div className="absolute left-3 top-6 bottom-[-24px] w-px bg-slate-200 dark:bg-slate-800" />
                                    )}
                                    <div className={`absolute left-0 top-0 h-6 w-6 rounded-full border-2 bg-background flex items-center justify-center ${step.active ? "border-primary" : "border-muted"}`}>
                                        {step.active && <div className="h-2 w-2 rounded-full bg-primary" />}
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`text-sm font-semibold ${step.active ? "text-foreground" : "text-muted-foreground"}`}>{step.status}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {step.time === "Pending" ? "Pending" : format(new Date(step.time), "MMM d, h:mm a")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Actions Card */}
                    <Card className="shadow-sm border-primary/20 bg-primary/5">
                        <CardHeader>
                            <CardTitle className="text-sm">Manage Quote</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Button
                                className="w-full"
                                disabled={!!isActioning || (lead.status !== 'pending' && lead.status !== 'revision_requested')}
                                onClick={() => handleAction('confirm')}
                            >
                                {isActioning === 'confirm' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                                {lead.status === 'pending' ? 'Confirm Availability' : 'Resubmit Quote'}
                            </Button>
                            <Button variant="outline" className="w-full" asChild disabled={!!isActioning}>
                                <Link href="/messages">
                                    <MessageSquare className="mr-2 h-4 w-4" /> Message Organizer
                                </Link>
                            </Button>
                            <Separator className="my-2" />
                            <Button
                                variant="ghost"
                                className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                                disabled={!!isActioning || lead.status === 'rejected' || lead.status === 'accepted'}
                                onClick={() => handleAction('reject')}
                            >
                                {isActioning === 'reject' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <XCircle className="mr-2 h-4 w-4" />}
                                Decline Lead
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Internal Notes */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm">Internal Notes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <textarea
                                disabled={true}
                                className="w-full min-h-[100px] rounded-md border bg-transparent p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary opacity-50 cursor-not-allowed"
                                placeholder="Notes feature coming soon..."
                            />
                            <Button variant="secondary" size="sm" className="w-full" disabled={true}>Save Note</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
