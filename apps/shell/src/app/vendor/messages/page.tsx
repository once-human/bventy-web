"use client";

import React from "react";
import {
    Button,
    Avatar,
    AvatarFallback,
    Input
} from "@bventy/ui";
import {
    MoreVertical,
    Send,
    Paperclip,
    SearchIcon,
    Archive,
    Filter
} from "lucide-react";

export default function MessagesPage() {
    return (
        <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-xl border bg-card shadow-sm">
            {/* Sidebar */}
            <div className="w-80 flex-col border-r hidden md:flex">
                <div className="p-4 border-b space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Messages</h2>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Archive className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-9 h-9" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {[
                        { name: "Rajesh Kapur", sub: "Wedding Reception", msg: "Can we adjust the appetizers?", time: "2m ago", unread: true },
                        { name: "Acme Corp (Sarah)", sub: "Anniversary Gala", msg: "The quote looks great, but...", time: "1h ago", unread: false },
                        { name: "Startup Hub", sub: "Tech Afterparty", msg: "Great! Let's proceed.", time: "Yesterday", unread: false },
                    ].map((chat, i) => (
                        <div key={i} className={`p-4 flex gap-3 cursor-pointer hover:bg-muted/50 transition-colors ${i === 0 ? "bg-muted/30 border-l-4 border-primary" : ""}`}>
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/10 text-primary">{chat.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold truncate">{chat.name}</p>
                                    <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                                </div>
                                <p className="text-xs font-medium text-primary/80 truncate">{chat.sub}</p>
                                <p className="text-xs text-muted-foreground truncate">{chat.msg}</p>
                            </div>
                            {chat.unread && <div className="h-2 w-2 rounded-full bg-primary mt-2" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat View */}
            <div className="flex-1 flex flex-col bg-muted/5">
                <div className="p-4 border-b flex items-center justify-between bg-card">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">RK</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-semibold">Rajesh Kapur</p>
                            <p className="text-[10px] text-emerald-500 font-medium font-mono">Wedding Reception • Online</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    <div className="flex justify-center">
                        <span className="text-[11px] font-medium bg-muted px-2 py-0.5 rounded text-muted-foreground">Today</span>
                    </div>

                    <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className="text-[10px]">RK</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <div className="p-3 rounded-2xl rounded-tl-none bg-card border text-sm shadow-sm">
                                Hello! I&apos;ve been reviewing your quote for the wedding reception. It looks comprehensive.
                            </div>
                            <span className="text-[10px] text-muted-foreground pl-1">10:42 AM</span>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse gap-3 max-w-[80%] ml-auto">
                        <div className="space-y-1 items-end flex flex-col">
                            <div className="p-3 rounded-2xl rounded-tr-none bg-primary text-primary-foreground text-sm shadow-sm">
                                Thank you, Rajesh! I&apos;m glad to hear that. Did you have any questions regarding the menu options or the pricing breakdown?
                            </div>
                            <span className="text-[10px] text-muted-foreground pr-1">10:45 AM</span>
                        </div>
                    </div>

                    <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className="text-[10px]">RK</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <div className="p-3 rounded-2xl rounded-tl-none bg-card border text-sm shadow-sm">
                                Yes, actually. Can we adjust the appetizers? We&apos;d like to include more regional specialties from our hometown. I&apos;ve attached a list of suggestions.
                            </div>
                            <div className="mt-2 flex items-center gap-2 rounded-lg border p-2 bg-muted/50 text-xs">
                                <Paperclip className="h-3 w-3" />
                                <span>Suggested_Appetizers.docx</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground pl-1">10:50 AM</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-card border-t">
                    <div className="flex gap-2 items-end">
                        <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <textarea
                            className="flex-1 min-h-[40px] max-h-[120px] rounded-lg border bg-muted/30 p-2.5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Type your message..."
                            rows={1}
                        />
                        <Button className="shrink-0 h-10 w-10 p-0 rounded-full">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
