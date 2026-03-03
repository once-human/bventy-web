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
    TableRow,
    Avatar,
    AvatarFallback,
    Separator
} from "@bventy/ui";
import {
    Plus,
    Edit2,
    Users,
    Shield,
    Trash2
} from "lucide-react";

export default function StaffPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
                    <p className="text-muted-foreground">Manage your team members and assign them to events.</p>
                </div>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Team Member
                </Button>
            </div>

            <div className="grid gap-6">
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Team Members</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Availability</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { name: "Suresh Kumar", role: "Head Chef", status: "Active", email: "suresh@bventy.com", avail: "Available" },
                                    { name: "Mira Jain", role: "Event Manager", status: "Active", email: "mira@bventy.com", avail: "On Holiday" },
                                    { name: "Rahul Deshmukh", role: "Sr. Waiter", status: "On Leave", email: "rahul@bventy.com", avail: "Busy" },
                                ].map((staff, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback className="bg-primary/10 text-primary">{staff.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-semibold">{staff.name}</p>
                                                    <p className="text-xs text-muted-foreground">{staff.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Shield className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-sm">{staff.role}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={staff.status === "Active" ? "default" : "secondary"}>
                                                {staff.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-xs">
                                                <div className={`h-2 w-2 rounded-full ${staff.avail === "Available" ? "bg-emerald-500" :
                                                    staff.avail === "Busy" ? "bg-orange-500" : "bg-slate-300"
                                                    }`} />
                                                {staff.avail}
                                            </div>
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
                    {/* Role Management */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-md font-semibold">Role Permissions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Manager</span>
                                    <Badge variant="outline">Full Access</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">Can view earnings, manage staff, and modify pricing.</p>
                            </div>
                            <Separator />
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Staff</span>
                                    <Badge variant="outline">Limited Access</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">Can view assigned events and manage messages.</p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full mt-4">Manage Roles</Button>
                        </CardContent>
                    </Card>

                    {/* Quick Assignment */}
                    <Card className="shadow-sm border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-md font-semibold">Assign to Event</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs text-muted-foreground">Quickly assign staff to your upcoming confirmed bookings.</p>
                            <div className="rounded-lg border bg-muted/20 p-8 text-center border-dashed">
                                <Plus className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                                <p className="text-xs font-medium text-muted-foreground">Assign Role Placeholder</p>
                            </div>
                            <Button className="w-full" variant="secondary">View Staff Scheduler</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
