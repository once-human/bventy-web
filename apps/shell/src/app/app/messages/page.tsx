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
    ArrowLeft
} from "lucide-react";
import { messagingService, Conversation } from "@bventy/services";
import { useAuth } from "@bventy/services";
import { ChatInterface } from "@/components/messaging/ChatInterface";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";

export default function OrganizerMessagesPage() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
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
                    <div className="p-4 border-b space-y-4 bg-muted/10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold">Inbox</h2>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                                    <Archive className="h-4 w-4" />
                                </Button>
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
                                <MessageSquareOff className="h-8 w-8 mb-2 opacity-50" />
                                <p className="text-sm">No conversations yet.</p>
                            </div>
                        ) : (
                            conversations.map((chat) => {
                                const isActive = chat.id === activeConvId;
                                const otherName = chat.vendor_name || "Vendor";
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
                                                    {chat.chat_locked ? '🔒 Chat locked' : 'View conversation'}
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
