"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
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
    Wallet,
    TrendingUp,
    Download,
    FileText,
    ExternalLink,
    IndianRupee,
    ArrowUpRight
} from "lucide-react";

export default function EarningsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
                    <p className="text-muted-foreground">Track your revenue, invoices, and payouts.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                    <Button size="sm">
                        <Wallet className="mr-2 h-4 w-4" /> Payout Settings
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="shadow-sm border-l-4 border-l-emerald-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirmed Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold flex items-center">
                            <IndianRupee className="h-5 w-5 mr-1" /> 4,85,200
                        </div>
                        <p className="text-xs text-emerald-600 flex items-center mt-1">
                            <ArrowUpRight className="mr-1 h-3 w-3" /> 24% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pending Payouts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold flex items-center">
                            <IndianRupee className="h-5 w-5 mr-1" /> 82,450
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Next payout: March 15
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-orange-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Projected Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold flex items-center">
                            <IndianRupee className="h-5 w-5 mr-1" /> 1,12,000
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-orange-600 font-medium">
                            Based on tentative holds
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Recent Transactions</CardTitle>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-xs">View All</Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Event</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { id: "INV-8924", event: "Corporate Gala", date: "Mar 02, 2026", amount: "₹45,000", status: "Paid" },
                                { id: "INV-8921", event: "Wedding Reception", date: "Feb 28, 2026", amount: "₹1,20,000", status: "Paid" },
                                { id: "INV-8919", event: "Birthday Party", date: "Feb 25, 2026", amount: "₹12,400", status: "Pending" },
                                { id: "INV-8915", event: "Product Launch", date: "Feb 20, 2026", amount: "₹85,000", status: "Paid" },
                            ].map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium font-mono text-xs">{row.id}</TableCell>
                                    <TableCell className="text-sm">{row.event}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{row.date}</TableCell>
                                    <TableCell className="font-semibold text-sm">{row.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={row.status === "Paid" ? "default" : "secondary"} className={row.status === "Paid" ? "bg-emerald-500/10 text-emerald-600 border-none px-2 py-0.5" : "bg-orange-500/10 text-orange-600 border-none px-2 py-0.5"}>
                                            {row.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <FileText className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-md font-semibold">Monthly Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center bg-muted/20 border border-dashed rounded-lg opacity-40">
                        <TrendingUp className="h-8 w-8" />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-md font-semibold">Payout Account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-lg border p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">🏦</div>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-semibold">HDFC Bank •••• 4921</p>
                                    <p className="text-xs text-muted-foreground">Primary Payout Method</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">Link New Account</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
