import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, messagingService, useWebSocket, quoteService, mediaService, MessageReaction } from '@bventy/services';
import { Send, Paperclip, Lock, Check, CheckCheck, Loader2, FileIcon, X, Calendar, Banknote, FileText, Info, Smile, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Button,
    Input,
    Skeleton,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
    Textarea,
    Badge
} from '@bventy/ui';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface ChatInterfaceProps {
    conversationId: string;
    currentUserId: string;
    chatLocked: boolean;
    otherPartyName: string;
    otherPartyRole: 'vendor' | 'organizer';
    eventTitle?: string;
    quoteId: string;
    quoteStatus?: string;
    onQuoteResponded?: () => void;
}

const REACTION_OPTIONS = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

export function ChatInterface({ conversationId, currentUserId, chatLocked, otherPartyName, otherPartyRole, eventTitle, quoteId, quoteStatus, onQuoteResponded }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
    const [activeReactionPickerId, setActiveReactionPickerId] = useState<string | null>(null);

    // Quote Response State
    const [quotePrice, setQuotePrice] = useState('');
    const [quoteMessage, setQuoteMessage] = useState('');
    const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
    const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isVerificationRequired, setIsVerificationRequired] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
    const [revisionText, setRevisionText] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { lastMessage, isConnected } = useWebSocket(conversationId);

    const handleRevisionSubmit = async () => {
        if (!revisionText.trim() || isSubmittingQuote) return;
        await handleQuoteResponseAction('revision', revisionText);
        setIsRevisionModalOpen(false);
        setRevisionText('');
    };

    // Scroll to bottom on load and new messages
    useEffect(() => {
        if (!isLoading && hasMounted && messagesEndRef.current) {
            // Precise scroll after a microfetch to ensure DOM has rendered
            const timer = setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [messages, hasMounted, isLoading]);

    const fetchMessages = async () => {
        if (!conversationId) return;
        setIsLoading(true);
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

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (conversationId) {
            fetchMessages();
        }
    }, [conversationId, currentUserId]);

    // Debug: Log all unique message types
    useEffect(() => {
        if (messages.length > 0) {
            const types = Array.from(new Set(messages.map(m => m.message_type)));
            console.log(`[DEBUG] Current conversation messages: ${messages.length}, Types: ${types.join(', ')}`);
        }
    }, [messages]);

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

            // If it's a quote-related message, trigger a refresh of the conversation status
            if (newMessage.message_type.startsWith('quote_')) {
                if (onQuoteResponded) onQuoteResponded();
            }

            // If it's from the other person, mark it as read
            if (newMessage.sender_user_id !== currentUserId) {
                messagingService.markAsRead(conversationId).catch(console.error);
            }
            setMessages(prev => prev.map(m =>
                m.id === lastMessage.payload.message_id ? { ...m, is_read: true } : m
            ));
        } else if (lastMessage.type === 'reaction_updated') {
            const { message_id, reactions } = lastMessage.payload;
            setMessages(prev => prev.map(m =>
                m.id === message_id ? { ...m, reactions } : m
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
        if ((!trimmed && !attachmentUrl) || isSending || chatLocked) return;

        setIsSending(true);
        setInputValue('');

        try {
            // We rely on the WebSocket broadcast to add the message to the UI.
            // This prevents duplication once and for all.
            await messagingService.sendMessage(conversationId, {
                message_type: attachmentUrl ? 'attachment' : 'text',
                body: trimmed || undefined,
                attachment_url: attachmentUrl || undefined,
                attachment_type: attachmentUrl ? (attachmentUrl.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg') : undefined
            });
            setAttachmentUrl(null); // Clear after send
        } catch (error: any) {
            console.error('Error sending message:', error);
            if (error?.response?.status === 403 && error?.response?.data?.error === "Email verification required.") {
                setIsVerificationRequired(true);
                toast.error('Email verification required to send messages');
            } else {
                toast.error('Failed to send message');
            }
            // Restore input on failure
            setInputValue(trimmed);
        } finally {
            setIsSending(false);
        }
    };

    const handleToggleReaction = async (messageId: string, emoji: string) => {
        try {
            // Optimistic update
            setMessages(prev => prev.map(msg => {
                if (msg.id !== messageId) return msg;
                const existingReactions = msg.reactions || [];
                const hasReacted = existingReactions.some(r => r.reaction === emoji && r.user_id === currentUserId);

                let newReactions;
                if (hasReacted) {
                    newReactions = existingReactions.filter(r => !(r.reaction === emoji && r.user_id === currentUserId));
                } else {
                    newReactions = [...existingReactions, { reaction: emoji, user_id: currentUserId }];
                }
                return { ...msg, reactions: newReactions };
            }));

            await messagingService.toggleReaction(conversationId, messageId, emoji);
        } catch (error) {
            console.error('Failed to toggle reaction:', error);
            toast.error('Failed to update reaction');
        }
    };

    const handleQuoteResponse = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!quotePrice || isSubmittingQuote) return;

        setIsSubmittingQuote(true);
        try {
            await quoteService.respondToQuote(quoteId, Number(quotePrice), quoteMessage, attachmentUrl || undefined);
            toast.success("Quote submitted to Organizer");
            // Refresh local state
            await fetchMessages();
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

    const handleQuoteResponseAction = async (action: 'accept' | 'reject' | 'revision', message?: string) => {
        setIsSubmittingQuote(true);
        try {
            if (action === 'accept') {
                await quoteService.acceptQuote(quoteId);
                toast.success("Quote accepted! Chat unlocked.");
            } else if (action === 'revision') {
                await quoteService.requestRevision(quoteId, message || '');
                toast.success("Revision requested");
            } else if (action === 'reject') {
                await quoteService.rejectQuote(quoteId);
                toast.success("Quote rejected");
            }
            // Refresh messages locally
            await fetchMessages();
            if (onQuoteResponded) onQuoteResponded();
        } catch (error: any) {
            console.error(`Failed to ${action} quote:`, error);
            toast.error(`Operation failed`);
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
            {/* Hidden File Input for Attachments */}
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf,image/*"
            />

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-white">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-semibold text-slate-500 shrink-0">
                        {otherPartyName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base leading-none">{otherPartyName}</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-[11px] font-medium text-primary truncate leading-none">{eventTitle || "Wedding Reception"}</p>
                            <span className="text-[10px] text-muted-foreground opacity-30">•</span>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[11px] font-medium text-emerald-500">Online</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreHorizontal className="h-5 w-5 rotate-90" />
                    </Button>
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
                                    <div className="flex justify-center my-8">
                                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-md uppercase tracking-widest border border-slate-100">
                                            {hasMounted ? (new Date(msg.created_at).toDateString() === new Date().toDateString() ? 'Today' : format(new Date(msg.created_at), 'MMM d, yyyy')) : '...'}
                                        </span>
                                    </div>
                                )}
                                <div className={`flex flex-col ${isSystem ? 'items-center my-6' : isMe ? 'items-end' : 'items-start'}`}>
                                    {isSystem ? (
                                        <div className="max-w-[85%] bg-slate-50 border border-slate-100 text-center px-4 py-2 rounded-lg text-[11px] font-medium text-slate-400 italic">
                                            {msg.body}
                                        </div>
                                    ) : (
                                        <div className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'} mb-6`}>
                                            {msg.message_type.startsWith('quote_') ? (
                                                <div className="flex flex-col items-center w-full my-2">
                                                    <div className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 border border-slate-200 uppercase tracking-tighter">
                                                        {msg.message_type === 'quote_card' ? 'Quote Request Received' :
                                                            msg.message_type === 'quote_accepted' ? 'Contract Finalized' :
                                                                msg.message_type === 'quote_rejected' ? 'Quote Declined' : 'Quote Update'}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={`flex items-start gap-3 w-full ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                                    {!isMe && (
                                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0 mt-1">
                                                            {otherPartyName.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}

                                                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                                                        <div
                                                            className={`px-4 py-2.5 shadow-sm transition-all duration-200 text-[13px] leading-relaxed ${isMe
                                                                ? 'bg-zinc-900 text-white rounded-2xl rounded-tr-sm'
                                                                : 'bg-white border border-zinc-200 text-zinc-900 rounded-2xl rounded-tl-sm'
                                                                }`}
                                                        >
                                                            {msg.attachment_url && (
                                                                <div className="mb-2">
                                                                    {msg.attachment_type?.startsWith('image/') || (msg.attachment_url.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)) ? (
                                                                        <a href={msg.attachment_url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-slate-100">
                                                                            <img src={msg.attachment_url} alt="Attachment" className="max-w-full h-auto max-h-[300px] object-cover" />
                                                                        </a>
                                                                    ) : (
                                                                        <a href={msg.attachment_url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 p-3 rounded-xl border ${isMe ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200'}`}>
                                                                            <FileIcon className="h-4 w-4" />
                                                                            <div className="flex flex-col overflow-hidden">
                                                                                <span className="text-[11px] font-bold truncate">{msg.attachment_url.split('/').pop()}</span>
                                                                            </div>
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            )}
                                                            {msg.body}
                                                        </div>
                                                        <div className="mt-1.5 px-1 text-[10px] font-medium text-slate-400">
                                                            {hasMounted ? format(new Date(msg.created_at), 'h:mm a') : '--:--'}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
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
                        quoteStatus === 'pending' || quoteStatus === 'revision_requested' ? (
                            <form onSubmit={handleQuoteResponse} className="bg-muted/10 p-3 sm:p-4 rounded-lg border border-border/50 flex flex-col gap-3">
                                <div className="text-sm font-medium flex items-center justify-between">
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
                    <div className="relative">
                        <form onSubmit={handleSend} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full p-1 pl-4 pr-1 transition-all focus-within:border-primary/30">
                            <button
                                type="button"
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isSending || isUploading}
                            >
                                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
                            </button>
                            <input
                                placeholder="Type your message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-sm py-2 px-2 placeholder:text-slate-400"
                                disabled={isSending}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="h-9 w-9 rounded-full bg-slate-900 hover:bg-black text-white shrink-0 shadow-lg"
                                disabled={(!inputValue.trim() && !attachmentUrl) || isSending || isUploading}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                        {attachmentUrl && (
                            <div className="absolute bottom-full mb-2 left-4 flex items-center gap-2 text-[10px] font-bold text-primary bg-primary/5 p-2 rounded-xl border border-primary/20 animate-in fade-in slide-in-from-bottom-1 max-w-fit">
                                <FileIcon className="h-3 w-3" />
                                <span className="truncate max-w-[200px]">Attachment ready</span>
                                <button type="button" onClick={() => setAttachmentUrl(null)} className="hover:text-destructive transition-colors ml-1">
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Revision Request Modal */}
            <Dialog open={isRevisionModalOpen} onOpenChange={setIsRevisionModalOpen}>
                <DialogContent className="sm:max-w-[480px] rounded-2xl p-0 overflow-hidden border-none shadow-xl">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-lg font-semibold flex items-center gap-2 text-foreground/90">
                            <FileText className="h-5 w-5 text-primary opacity-80" />
                            Request Revision
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground/80 text-xs font-medium mt-1.5">
                            Specify what you'd like to adjust in this quote.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/50 ml-1">
                                Revision Message
                            </label>
                            <Textarea
                                placeholder="E.g. Let's adjust the scope to fit the budget..."
                                value={revisionText}
                                onChange={(e) => setRevisionText(e.target.value)}
                                className="min-h-[120px] rounded-xl border-muted-foreground/10 focus-visible:ring-primary/20 bg-muted/10 resize-none p-4 text-sm"
                            />
                        </div>
                    </div>

                    <DialogFooter className="p-6 pt-0 flex gap-3 pb-6">
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={() => setIsRevisionModalOpen(false)}
                            className="flex-1 rounded-xl h-10 font-medium text-muted-foreground hover:text-foreground"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleRevisionSubmit}
                            disabled={!revisionText.trim() || isSubmittingQuote}
                            className="flex-1 rounded-xl h-10 font-semibold shadow-md shadow-primary/5"
                        >
                            {isSubmittingQuote ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Request"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
