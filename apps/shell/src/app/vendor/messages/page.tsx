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
    Search,
    SlidersHorizontal
} from "lucide-react";
import { messagingService, Conversation } from "@bventy/services";
import { useAuth } from "@bventy/services";
import { ChatInterface } from "@/components/messaging/ChatInterface";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export default function MessagesPage() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeConvId, setActiveConvId] = useState<string | null>(null);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await messagingService.getConversations();
                setConversations(data);
                if (data.length > 0) setActiveConvId(data[0].id);
            } catch (err) {
                console.error("Failed to load conversations:", err);
                toast.error("Failed to load your conversations");
            } finally {
                setIsLoading(false);
            }
        };
        if (user) load();
    }, [user]);

    const activeConv = conversations.find(c => c.id === activeConvId);

    return (
        <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border bg-card shadow-sm">
            {/* Sidebar */}
            <div className="w-80 flex-col border-r hidden md:flex">
                <div className="p-4 border-b space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-xl font-bold tracking-tight">Messages</h2>
                        <div className="flex gap-2 text-muted-foreground">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Archive className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="relative px-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full h-10 bg-muted/50 border-none rounded-lg pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary/20 outline-none transition-all"
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
                    ) : conversations.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                            <MessageSquareOff className="h-8 w-8 mb-2 opacity-50" />
                            <p className="text-sm">No conversations yet.</p>
                        </div>
                    ) : (
                        conversations.map((chat) => {
                            const isActive = chat.id === activeConvId;
                            const otherName = chat.organizer_name || "Organizer";
                            const initial = otherName.charAt(0).toUpperCase();
                            const timeLabel = hasMounted
                                ? (chat.last_message_at
                                    ? formatDistanceToNow(new Date(chat.last_message_at), { addSuffix: true })
                                    : formatDistanceToNow(new Date(chat.created_at), { addSuffix: true }))
                                : "...";

                            return (
                                <div
                                    key={chat.id}
                                    onClick={() => setActiveConvId(chat.id)}
                                    className={`px-4 py-5 flex gap-3 cursor-pointer transition-all border-b border-border/40 ${isActive ? "bg-muted/50" : "hover:bg-muted/30"}`}
                                >
                                    <div className="relative shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-semibold text-slate-500">
                                            {initial}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-0.5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-bold text-foreground/90 truncate">
                                                {otherName}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                                    {timeLabel.replace('about ', '').replace(' ago', '')}
                                                </span>
                                                {chat.unread_count > 0 && (
                                                    <div className="h-2 w-2 rounded-full bg-black dark:bg-white" />
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                                            {chat.event_title}
                                        </p>
                                        <p className="text-[11px] text-slate-400 truncate mt-1">
                                            {chat.chat_locked ? 'Chat locked' : 'Can we adjust the appetizers?'}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Main Chat Interface */}
            {/* Content */}
            {!activeConvId || !activeConv || !user ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground border-border bg-white p-12">
                    <MessageSquareOff className="h-10 w-10 mb-4 opacity-10" strokeWidth={1.5} />
                    <p className="text-sm font-medium">Select a conversation to start messaging</p>
                </div>
            ) : (
                <div className="h-full bg-white dark:bg-slate-950 overflow-hidden">
                    <ChatInterface
                        conversationId={activeConv.id}
                        currentUserId={user.id}
                        chatLocked={activeConv.chat_locked}
                        otherPartyName={activeConv.organizer_name || "Organizer"}
                        otherPartyRole="organizer"
                        eventTitle={activeConv.event_title}
                        quoteId={activeConv.quote_id}
                        quoteStatus={activeConv.quote_status}
                        onQuoteResponded={() => {
                            messagingService.getConversations().then(data => setConversations(data));
                        }}
                    />
                </div>
            )}
        </div>
    );
}
