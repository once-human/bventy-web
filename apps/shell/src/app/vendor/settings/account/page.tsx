"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Input,
    Label,
    Separator
} from "@bventy/ui";
import {
    ShieldCheck,
    Lock,
    Smartphone,
    AlertTriangle
} from "lucide-react";

export default function AccountSettingsPage() {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-muted-foreground">Manage your credentials, security, and account status.</p>
            </div>

            <div className="grid gap-8">
                {/* Password Section */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Lock className="h-4 w-4" /> Password & Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="curr-pass">Current Password</Label>
                                <Input id="curr-pass" type="password" />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="new-pass">New Password</Label>
                                    <Input id="new-pass" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="conf-pass">Confirm New Password</Label>
                                    <Input id="conf-pass" type="password" />
                                </div>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm">Update Password</Button>
                    </CardContent>
                </Card>

                {/* Two-Factor Auth */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Smartphone className="h-4 w-4" /> Multi-Factor Authentication
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between rounded-lg border p-4 bg-emerald-50/20 border-emerald-100">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Authenticator App (TOTP)</p>
                                    <p className="text-xs text-muted-foreground">Enabled via Google Authenticator</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">Disable</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Separator />
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-destructive flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" /> Danger Zone
                    </h3>
                    <Card className="shadow-sm border-destructive/20 bg-destructive/5">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold">Deactivate Account</p>
                                    <p className="text-xs text-muted-foreground">Temporarily hide your business profile and pause all active leads.</p>
                                </div>
                                <Button variant="destructive" size="sm">Deactivate</Button>
                            </div>
                            <Separator className="bg-destructive/10" />
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-destructive">Delete Account</p>
                                    <p className="text-xs text-muted-foreground">Permanently delete your account and all associated data. This cannot be undone.</p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive hover:text-white">Delete Permanently</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
