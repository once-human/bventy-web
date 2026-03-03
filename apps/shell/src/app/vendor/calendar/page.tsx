"use client";

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Event as RbcEvent } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Card, CardContent, Input, Label, Badge } from "@bventy/ui";
import { vendorService, CalendarEvent } from "@bventy/services";
import useSWR from "swr";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function VendorCalendar() {
    // Prevent SSR hydration mismatch
    const [mounted, setMounted] = useState(false);

    // Current viewed dates 
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // For manual block form
    const [blockTitle, setBlockTitle] = useState("");
    const [blockStart, setBlockStart] = useState("");
    const [blockEnd, setBlockEnd] = useState("");

    // Start/End of current month to fetch
    const startDateStr = format(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1), "yyyy-MM-dd");
    const endDateStr = format(new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0), "yyyy-MM-dd");

    const { data: dbEvents, mutate, isLoading } = useSWR(
        ["vendor-calendar", startDateStr, endDateStr],
        () => vendorService.getCalendarEvents(startDateStr, endDateStr)
    );

    // Map DB events to react-big-calendar format
    const rbcEvents: RbcEvent[] = React.useMemo(() => {
        if (!dbEvents) return [];
        return dbEvents.map((evt) => ({
            id: evt.id,
            title: evt.title,
            start: new Date(evt.start_time),
            end: new Date(evt.end_time),
            allDay: evt.is_all_day,
            resource: evt, // Keep full object
        }));
    }, [dbEvents]);

    const eventStyleGetter = (event: RbcEvent) => {
        const type = (event.resource as CalendarEvent)?.type;
        let backgroundColor = "#f4f4f5"; // Default grey
        let borderColor = "#e4e4e7";
        let color = "#18181b"; // dark text

        if (type === "confirmed_booking") {
            backgroundColor = "#dcfce7"; // emerald-100
            borderColor = "#86efac"; // emerald-300
            color = "#166534"; // emerald-800
        } else if (type === "tentative_reserve") {
            backgroundColor = "#fef9c3"; // yellow-100
            borderColor = "#fde047"; // yellow-300
            color = "#854d0e"; // yellow-800
        } else if (type === "manual_block") {
            backgroundColor = "#fee2e2"; // red-100
            borderColor = "#fca5a5"; // red-300
            color = "#991b1b"; // red-800
        }

        return {
            style: {
                backgroundColor,
                borderColor,
                color,
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "4px",
                display: "block",
                padding: "2px 4px",
                fontWeight: 500,
                fontSize: "12px"
            }
        };
    };

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

    const handleDeleteEvent = async (id: string, type: string) => {
        if (type !== "manual_block") {
            toast.info("Only manual blocks can be deleted directly from here. Manage leads in the Leads tab.");
            return;
        }

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

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground">Manage your availability, bookings, and unavailabilities.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        Sync Google Calendar
                    </Button>
                    <Button size="sm" onClick={() => setIsBlockModalOpen(!isBlockModalOpen)}>
                        <Plus className="mr-2 h-4 w-4" /> Block Dates
                    </Button>
                </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 items-center text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-300" /> Confirmed</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-300" /> Tentative Hold</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-300" /> Manual Block</div>
            </div>

            {isBlockModalOpen && mounted && (
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

            <Card className="p-4 shadow-sm h-[800px]">
                {!mounted || isLoading ? (
                    <div className="h-full w-full flex items-center justify-center">Loading calendar...</div>
                ) : (
                    <Calendar
                        localizer={localizer}
                        events={rbcEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: "100%" }}
                        date={currentDate}
                        onNavigate={(newDate) => setCurrentDate(newDate)}
                        eventPropGetter={eventStyleGetter}
                        onSelectEvent={(event) => handleDeleteEvent((event.resource as CalendarEvent).id, (event.resource as CalendarEvent).type)}
                        views={["month", "week", "agenda"]}
                    />
                )}
            </Card>
        </div>
    );
}
