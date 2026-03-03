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
    Bell,
    Mail,
    Smartphone,
    Zap,
    Clock,
    CircleCheck,
    Info
} from "lucide-react";

export default function NotificationsSettingsPage() {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground">Manage how and when you want to be notified about business activity.</p>
            </div>

            <div className="grid gap-8">
                {/* Channel Settings */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Zap className="h-4 w-4" /> Notification Channels
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { title: "Email Notifications", desc: "Receive updates, leads, and monthly reports via email.", icon: Mail, enabled: true },
                            { title: "Push Notifications", desc: "Get real-time alerts on your browser or mobile device.", icon: Bell, enabled: true },
                            { title: "SMS Alerts", desc: "Critical alerts for urgent booking requests.", icon: Smartphone, enabled: false },
                        ].map((channel, i) => (
                            <div key={i} className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/10">
                                <div className="flex gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                                        <channel.icon className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold">{channel.title}</p>
                                        <p className="text-xs text-muted-foreground">{channel.desc}</p>
                                    </div>
                                </div>
                                <div className={`h-6 w-11 rounded-full relative cursor-pointer transition-colors ${channel.enabled ? "bg-primary" : "bg-muted"}`}>
                                    <div className={`absolute top-1 h-4 w-4 bg-white rounded-full transition-all ${channel.enabled ? "right-1" : "left-1"}`} />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Event Settings */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Activity Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="space-y-4">
                            {[
                                { title: "New Lead Received", default: true },
                                { title: "Message from Organizer", default: true },
                                { title: "Quote Accepted", default: true },
                                { title: "Event Reminder (24h before)", default: true },
                                { title: "Payment Confirmation", default: false },
                                { title: "Weekly Performance Report", default: false },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`h-5 w-5 rounded border flex items-center justify-center transition-colors cursor-pointer ${item.default ? "bg-primary border-primary text-white" : "border-muted"}`}>
                                        {item.default && <CircleCheck className="h-3.5 w-3.5" />}
                                    </div>
                                    <span className="text-sm">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Important Notice */}
                <Card className="shadow-sm border-blue-100 bg-blue-50/20">
                    <CardContent className="p-4 flex gap-3">
                        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-800 leading-relaxed">
                            Critical system alerts regarding your account security, billing issues, or platform outages cannot be disabled and will always be sent via email.
                        </p>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Save Preferences</Button>
                </div>
            </div>
        </div>
    );
}
