"use client";

import React, { useState, useEffect } from "react";
import {
    Button,
    Avatar,
    AvatarFallback,
    Skeleton
} from "@bventy/ui";
import {
    Archive,
    Filter,
    MessageSquareOff,
    CheckCircle
} from "lucide-react";
import { Navbar, Footer } from "@bventy/ui";
import { messagingService, Conversation, quoteService } from "@bventy/services";
import { useAuth } from "@bventy/services";
import { ChatInterface } from "@/components/messaging/ChatInterface";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Quote } from "lucide-react";

export default function MyQuotesPage() {
    const { user, loading: authLoading } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeConvId, setActiveConvId] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || "";
            window.location.href = `${AUTH_URL}/login`;
            return;
        }

        const load = async () => {
            try {
                const data = await messagingService.getConversations();
                setConversations(data);
                if (data.length > 0) setActiveConvId(data[0].id);
            } catch (err) {
                console.error("Failed to load conversations:", err);
                toast.error("Failed to load your quotes");
            } finally {
                setIsLoading(false);
            }
        };

        if (user) load();
    }, [user, authLoading]);

    const activeConv = conversations.find(c => c.id === activeConvId);

    const handleAcceptQuote = async (quoteId: string) => {
        if (!quoteId) return;
        try {
            await quoteService.acceptQuote(quoteId);
            toast.success("Quote accepted successfully! Chat unlocked.");
            // Refresh conversations so the chat unlocks instantly
            const data = await messagingService.getConversations();
            setConversations(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to accept quote");
        }
    };

    if (authLoading) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Quotations & Messaging</h1>
                    <p className="text-muted-foreground">Manage quotes and collaborate directly with vendors.</p>
                </div>

                <div className="flex h-[700px] overflow-hidden rounded-xl border bg-card shadow-sm">
                    {/* Sidebar */}
                    <div className="w-80 flex-col border-r hidden md:flex">
                        <div className="p-4 border-b space-y-4 bg-muted/10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold">Connections</h2>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="p-4 flex gap-3 border-b border-border/50">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    </div>
                                ))
                            ) : conversations.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                                    <Quote className="h-8 w-8 mb-2 opacity-30" />
                                    <p className="text-sm">No vendors have quoted yet.</p>
                                </div>
                            ) : (
                                conversations.map((chat) => {
                                    const isActive = chat.id === activeConvId;
                                    const otherName = chat.vendor_name || "Vendor";
                                    const initial = otherName.charAt(0).toUpperCase();
                                    const timeLabel = chat.last_message_at
                                        ? formatDistanceToNow(new Date(chat.last_message_at), { addSuffix: true })
                                        : formatDistanceToNow(new Date(chat.created_at), { addSuffix: true });

                                    return (
                                        <div
                                            key={chat.id}
                                            onClick={() => setActiveConvId(chat.id)}
                                            className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-border/50 ${isActive ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/50"}`}
                                        >
                                            <div className="relative">
                                                <Avatar className="h-10 w-10 border border-border/50">
                                                    <AvatarFallback className={`${isActive ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                                                        {initial}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {chat.unread_count > 0 && (
                                                    <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[9px] font-bold text-white shadow-sm ring-2 ring-card">
                                                        {chat.unread_count > 9 ? '9+' : chat.unread_count}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <p className={`text-sm truncate ${isActive || chat.unread_count > 0 ? 'font-semibold' : 'font-medium'}`}>
                                                        {otherName}
                                                    </p>
                                                    <span className={`text-[10px] whitespace-nowrap ${chat.unread_count > 0 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                                                        {timeLabel}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-semibold text-primary/80 truncate">
                                                    {chat.event_title}
                                                </p>
                                                <div className="flex items-center justify-between mt-1">
                                                    <p className={`text-xs truncate ${chat.unread_count > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                                                        {chat.chat_locked ? 'Action required' : 'Chat unlocked'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Main Chat Interface */}
                    <div className="flex-1 flex flex-col bg-muted/10 h-full overflow-hidden">
                        {!activeConvId || !activeConv || !user ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground border border-border rounded-xl bg-card shadow-sm m-4">
                                <MessageSquareOff className="h-10 w-10 mb-4 opacity-50" />
                                <p>Select a quote response to review it.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full bg-card p-4">
                                {/* Action Bar for Locked Chats (Pending Acceptance) */}
                                {activeConv.chat_locked && (
                                    <div className="mb-4 bg-orange-50/50 border border-orange-200 dark:bg-orange-950/20 dark:border-orange-900 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold text-orange-800 dark:text-orange-400">Quote Pending Approval</h3>
                                            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Review the vendor's quoted price and message. Accept the quote to unlock real-time chat.</p>
                                        </div>
                                        <Button
                                            onClick={() => handleAcceptQuote(activeConv.quote_id)}
                                            variant="default"
                                            className="shrink-0 bg-orange-600 hover:bg-orange-700 text-white"
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Accept Quote
                                        </Button>
                                    </div>
                                )}

                                <div className="flex-1 overflow-hidden rounded-lg border shadow-sm h-full">
                                    <ChatInterface
                                        conversationId={activeConv.id}
                                        currentUserId={user.id}
                                        chatLocked={activeConv.chat_locked}
                                        otherPartyName={activeConv.vendor_name || "Vendor"}
                                        otherPartyRole="vendor"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
