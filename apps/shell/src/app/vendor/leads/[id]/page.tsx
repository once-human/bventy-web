"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Badge,
    Separator
} from "@bventy/ui";
import {
    Calendar,
    MapPin,
    Users,
    ArrowLeft,
    Download,
    MessageSquare,
    CheckCircle2,
    XCircle,
    Info
} from "lucide-react";
import Link from "next/link";

export default function LeadDetailPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/vendor/leads">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Corporate Anniversary Gala</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Lead ID: #L1294</span>
                        <span>•</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">New Lead</Badge>
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
                                        March 25, 2026
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</p>
                                    <div className="flex items-center gap-2 font-medium">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        Grand Ballroom, Mumbai
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Guests</p>
                                    <div className="flex items-center gap-2 font-medium">
                                        <Users className="h-4 w-4 text-primary" />
                                        Approx. 450
                                    </div>
                                </div>
                            </div>
                            <Separator className="my-6" />
                            <div className="space-y-4">
                                <h4 className="font-semibold text-sm">Description</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Annual corporate anniversary gala for Acme Corp. We are looking for a reliable catering service for a sit-down dinner including appetizers and a dessert buffet. The theme is &quot;Elegance &amp; Innovation&quot;.
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
                            {[
                                { status: "Lead Received", time: "2 hours ago", active: true },
                                { status: "Awaiting Quote Submission", time: "Pending", active: false }
                            ].map((step, idx) => (
                                <div key={idx} className="relative pl-8">
                                    {idx < 1 && (
                                        <div className="absolute left-3 top-6 bottom-[-24px] w-px bg-slate-200 dark:bg-slate-800" />
                                    )}
                                    <div className={`absolute left-0 top-0 h-6 w-6 rounded-full border-2 bg-background flex items-center justify-center ${step.active ? "border-primary" : "border-muted"}`}>
                                        {step.active && <div className="h-2 w-2 rounded-full bg-primary" />}
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`text-sm font-semibold ${step.active ? "text-foreground" : "text-muted-foreground"}`}>{step.status}</p>
                                        <p className="text-xs text-muted-foreground">{step.time}</p>
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
                            <Button className="w-full">
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Submit Quote
                            </Button>
                            <Button variant="outline" className="w-full">
                                <MessageSquare className="mr-2 h-4 w-4" /> Message Organizer
                            </Button>
                            <Separator className="my-2" />
                            <Button variant="ghost" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive">
                                <XCircle className="mr-2 h-4 w-4" /> Decline Lead
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
                                className="w-full min-h-[100px] rounded-md border bg-transparent p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Add private notes for your team..."
                            />
                            <Button variant="secondary" size="sm" className="w-full">Save Note</Button>
                        </CardContent>
                    </Card>

                    {/* Attachments */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm">Attachments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between rounded-lg border p-3 text-sm">
                                <span className="truncate max-w-[150px]">Event_Menu_Brief.pdf</span>
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
