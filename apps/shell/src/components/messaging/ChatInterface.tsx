import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, messagingService, useWebSocket } from '@bventy/services';
import { Send, Paperclip, Lock, Check, CheckCheck } from 'lucide-react';
import { Button, Input, Skeleton } from '@bventy/ui';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface ChatInterfaceProps {
    conversationId: string;
    currentUserId: string;
    chatLocked: boolean;
    otherPartyName: string;
    otherPartyRole: 'vendor' | 'organizer';
}

export function ChatInterface({ conversationId, currentUserId, chatLocked, otherPartyName, otherPartyRole }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { lastMessage, isConnected } = useWebSocket(conversationId);

    // Initial Fetch
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await messagingService.getMessages(conversationId);
                setMessages(data);

                // Mark unread messages as read
                if (data.some(m => !m.is_read && m.sender_user_id !== currentUserId)) {
                    await messagingService.markAsRead(conversationId);
                }
            } catch (error) {
                console.error('Failed to fetch messages:', error);
                toast.error('Failed to load chat history');
            } finally {
                setIsLoading(false);
            }
        };

        if (conversationId) {
            fetchMessages();
        }
    }, [conversationId, currentUserId]);

    // Handle incoming websocket messages
    useEffect(() => {
        if (!lastMessage) return;

        if (lastMessage.type === 'new_message') {
            const newMessage = lastMessage.payload as ChatMessage;

            // Only add if we don't already have it (optimistic UI safeguard)
            setMessages(prev => {
                const exists = prev.find(m => m.id === newMessage.id);
                if (exists) return prev;
                return [...prev, newMessage];
            });

            // If it's from the other person, mark it as read
            if (newMessage.sender_user_id !== currentUserId) {
                messagingService.markAsRead(conversationId).catch(console.error);
            }
        } else if (lastMessage.type === 'message_read') {
            // Handle read receipt updates
            setMessages(prev => prev.map(m =>
                m.id === lastMessage.payload.message_id ? { ...m, is_read: true } : m
            ));
        }
    }, [lastMessage, conversationId, currentUserId]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed || isSending || chatLocked) return;

        setIsSending(true);
        setInputValue('');

        try {
            // Optimistic update
            const tempId = `temp-${Date.now()}`;
            const optimisticMsg: ChatMessage = {
                id: tempId,
                sender_user_id: currentUserId,
                sender_name: 'You', // Or actual name if passed
                message_type: 'text',
                body: trimmed,
                attachment_url: null,
                attachment_type: null,
                system_payload: null,
                created_at: new Date().toISOString(),
                edited_at: null,
                deleted_at: null,
                is_read: false
            };

            setMessages(prev => [...prev, optimisticMsg]);

            const res = await messagingService.sendMessage(conversationId, {
                message_type: 'text',
                body: trimmed
            });

            // Swap temp ID with real ID
            setMessages(prev => prev.map(m => m.id === tempId ? { ...m, id: res.message_id } : m));

        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
            // Revert optimistic update
            setInputValue(trimmed);
            setMessages(prev => prev.filter(m => !m.id.startsWith('temp-')));
        } finally {
            setIsSending(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col h-[500px] border border-border rounded-lg bg-card overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                    <Skeleton className="h-6 w-1/3" />
                </div>
                <div className="flex-1 p-4 space-y-4">
                    <Skeleton className="h-12 w-2/3 rounded-tr-lg rounded-br-lg rounded-bl-lg" />
                    <Skeleton className="h-12 w-2/3 ml-auto rounded-tl-lg rounded-bl-lg rounded-br-lg" />
                    <Skeleton className="h-12 w-1/2 rounded-tr-lg rounded-br-lg rounded-bl-lg" />
                </div>
                <div className="p-4 border-t border-border">
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[500px] sm:h-[600px] border border-border rounded-lg bg-card overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {otherPartyName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-semibold">{otherPartyName}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{otherPartyRole}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`} title={isConnected ? 'Connected' : 'Disconnected'} />
                    <span className="text-xs text-muted-foreground hidden sm:inline-block">
                        {isConnected ? 'Real-time active' : 'Connecting...'}
                    </span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5 scroll-smooth">
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                        No messages yet.
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        const isMe = msg.sender_user_id === currentUserId;
                        const isSystem = msg.message_type === 'system' || msg.message_type === 'quote_card';

                        // Add date separators if needed (simple check against previous message date)
                        let showDateSeparator = false;
                        if (idx === 0) {
                            showDateSeparator = true;
                        } else {
                            const prevDate = new Date(messages[idx - 1].created_at).toDateString();
                            const currDate = new Date(msg.created_at).toDateString();
                            showDateSeparator = prevDate !== currDate;
                        }

                        return (
                            <React.Fragment key={msg.id}>
                                {showDateSeparator && (
                                    <div className="flex justify-center my-4">
                                        <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                                            {format(new Date(msg.created_at), 'MMM d, yyyy')}
                                        </span>
                                    </div>
                                )}
                                <div className={`flex flex-col ${isSystem ? 'items-center my-6' : isMe ? 'items-end' : 'items-start'}`}>

                                    {isSystem ? (
                                        <div className="max-w-[85%] bg-muted border border-border text-center px-4 py-3 rounded-lg text-sm text-foreground space-y-2 relative">
                                            {msg.message_type === 'quote_card' && msg.system_payload ? (
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-center gap-2 text-primary font-medium pb-2 border-b border-border/50">
                                                        <Paperclip className="h-4 w-4" />
                                                        <span>Quote Request Context</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 text-left text-xs">
                                                        {msg.system_payload.budget_range && (
                                                            <div>
                                                                <span className="text-muted-foreground block mb-1">Budget</span>
                                                                <span className="font-medium">{msg.system_payload.budget_range}</span>
                                                            </div>
                                                        )}
                                                        {msg.system_payload.deadline && (
                                                            <div>
                                                                <span className="text-muted-foreground block mb-1">Deadline</span>
                                                                <span className="font-medium">{format(new Date(msg.system_payload.deadline), 'PP')}</span>
                                                            </div>
                                                        )}
                                                        {msg.system_payload.special_requirements && (
                                                            <div className="col-span-2 mt-2 pt-2 border-t border-border/50">
                                                                <span className="text-muted-foreground block mb-1">Notes</span>
                                                                <span className="italic">"{msg.system_payload.special_requirements}"</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    {msg.body?.includes("locked") || msg.body?.includes("expired") ? <Lock className="h-4 w-4" /> : null}
                                                    <span>{msg.body}</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                                            <div
                                                className={`px-4 py-2 text-sm shadow-sm ${isMe
                                                        ? 'bg-primary text-primary-foreground rounded-tl-xl rounded-tr-md rounded-bl-xl rounded-br-sm'
                                                        : 'bg-muted border border-border text-foreground rounded-tr-xl rounded-tl-md rounded-br-xl rounded-bl-sm'
                                                    }`}
                                            >
                                                {msg.body}
                                            </div>
                                            <div className={`flex items-center gap-1 mt-1 px-1 text-[10px] text-muted-foreground bg-background/80 backdrop-blur-sm rounded-full py-0.5`}>
                                                <span>{format(new Date(msg.created_at), 'HH:mm')}</span>
                                                {isMe && (
                                                    <span className="ml-1 text-primary/80">
                                                        {msg.is_read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-border bg-card">
                {chatLocked ? (
                    <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 bg-muted/50 rounded-md border border-dashed border-border">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mb-1">
                            <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <h4 className="text-sm font-medium">Chat is Locked</h4>
                        <p className="text-xs text-muted-foreground max-w-sm">
                            Messaging is only available for accepted quotes.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="shrink-0 h-11 w-11 rounded-full text-muted-foreground hover:text-foreground hidden sm:flex"
                            title="Attach file (coming soon)"
                            disabled
                        >
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 h-11 rounded-full px-4 border-muted-foreground/20 focus-visible:ring-primary focus-visible:ring-offset-0 bg-muted/20"
                            disabled={isSending}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="shrink-0 h-11 w-11 rounded-full transition-transform active:scale-95"
                            disabled={!inputValue.trim() || isSending}
                        >
                            <Send className="h-4 w-4 translate-x-[-1px] translate-y-[1px]" />
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
