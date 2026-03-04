import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, messagingService, useWebSocket, quoteService, mediaService } from '@bventy/services';
import { Send, Paperclip, Lock, Check, CheckCheck, Loader2, FileIcon, X } from 'lucide-react';
import { Button, Input, Skeleton } from '@bventy/ui';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface ChatInterfaceProps {
    conversationId: string;
    currentUserId: string;
    chatLocked: boolean;
    otherPartyName: string;
    otherPartyRole: 'vendor' | 'organizer';
    quoteId: string;
    quoteStatus?: string;
    onQuoteResponded?: () => void;
}

export function ChatInterface({ conversationId, currentUserId, chatLocked, otherPartyName, otherPartyRole, quoteId, quoteStatus, onQuoteResponded }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Quote Response State
    const [quotePrice, setQuotePrice] = useState('');
    const [quoteMessage, setQuoteMessage] = useState('');
    const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
    const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isVerificationRequired, setIsVerificationRequired] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            } catch (error: any) {
                console.error('Failed to fetch messages:', error);
                if (error?.response?.status === 403 && error?.response?.data?.error === "Email verification required.") {
                    setIsVerificationRequired(true);
                } else {
                    toast.error('Failed to load chat history');
                }
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await mediaService.uploadMedia(file);
            setAttachmentUrl(url);
            toast.success("File uploaded successfully");
        } catch (error) {
            console.error('File upload failed:', error);
            toast.error("Failed to upload file");
        } finally {
            setIsUploading(false);
        }
    };

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

        } catch (error: any) {
            console.error('Error sending message:', error);
            if (error?.response?.status === 403 && error?.response?.data?.error === "Email verification required.") {
                setIsVerificationRequired(true);
                toast.error('Email verification required to send messages');
            } else {
                toast.error('Failed to send message');
            }
            // Revert optimistic update
            setInputValue(trimmed);
            setMessages(prev => prev.filter(m => !m.id.startsWith('temp-')));
        } finally {
            setIsSending(false);
        }
    };

    const handleQuoteResponse = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!quotePrice || isSubmittingQuote) return;

        setIsSubmittingQuote(true);
        try {
            await quoteService.respondToQuote(quoteId, Number(quotePrice), quoteMessage, attachmentUrl || undefined);
            toast.success("Quote submitted to Organizer");
            if (onQuoteResponded) onQuoteResponded();
        } catch (error: any) {
            console.error('Failed to respond to quote:', error);
            if (error?.response?.status === 403 && error?.response?.data?.error === "Email verification required.") {
                setIsVerificationRequired(true);
                toast.error('Email verification required to submit quotes');
            } else {
                toast.error('Failed to submit quote');
            }
        } finally {
            setIsSubmittingQuote(false);
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
        <div className="flex flex-col h-full border border-border rounded-lg bg-card overflow-hidden shadow-sm">
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
                {isVerificationRequired && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl mb-4">
                        <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200">
                            <Lock className="h-5 w-5 shrink-0" />
                            <div className="text-sm">
                                <p className="font-semibold">Email Verification Required</p>
                                <p className="opacity-90">Please verify your email address to unlock messaging and other restricted features.</p>
                            </div>
                        </div>
                    </div>
                )}
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                        {isVerificationRequired ? "Messages are locked until email is verified." : "No messages yet."}
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        const isMe = msg.sender_user_id === currentUserId;
                        const isSystem = msg.message_type === 'system';

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
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                {msg.body?.includes("locked") || msg.body?.includes("expired") ? <Lock className="h-4 w-4" /> : null}
                                                <span>{msg.body}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                                            {msg.message_type === 'quote_card' && msg.system_payload ? (
                                                <div className={`px-3 py-2 shadow-sm text-sm ${isMe ? 'bg-primary/5 border border-primary/20 text-foreground rounded-tl-xl rounded-tr-md rounded-bl-xl rounded-br-sm' : 'bg-muted border border-border text-foreground rounded-tr-xl rounded-tl-md rounded-br-xl rounded-bl-sm'}`}>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 font-medium pb-1 border-b border-primary/10 dark:border-border/50 text-xs">
                                                            <Paperclip className="h-3 w-3" />
                                                            <span>Request Context</span>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-left text-[10px]">
                                                            {msg.system_payload.budget_range && (
                                                                <div>
                                                                    <span className="text-muted-foreground">Budget: </span>
                                                                    <span className="font-medium">{msg.system_payload.budget_range}</span>
                                                                </div>
                                                            )}
                                                            {msg.system_payload.deadline && (
                                                                <div>
                                                                    <span className="text-muted-foreground">Deadline: </span>
                                                                    <span className="font-medium">{format(new Date(msg.system_payload.deadline), 'PP')}</span>
                                                                </div>
                                                            )}
                                                            {msg.system_payload.special_requirements && (
                                                                <div className="col-span-2 text-muted-foreground line-clamp-2">
                                                                    <span className="italic">"{msg.system_payload.special_requirements}"</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className={`px-4 py-2 text-sm shadow-sm ${isMe
                                                        ? 'bg-primary text-primary-foreground rounded-tl-xl rounded-tr-md rounded-bl-xl rounded-br-sm'
                                                        : 'bg-muted border border-border text-foreground rounded-tr-xl rounded-tl-md rounded-br-xl rounded-bl-sm'
                                                        }`}
                                                >
                                                    {msg.body}
                                                </div>
                                            )}

                                            <div className={`flex items-center gap-1 mt-1 px-1 text-[10px] text-muted-foreground bg-background/80 backdrop-blur-sm rounded-full py-0.5`}>
                                                <span>{format(new Date(msg.created_at), 'HH:mm')}</span>
                                                {isMe && (
                                                    <span className="ml-1 text-primary/80">
                                                        {msg.is_read ? <CheckCheck className="h-3 w-3 inline-block" /> : <Check className="h-3 w-3 inline-block" />}
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
                    otherPartyRole === 'organizer' ? (
                        quoteStatus === 'pending' ? (
                            <form onSubmit={handleQuoteResponse} className="bg-muted/10 p-3 sm:p-4 rounded-lg border border-border/50 flex flex-col gap-3">
                                <div className="text-sm font-semibold flex items-center justify-between">
                                    <span>Respond to Quote Request</span>
                                    <span className="text-xs font-normal text-muted-foreground hidden sm:inline-block">This officially unlocks pricing logic.</span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Quoted Price (₹)"
                                        value={quotePrice}
                                        onChange={e => setQuotePrice(e.target.value)}
                                        required
                                        className="sm:max-w-[140px]"
                                        disabled={isSubmittingQuote || isUploading}
                                        min="0"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Optional message..."
                                        value={quoteMessage}
                                        onChange={e => setQuoteMessage(e.target.value)}
                                        className="flex-1"
                                        disabled={isSubmittingQuote || isUploading}
                                    />
                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="application/pdf,image/*"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="shrink-0 h-10 w-10"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isSubmittingQuote || isUploading}
                                        title="Attach Proposal (PDF/Image)"
                                    >
                                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
                                    </Button>
                                    <Button type="submit" disabled={isSubmittingQuote || isUploading || !quotePrice} className="shrink-0 w-full sm:w-auto">
                                        {isSubmittingQuote ? 'Sending...' : 'Send Quote'}
                                    </Button>
                                </div>
                                {attachmentUrl && (
                                    <div className="flex items-center gap-2 text-xs text-primary bg-primary/5 p-2 rounded border border-primary/20 animate-in fade-in slide-in-from-top-1">
                                        <FileIcon className="h-3 w-3" />
                                        <span className="truncate flex-1">Proposal attached</span>
                                        <button
                                            type="button"
                                            onClick={() => setAttachmentUrl(null)}
                                            className="hover:text-destructive transition-colors"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 bg-muted/50 rounded-md border border-dashed border-border text-muted-foreground">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mb-1">
                                    <Check className="h-4 w-4" />
                                </div>
                                <h4 className="text-sm font-medium text-foreground">Quote Response Sent</h4>
                                <p className="text-xs max-w-sm">
                                    Waiting for the Organizer to review your price and accept the quote to unlock the chat.
                                </p>
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 bg-muted/50 rounded-md border border-dashed border-border text-muted-foreground">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mb-1">
                                <Lock className="h-4 w-4" />
                            </div>
                            <h4 className="text-sm font-medium text-foreground">Chat is Locked</h4>
                            <p className="text-xs max-w-sm">
                                Messaging is only available for accepted quotes.
                            </p>
                        </div>
                    )
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
