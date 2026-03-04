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
    ArrowLeft,
    Search
} from "lucide-react";
import {
    Input
} from "@bventy/ui";
import { messagingService, Conversation } from "@bventy/services";
import { useAuth } from "@bventy/services";
import { ChatInterface } from "@/components/messaging/ChatInterface";
import { format } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";

export default function OrganizerMessagesPage() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [activeConvId, setActiveConvId] = useState<string | null>(null);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const load = async () => {
        try {
            const data = await messagingService.getConversations();
            setConversations(data);
            if (data.length > 0 && !activeConvId) {
                setActiveConvId(data[0].id);
            }
        } catch (err) {
            console.error("Failed to load conversations:", err);
            toast.error("Failed to load your conversations");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) load();
    }, [user]);

    const filteredConversations = conversations.filter(c =>
        (c.vendor_name || "Vendor").toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.event_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeConv = conversations.find(c => c.id === activeConvId);

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl h-[calc(100vh-8rem)]">
            <div className="mb-6 flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
                    <p className="text-muted-foreground">Chat with vendors about your events.</p>
                </div>
            </div>

            <div className="flex h-full overflow-hidden rounded-xl border bg-card shadow-sm">
                {/* Sidebar */}
                <div className="w-80 flex-col border-r hidden md:flex">
                    <div className="p-4 border-b space-y-4 bg-card">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-foreground/90">Messages</h2>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted text-muted-foreground">
                                    <Archive className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted text-muted-foreground">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                            <Input
                                placeholder="Search messages..."
                                className="pl-9 h-10 bg-muted/30 border-none rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-primary/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
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
                        ) : filteredConversations.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                                <MessageSquareOff className="h-8 w-8 mb-2 opacity-50" />
                                <p className="text-sm">No messages found.</p>
                            </div>
                        ) : (
                            filteredConversations.map((chat) => {
                                const isActive = chat.id === activeConvId;
                                const otherName = chat.vendor_name || "Vendor";
                                const initial = otherName.charAt(0).toUpperCase();
                                const timeLabel = hasMounted
                                    ? (chat.last_message_at
                                        ? format(new Date(chat.last_message_at), 'h:mm aa')
                                        : format(new Date(chat.created_at), 'h:mm aa'))
                                    : "...";

                                return (
                                    <div
                                        key={chat.id}
                                        onClick={() => setActiveConvId(chat.id)}
                                        className={`p-4 flex gap-3 cursor-pointer transition-all border-b border-border/40 relative ${isActive ? "bg-primary/[0.03]" : "hover:bg-muted/30"}`}
                                    >
                                        <div className="relative">
                                            <Avatar className="h-11 w-11 border border-border/40 shadow-sm">
                                                <AvatarFallback className={`text-sm ${isActive ? 'bg-primary text-primary-foreground font-bold' : 'bg-primary/5 text-primary font-semibold'}`}>
                                                    {initial}
                                                </AvatarFallback>
                                            </Avatar>
                                            {chat.online && (
                                                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card shadow-sm" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-0.5">
                                            <div className="flex items-center justify-between">
                                                <p className={`text-sm truncate ${chat.unread_count > 0 ? 'font-bold text-foreground' : 'font-semibold text-foreground/80'}`}>
                                                    {otherName}
                                                </p>
                                                <span className={`text-[10px] whitespace-nowrap ${chat.unread_count > 0 ? 'text-primary font-bold' : 'text-muted-foreground/60'}`}>
                                                    {timeLabel}
                                                </span>
                                            </div>
                                            <p className="text-[11px] font-bold text-primary/70 uppercase tracking-tight truncate">
                                                {chat.vendor_category || chat.event_title}
                                            </p>
                                            <div className="flex items-center justify-between gap-2">
                                                <p className={`text-xs truncate flex-1 ${chat.unread_count > 0 ? 'text-foreground font-medium' : 'text-muted-foreground/70'}`}>
                                                    {chat.last_message || (chat.chat_locked ? '🔒 Waiting for response' : 'Start conversation')}
                                                </p>
                                                {chat.unread_count > 0 && (
                                                    <div className="h-2 w-2 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.4)]" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Main Chat Interface */}
                <div className="flex-1 bg-muted/10 h-full p-0 sm:p-4 overflow-hidden">
                    {!activeConvId || !activeConv || !user ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground border border-border rounded-xl bg-card shadow-sm">
                            <MessageSquareOff className="h-10 w-10 mb-4 opacity-50" />
                            <p>Select a conversation to start messaging</p>
                        </div>
                    ) : (
                        <ChatInterface
                            conversationId={activeConv.id}
                            currentUserId={user.id}
                            chatLocked={activeConv.chat_locked}
                            otherPartyName={activeConv.vendor_name || "Vendor"}
                            otherPartyRole="vendor"
                            otherPartyId={activeConv.other_user_id}
                            otherPartyOnline={activeConv.online}
                            otherPartySubtitle={activeConv.vendor_category}
                            quoteId={activeConv.quote_id}
                            quoteStatus={activeConv.quote_status}
                            onQuoteResponded={() => load()}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
