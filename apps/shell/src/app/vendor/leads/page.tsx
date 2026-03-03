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

import Link from "next/link";
import useSWR from "swr";
import { quoteService, Quote } from "@bventy/services";
import { formatDistanceToNow, format } from "date-fns";

const TABS = [
    { id: "all", label: "All Leads" },
    { id: "pending", label: "New Requests" },
    { id: "responded", label: "In Negotiation" },
    { id: "accepted", label: "Confirmed" },
    { id: "archived", label: "Archived" },
];

export default function LeadsPage() {
    const { data: quotes, isLoading } = useSWR("vendor-quotes", quoteService.getQuoteRequests);
    const [activeTab, setActiveTab] = React.useState("all");

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "pending": return "New Request";
            case "responded": return "Responded";
            case "revision_requested": return "Revision Requested";
            case "accepted": return "Confirmed Booking";
            case "rejected": return "Declined";
            default: return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending": return "bg-blue-500 hover:bg-blue-600";
            case "accepted": return "bg-emerald-500 hover:bg-emerald-600";
            case "rejected":
            case "archived": return "bg-zinc-500 hover:bg-zinc-600 text-white";
            default: return "";
        }
    };

    const filteredQuotes = React.useMemo(() => {
        if (!quotes) return [];
        if (activeTab === "all") return quotes;

        return quotes.filter((q: Quote) => {
            if (activeTab === "pending") return q.status === "pending";
            if (activeTab === "responded") return ["responded", "revision_requested"].includes(q.status);
            if (activeTab === "accepted") return q.status === "accepted";
            if (activeTab === "archived") return ["rejected", "archived"].includes(q.status);
            return true;
        });
    }, [quotes, activeTab]);

    const getTabCount = (tabId: string) => {
        if (!quotes) return 0;
        if (tabId === "all") return quotes.length;
        if (tabId === "pending") return quotes.filter((q: Quote) => q.status === "pending").length;
        if (tabId === "responded") return quotes.filter((q: Quote) => ["responded", "revision_requested"].includes(q.status)).length;
        if (tabId === "accepted") return quotes.filter((q: Quote) => q.status === "accepted").length;
        if (tabId === "archived") return quotes.filter((q: Quote) => ["rejected", "archived"].includes(q.status)).length;
        return 0;
    };
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
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-colors ${activeTab === tab.id
                                ? "border-primary text-primary"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {tab.label}
                            <Badge variant="secondary" className="h-5 rounded-full px-2 text-[10px]">
                                {getTabCount(tab.id)}
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
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    <div className="flex items-center justify-center text-muted-foreground">
                                        Loading leads...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredQuotes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No leads found in this category.
                                </TableCell>
                            </TableRow>
                        ) : filteredQuotes.map((lead: Quote) => (
                            <TableRow key={lead.id} className="cursor-pointer group transition-colors hover:bg-muted/50">
                                <TableCell>
                                    <div className="space-y-1">
                                        <p className="font-semibold group-hover:text-primary transition-colors">{lead.event_title}</p>
                                        <p className="text-xs text-muted-foreground">{lead.organizer_name}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground text-xs"><Calendar className="h-3 w-3" /> Event Date (To be fetched if included)</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium text-sm">{lead.budget_range || "Not specified"}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={lead.status === "pending" ? "default" : "secondary"}
                                        className={getStatusColor(lead.status)}
                                    >
                                        {getStatusLabel(lead.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate max-w-[150px]">
                                        <Clock className="h-3 w-3 shrink-0" />
                                        {formatDistanceToNow(new Date(lead.created_at || lead.responded_at || new Date()), { addSuffix: true })}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link href={`/leads/${lead.id}`}>
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
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
