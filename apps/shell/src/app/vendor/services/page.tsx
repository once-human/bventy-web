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
    Plus,
    Edit2,
    Trash2,
    ShieldCheck,
    MapPin,
    LayoutGrid,
    Settings2
} from "lucide-react";

export default function ServicesPricingPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Services & Pricing</h1>
                    <p className="text-muted-foreground">Define your services, packages, and booking rules.</p>
                </div>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add New Service
                </Button>
            </div>

            <div className="grid gap-8">
                {/* Services List */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Services List</CardTitle>
                        <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Service Name</TableHead>
                                    <TableHead>Base Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { name: "Full Wedding Catering", price: "₹1,500 / Plate", status: "Active" },
                                    { name: "Corporate Lunch Buffet", price: "₹850 / Plate", status: "Active" },
                                    { name: "Cocktail Party Snacks", price: "₹650 / Plate", status: "Draft" },
                                ].map((service, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{service.name}</TableCell>
                                        <TableCell>{service.price}</TableCell>
                                        <TableCell>
                                            <Badge variant={service.status === "Active" ? "default" : "secondary"}>
                                                {service.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-3.5 w-3.5" /></Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Pricing Rules */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Settings2 className="h-4 w-4" /> Pricing Rules
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Weekend Premium</p>
                                    <p className="text-xs text-muted-foreground">+15% on Fri, Sat, Sun</p>
                                </div>
                                <div className="h-5 w-10 rounded-full bg-primary relative cursor-pointer">
                                    <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Last Minute Booking</p>
                                    <p className="text-xs text-muted-foreground">+20% for bookings within 7 days</p>
                                </div>
                                <div className="h-5 w-10 rounded-full bg-muted relative cursor-pointer">
                                    <div className="absolute left-1 top-1 h-3 w-3 bg-white rounded-full" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Cancellation Policy */}
                    <Card className="shadow-sm border-orange-100 bg-orange-50/20">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-orange-600" /> Cancellation Policy
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-sm font-semibold">Moderate Policy</p>
                                <p className="text-xs text-muted-foreground">Full refund up to 14 days before event. 50% refund after that. No refund within 48 hours.</p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full">Edit Policy</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Service Areas */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> Service Areas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {["Mumbai Central", "Andheri", "Bandra", "Juhu", "Powai", "Navi Mumbai"].map((city) => (
                                <Badge key={city} variant="secondary" className="px-3 py-1 flex gap-1 items-center hover:bg-muted transition-colors">
                                    {city} <Trash2 className="h-3 w-3 ml-1 text-muted-foreground cursor-pointer hover:text-destructive" />
                                </Badge>
                            ))}
                            <Button variant="ghost" size="sm" className="h-7 text-[10px] border border-dashed">+ Add Area</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
