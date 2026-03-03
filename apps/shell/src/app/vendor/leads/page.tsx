"use client";

import React from "react";
import {
    Card,
    Button,
    Badge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@bventy/ui";
import {
    Filter,
    Calendar,
    IndianRupee,
    Clock,
    ChevronRight
} from "lucide-react";

const tabs = [
    { label: "New", count: 4 },
    { label: "In Negotiation", count: 2 },
    { label: "Awaiting Organizer", count: 1 },
    { label: "Confirmed", count: 8 },
    { label: "Rejected", count: 0 },
    { label: "Expired", count: 12 },
];

const leads = [
    {
        id: "L1",
        event: "Corporate Anniversary Gala",
        date: "2026-03-25",
        budget: "₹25,000 - ₹35,000",
        status: "New",
        lastActivity: "2 hours ago",
        organizer: "Acme Corp"
    },
    {
        id: "L2",
        event: "Kapur Wedding Reception",
        date: "2026-04-12",
        budget: "₹85,000 - ₹1,10,000",
        status: "In Negotiation",
        lastActivity: "1 day ago",
        organizer: "Rajesh Kapur"
    },
    {
        id: "L3",
        event: "Tech Conference Afterparty",
        date: "2026-03-30",
        budget: "₹45,000 - ₹55,000",
        status: "Awaiting Organizer",
        lastActivity: "3 days ago",
        organizer: "Startup Hub"
    }
];

export default function LeadsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
                    <p className="text-muted-foreground">Track and manage your incoming business opportunities.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button size="sm">
                        <IndianRupee className="mr-2 h-4 w-4" /> Create Manual Lead
                    </Button>
                </div>
            </div>

            <div className="flex overflow-x-auto pb-1 no-scrollbar border-b">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.label}
                            className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-colors ${tab.label === "New"
                                ? "border-primary text-primary"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {tab.label}
                            <Badge variant="secondary" className="h-5 rounded-full px-2 text-[10px]">
                                {tab.count}
                            </Badge>
                        </button>
                    ))}
                </div>
            </div>

            <Card className="border-none shadow-sm bg-card/50">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[300px]">Event & Organizer</TableHead>
                            <TableHead>Event Date</TableHead>
                            <TableHead>Budget Range</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Activity</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leads.map((lead) => (
                            <TableRow key={lead.id} className="cursor-pointer group transition-colors hover:bg-muted/50">
                                <TableCell>
                                    <div className="space-y-1">
                                        <p className="font-semibold group-hover:text-primary transition-colors">{lead.event}</p>
                                        <p className="text-xs text-muted-foreground">{lead.organizer}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        {lead.date}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium text-sm">{lead.budget}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={lead.status === "New" ? "default" : "secondary"}
                                        className={lead.status === "New" ? "bg-blue-500 hover:bg-blue-600" : ""}
                                    >
                                        {lead.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {lead.lastActivity}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" asChild>
                                        <a href={`/vendor/leads/${lead.id}`}>
                                            <ChevronRight className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
