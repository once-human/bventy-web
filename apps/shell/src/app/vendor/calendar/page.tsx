"use client";

import React, { useState, useEffect } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
    startOfWeek,
    addMonths,
    subMonths,
} from "date-fns";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Badge,
    Separator,
    Input,
    Label
} from "@bventy/ui";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock,
    MapPin,
    X,
    Trash2,
    RefreshCw
} from "lucide-react";
import { vendorService, CalendarEvent } from "@bventy/services";
import useSWR from "swr";
import { toast } from "sonner";

export default function CalendarPage() {
    const [mounted, setMounted] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Modal state
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
    const [blockTitle, setBlockTitle] = useState("");
    const [blockStart, setBlockStart] = useState("");
    const [blockEnd, setBlockEnd] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    // SWR Fetching
    const startDateStr = format(startOfMonth(subMonths(currentDate, 1)), "yyyy-MM-dd");
    const endDateStr = format(endOfMonth(addMonths(currentDate, 2)), "yyyy-MM-dd");

    const { data: dbEvents, mutate, isLoading } = useSWR(
        mounted ? ["vendor-calendar", startDateStr, endDateStr] : null,
        () => vendorService.getCalendarEvents(startDateStr, endDateStr)
    );

    const handleCreateBlock = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await vendorService.createManualBlock({
                title: blockTitle,
                start_time: new Date(blockStart).toISOString(),
                end_time: new Date(blockEnd).toISOString(),
                is_all_day: false
            });
            toast.success("Dates blocked successfully");
            setIsBlockModalOpen(false);
            setBlockTitle("");
            mutate();
        } catch (error) {
            toast.error("Failed to block dates");
        }
    };

    const handleDeleteEvent = async (id: string) => {
        if (confirm("Are you sure you want to remove this block?")) {
            try {
                await vendorService.deleteManualBlock(id);
                toast.success("Block removed");
                mutate();
            } catch (error) {
                toast.error("Failed to delete block");
            }
        }
    };

    const [isSyncing, setIsSyncing] = useState(false);
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const handleManualSync = async () => {
        setIsSyncing(true);
        try {
            await vendorService.syncGoogleCalendar();
            toast.success("Calendar synced with Google");
            mutate();
        } catch (error) {
            toast.error("Failed to sync with Google");
        } finally {
            setIsSyncing(false);
        }
    };

    const eventsForSelectedDate = dbEvents?.filter(e => isSameDay(new Date(e.start_time), selectedDate)) || [];

    // Find upcoming events (next 7 days from selected date)
    const upcomingEvents = dbEvents?.filter(e => {
        const evtDate = new Date(e.start_time);
        return evtDate > selectedDate && evtDate <= new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    }) || [];

    if (!mounted) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground">Manage your availability and upcoming bookings.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.bventy.in';
                            window.location.href = `${apiUrl}/auth/google`;
                        }}
                    >
                        Connect Google
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleManualSync}
                        disabled={isSyncing}
                    >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                        {isSyncing ? "Syncing..." : "Sync Now"}
                    </Button>
                    <Button size="sm" onClick={() => setIsBlockModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Block Date
                    </Button>
                </div>
            </div>

            {isBlockModalOpen && (
                <Card className="shadow-lg border-red-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">Add Manual Block</h3>
                            <Button variant="ghost" size="icon" onClick={() => setIsBlockModalOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <form onSubmit={handleCreateBlock} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div className="space-y-2">
                                <Label>Title / Reason</Label>
                                <Input required value={blockTitle} onChange={e => setBlockTitle(e.target.value)} placeholder="e.g. Vacation, Maintenance" />
                            </div>
                            <div className="space-y-2">
                                <Label>Start (Date & Time)</Label>
                                <Input type="datetime-local" required value={blockStart} onChange={e => setBlockStart(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>End (Date & Time)</Label>
                                <Input type="datetime-local" required value={blockEnd} onChange={e => setBlockEnd(e.target.value)} />
                            </div>
                            <Button type="submit" className="w-full">Create Block</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-6 lg:grid-cols-4">
                <Card className="lg:col-span-1 shadow-sm h-fit">
                    <CardContent className="p-3">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-2 pt-2">
                                <h3 className="font-semibold text-sm">{format(currentDate, "MMMM yyyy")}</h3>
                                <div className="flex gap-1">
                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setCurrentDate(subMonths(currentDate, 1))}><ChevronLeft className="h-3.5 w-3.5" /></Button>
                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setCurrentDate(addMonths(currentDate, 1))}><ChevronRight className="h-3.5 w-3.5" /></Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-muted-foreground">
                                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: startOfWeek(monthStart).getDay() }).map((_, i) => (
                                    <div key={`empty-${i}`} className="h-8" />
                                ))}
                                {daysInMonth.map((day, i) => {
                                    const dayEvents = dbEvents?.filter(e => isSameDay(new Date(e.start_time), day)) || [];
                                    const hasConfirmed = dayEvents.some(e => e.type === "confirmed_booking");
                                    const hasTentative = dayEvents.some(e => e.type === "tentative_reserve");
                                    const hasBlock = dayEvents.some(e => e.type === "manual_block");

                                    let bgClass = "hover:bg-muted";
                                    let textClass = "";
                                    let borderClass = "";

                                    if (isSameDay(day, selectedDate)) {
                                        bgClass = "bg-primary";
                                        textClass = "text-primary-foreground font-bold";
                                    } else if (hasConfirmed) {
                                        bgClass = "bg-emerald-100";
                                        textClass = "text-emerald-800";
                                    } else if (hasBlock) {
                                        bgClass = "bg-red-100";
                                        textClass = "text-red-800 border border-red-200";
                                    } else if (hasTentative) {
                                        bgClass = "bg-orange-100";
                                        textClass = "text-orange-700 border border-orange-200";
                                    } else if (isToday(day)) {
                                        textClass = "text-primary font-bold";
                                    }

                                    return (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedDate(day)}
                                            className={`h-8 flex items-center justify-center rounded-md text-xs cursor-pointer transition-colors ${bgClass} ${textClass} ${borderClass}`}
                                        >
                                            {format(day, "d")}
                                        </div>
                                    );
                                })}
                            </div>
                            <Separator />
                            <div className="space-y-3 px-1">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Legend</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                                        <span>Confirmed Booking</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="h-2 w-2 rounded-full bg-orange-400" />
                                        <span>Tentative Hold</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="h-2 w-2 rounded-full bg-red-400" />
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
                            <CardTitle className="text-lg">{isToday(selectedDate) ? "Today's Schedule" : format(selectedDate, "EEEE, MMMM d")}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {isLoading ? (
                                <div className="p-8 text-center text-muted-foreground text-sm">Loading events...</div>
                            ) : eventsForSelectedDate.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground text-sm">No events or blocks for this date.</div>
                            ) : (
                                <div className="divide-y relative">
                                    {eventsForSelectedDate.map((event) => (
                                        <div key={event.id} className="p-4 flex gap-4 transition-colors hover:bg-muted/30 group">
                                            <div className="w-16 shrink-0 text-sm font-semibold text-muted-foreground py-2">
                                                {event.is_all_day ? "All Day" : format(new Date(event.start_time), "hh:mm a")}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-bold text-sm">{event.title}</h4>
                                                    <div className="flex items-center gap-3">
                                                        {event.type === "confirmed_booking" && <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">Confirmed</Badge>}
                                                        {event.type === "tentative_reserve" && <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-100">Tentative Hold</Badge>}
                                                        {event.type === "manual_block" && <Badge variant="outline" className="bg-red-50 text-red-700 border-red-100">Manual Block</Badge>}

                                                        {event.type === "manual_block" && (
                                                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDeleteEvent(event.id)}>
                                                                <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                                {event.details && (
                                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.details}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="py-4">
                            <CardTitle className="text-md font-semibold">Upcoming This Week</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {upcomingEvents.length === 0 ? (
                                <div className="text-sm text-muted-foreground p-4 text-center border rounded-lg">No upcoming bookings in the next 7 days.</div>
                            ) : (
                                upcomingEvents.slice(0, 5).map(event => (
                                    <div key={event.id} className={`rounded-lg border p-4 flex items-center justify-between border-l-4 ${event.type === 'confirmed_booking' ? 'border-l-emerald-400' : event.type === 'manual_block' ? 'border-l-red-400' : 'border-l-orange-400'}`}>
                                        <div className="flex gap-4 items-center">
                                            <div className={`h-10 w-10 rounded-md flex flex-col items-center justify-center border ${event.type === 'confirmed_booking' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : event.type === 'manual_block' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                                                <span className="text-[10px] font-bold uppercase">{format(new Date(event.start_time), "MMM")}</span>
                                                <span className="text-sm font-bold leading-none">{format(new Date(event.start_time), "dd")}</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{event.title}</p>
                                                {event.details && <p className="text-xs text-muted-foreground">{event.details}</p>}
                                            </div>
                                        </div>
                                        {event.type === "confirmed_booking" && <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hidden sm:flex">Confirmed</Badge>}
                                        {event.type === "tentative_reserve" && <Badge variant="secondary" className="bg-orange-100 text-orange-800 hidden sm:flex">Tentative Hold</Badge>}
                                        {event.type === "manual_block" && <Badge variant="secondary" className="bg-red-100 text-red-800 hidden sm:flex">Blocked</Badge>}
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
