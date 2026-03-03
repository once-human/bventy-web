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
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock,
    MapPin
} from "lucide-react";

export default function CalendarPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground">Manage your availability and upcoming bookings.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex rounded-md border p-1 bg-muted/40">
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">Month</Button>
                        <Button variant="secondary" size="sm" className="h-8 px-3 text-xs shadow-sm">Week</Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">List</Button>
                    </div>
                    <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Block Date
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
                <Card className="lg:col-span-1 shadow-sm h-fit">
                    <CardContent className="p-3">
                        {/* 
                          Note: This is a placeholder for the actual interactive calendar component.
                          Using standard div for layout purposes in this UI-only phase.
                        */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-2 pt-2">
                                <h3 className="font-semibold text-sm">March 2026</h3>
                                <div className="flex gap-1">
                                    <Button variant="outline" size="icon" className="h-7 w-7"><ChevronLeft className="h-3.5 w-3.5" /></Button>
                                    <Button variant="outline" size="icon" className="h-7 w-7"><ChevronRight className="h-3.5 w-3.5" /></Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-muted-foreground">
                                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: 31 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-8 flex items-center justify-center rounded-md text-xs cursor-pointer transition-colors ${[15, 22].includes(i + 1) ? "bg-primary text-primary-foreground font-bold" :
                                            [12, 28].includes(i + 1) ? "bg-orange-100 text-orange-700 border border-orange-200" :
                                                "hover:bg-muted"
                                            }`}
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <div className="space-y-3 px-1">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Legend</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span>Confirmed Booking</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="h-2 w-2 rounded-full bg-orange-400" />
                                        <span>Tentative Hold</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="h-2 w-2 rounded-full bg-slate-300" />
                                        <span>Blocked Date</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-3 space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader className="py-4 border-b">
                            <CardTitle className="text-lg">Monday, March 15</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                <div className="p-4 flex gap-4 transition-colors hover:bg-muted/30">
                                    <div className="w-16 shrink-0 text-sm font-semibold text-muted-foreground py-2">09:00 AM</div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-sm">Venue Setup - Grand Ballroom</h4>
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">Confirmed</Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 2 Hours</span>
                                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Mumbai, MH</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 flex gap-4 transition-colors hover:bg-muted/30">
                                    <div className="w-16 shrink-0 text-sm font-semibold text-muted-foreground py-2">07:00 PM</div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-sm">Corporate Anniversary Gala</h4>
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">Confirmed</Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 Hours</span>
                                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Acme Events Center</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="py-4">
                            <CardTitle className="text-md font-semibold">Other Upcoming This Week</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="rounded-lg border p-4 flex items-center justify-between border-l-4 border-l-orange-400">
                                <div className="flex gap-4 items-center">
                                    <div className="h-10 w-10 rounded-md bg-orange-50 flex flex-col items-center justify-center text-orange-700 border border-orange-100">
                                        <span className="text-[10px] font-bold uppercase">Mar</span>
                                        <span className="text-sm font-bold leading-none">18</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Wedding Reception - Kapur</p>
                                        <p className="text-xs text-muted-foreground">6:30 PM • 350 Guests</p>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-orange-100 text-orange-800">Tentative Hold</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
