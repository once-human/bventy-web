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
    Textarea,
    Avatar,
    AvatarFallback
} from "@bventy/ui";
import {
    Camera,
    Globe,
    Mail,
    Phone,
    MapPin,
    Save
} from "lucide-react";

export default function BusinessProfilePage() {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Business Profile</h1>
                <p className="text-muted-foreground">Manage your public business listing and contact information.</p>
            </div>

            <div className="grid gap-8">
                {/* Branding Section */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Branding</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center">
                            <div className="relative group">
                                <Avatar className="h-24 w-24 border-2">
                                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">B</AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-semibold">Business Logo</h3>
                                <p className="text-xs text-muted-foreground">Recommended size: 400x400px. JPG, PNG or SVG.</p>
                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm">Upload New</Button>
                                    <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* General Information */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">General Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="biz-name">Business Name</Label>
                                <Input id="biz-name" defaultValue="Bventy Premium Catering" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="biz-category">Category</Label>
                                <Input id="biz-category" defaultValue="Catering & Hospitality" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="biz-bio">About your business</Label>
                            <Textarea
                                id="biz-bio"
                                className="min-h-[120px]"
                                defaultValue="We provide high-quality catering services for weddings, corporate events, and private parties with a focus on regional specialties and elegant presentation."
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Contact & Location</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="biz-email">Business Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="biz-email" className="pl-9" defaultValue="contact@bventy.in" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="biz-phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="biz-phone" className="pl-9" defaultValue="+91 98765 43210" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="biz-website">Website</Label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="biz-website" className="pl-9" placeholder="https://..." />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="biz-address">Primary Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="biz-address" className="pl-9" defaultValue="Mumbai, MH, India" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline">Preview Listing</Button>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
