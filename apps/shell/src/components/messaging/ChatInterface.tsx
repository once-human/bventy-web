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
    quoteId: string;
    quoteStatus?: string;
    onQuoteResponded?: () => void;
}

const REACTION_OPTIONS = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

export function ChatInterface({ conversationId, currentUserId, chatLocked, otherPartyName, otherPartyRole, quoteId, quoteStatus, onQuoteResponded }: ChatInterfaceProps) {
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
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {otherPartyName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-medium">{otherPartyName}</h3>
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
                                            {hasMounted ? format(new Date(msg.created_at), 'MMM d, yyyy') : 'Loading date...'}
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
                                                <div className={`p-5 border border-border/40 w-full max-w-[390px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] ${isMe ? 'bg-primary/5 rounded-2xl rounded-tr-sm' : 'bg-muted/20 rounded-2xl rounded-tl-sm'}`}>
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between pb-3 border-b border-border/50 gap-3">
                                                            <div className="flex items-center gap-2.5 min-w-0">
                                                                <FileText className="h-4 w-4 text-primary opacity-60 shrink-0" />
                                                                <span className="font-semibold text-sm tracking-tight text-foreground/90 truncate">Request Context</span>
                                                            </div>
                                                            <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.15em] shrink-0 whitespace-nowrap">Details</span>
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-y-4 pt-1">
                                                            <div className="flex flex-col gap-1">
                                                                <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">Budget Range</span>
                                                                <span className="text-sm font-medium text-foreground/90">
                                                                    {msg.system_payload.budget_range || 'Not specified'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest">Deadline</span>
                                                                <span className="text-sm font-medium text-foreground/90">
                                                                    {hasMounted && msg.system_payload.deadline ? format(new Date(msg.system_payload.deadline), 'PPP') : '...'}
                                                                </span>
                                                            </div>

                                                            {msg.system_payload.special_requirements && (
                                                                <div className="flex flex-col gap-2 pt-2 border-t border-border/30 mt-1">
                                                                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.15em]">Special Requirements</span>
                                                                    <p className="text-xs text-muted-foreground/80 leading-relaxed italic bg-muted/30 p-2.5 rounded-lg border-l-2 border-primary/20">
                                                                        "{msg.system_payload.special_requirements}"
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : msg.message_type === 'quote_response' && msg.system_payload ? (
                                                <div className={`p-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50 w-full max-w-[370px] relative overflow-hidden bg-card ${isMe ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm'}`}>
                                                    <div className="bg-primary/[0.03] px-5 py-4 border-b border-border/40 flex items-center justify-between gap-4">
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <div className="p-2 bg-primary/10 rounded-xl shrink-0">
                                                                <FileIcon className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <span className="font-bold text-sm tracking-tight text-foreground/90 truncate">Official Quote</span>
                                                        </div>
                                                        <Badge variant="outline" className="bg-background text-[9px] h-5 px-2 font-bold tracking-tighter uppercase border-border/60 shrink-0 whitespace-nowrap">
                                                            #{quoteId.slice(0, 5)}
                                                        </Badge>
                                                    </div>

                                                    <div className="p-5 space-y-5">
                                                        <div className="flex flex-col items-center justify-center py-2 text-center">
                                                            <span className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-1">Total Amount</span>
                                                            <div className="text-3xl font-semibold tracking-tight text-foreground">
                                                                ₹{msg.system_payload.quoted_price}
                                                            </div>
                                                        </div>

                                                        {msg.system_payload.vendor_response && (
                                                            <div className="bg-muted/30 p-4 rounded-xl border border-border/30">
                                                                <p className="text-xs text-muted-foreground/90 leading-relaxed">
                                                                    {msg.system_payload.vendor_response}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {msg.system_payload.attachment_url && (
                                                            <Button variant="outline" size="sm" className="w-full gap-2 rounded-xl h-10 border-border/60 hover:bg-muted/50 transition-all font-medium text-xs" asChild>
                                                                <a href={msg.system_payload.attachment_url} target="_blank" rel="noopener noreferrer">
                                                                    <Paperclip className="h-3.5 w-3.5" />
                                                                    View Proposal Document
                                                                </a>
                                                            </Button>
                                                        )}

                                                        {!isMe && otherPartyRole === 'vendor' && quoteStatus === 'responded' && (
                                                            <div className="flex flex-col gap-2 pt-2">
                                                                <Button
                                                                    variant="default"
                                                                    size="sm"
                                                                    className="w-full h-10 font-semibold shadow-md shadow-primary/5 rounded-xl"
                                                                    onClick={() => handleQuoteResponseAction('accept')}
                                                                    disabled={isSubmittingQuote}
                                                                >
                                                                    {isSubmittingQuote ? "Processing..." : "Accept & Unlock"}
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="w-full h-10 font-medium text-muted-foreground hover:text-foreground rounded-xl"
                                                                    onClick={() => setIsRevisionModalOpen(true)}
                                                                    disabled={isSubmittingQuote}
                                                                >
                                                                    Request Revision
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : msg.message_type.startsWith('quote_') ? (
                                                <div className="flex flex-col items-center my-4 w-full">
                                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-semibold border flex items-center gap-2 transition-all ${msg.message_type === 'quote_accepted' ? 'bg-green-500/5 border-green-500/10 text-green-600' :
                                                        msg.message_type === 'quote_rejected' ? 'bg-red-500/5 border-red-500/20 text-red-600' :
                                                            'bg-amber-500/5 border-amber-500/20 text-amber-600'
                                                        }`}>
                                                        <div className={`h-1 w-1 rounded-full ${msg.message_type === 'quote_accepted' ? 'bg-green-500' :
                                                            msg.message_type === 'quote_rejected' ? 'bg-red-500' :
                                                                'bg-amber-500'
                                                            }`} />
                                                        <span className="tracking-widest uppercase">
                                                            {msg.message_type === 'quote_response' ? 'Quote Received' :
                                                                msg.message_type === 'quote_accepted' ? 'Contract Finalized' :
                                                                    msg.message_type === 'quote_rejected' ? 'Quote Declined' :
                                                                        `Quote ${msg.message_type.split('_')[1].toUpperCase()}`}
                                                            {msg.system_payload?.message && (
                                                                <span className="ml-1 opacity-60 font-medium whitespace-nowrap">— {msg.system_payload.message}</span>
                                                            )}
                                                            {!msg.system_payload && msg.body && (
                                                                <span className="ml-1 opacity-60 font-medium whitespace-nowrap">— {msg.body}</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className={`flex items-center gap-2 group/msg relative ${isMe ? 'flex-row' : 'flex-row-reverse'}`}
                                                    onMouseEnter={() => setHoveredMessageId(msg.id)}
                                                    onMouseLeave={() => {
                                                        setHoveredMessageId(null);
                                                        setActiveReactionPickerId(null);
                                                    }}
                                                >
                                                    {/* Smile Trigger Icon */}
                                                    <div
                                                        className={`transition-all duration-300 ${hoveredMessageId === msg.id && activeReactionPickerId !== msg.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
                                                        onMouseEnter={() => setActiveReactionPickerId(msg.id)}
                                                    >
                                                        <button
                                                            className={`p-1.5 rounded-full hover:bg-muted/80 text-muted-foreground/40 hover:text-primary transition-colors bg-background/50 border border-border/20 shadow-sm`}
                                                        >
                                                            <Smile className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    <div className="relative">
                                                        <div
                                                            className={`px-5 py-3 text-sm shadow-sm transition-all duration-200 ${isMe
                                                                ? 'bg-primary text-primary-foreground rounded-tl-2xl rounded-tr-md rounded-bl-2xl rounded-br-sm'
                                                                : 'bg-muted border border-border text-foreground rounded-tr-2xl rounded-tl-md rounded-br-2xl rounded-bl-sm'
                                                                } ${hoveredMessageId === msg.id ? 'scale-[1.01] shadow-md border-primary/20' : ''}`}
                                                        >
                                                            {msg.body}
                                                        </div>

                                                        {/* Reaction Picker anchored to the Smile icon's vicinity */}
                                                        <AnimatePresence>
                                                            {activeReactionPickerId === msg.id && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, scale: 0.5, x: isMe ? -20 : 20, y: 10 }}
                                                                    animate={{ opacity: 1, scale: 1, x: isMe ? -20 : 20, y: -45 }}
                                                                    exit={{ opacity: 0, scale: 0.5, y: 10 }}
                                                                    className={`absolute ${isMe ? 'right-full' : 'left-full'} z-50 bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-full p-1.5 flex items-center gap-1`}
                                                                >
                                                                    {REACTION_OPTIONS.map((emoji, idx) => {
                                                                        const hasReacted = msg.reactions?.some(r => r.reaction === emoji && r.user_id === currentUserId);
                                                                        return (
                                                                            <motion.button
                                                                                key={emoji}
                                                                                initial={{ scale: 0, opacity: 0 }}
                                                                                animate={{
                                                                                    scale: 1,
                                                                                    opacity: 1,
                                                                                    transition: { delay: idx * 0.03 }
                                                                                }}
                                                                                whileHover={{ scale: 1.3, zIndex: 10 }}
                                                                                whileTap={{ scale: 0.9 }}
                                                                                onClick={() => handleToggleReaction(msg.id, emoji)}
                                                                                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${hasReacted ? 'bg-primary/20' : 'hover:bg-primary/10'}`}
                                                                            >
                                                                                <span className="text-lg">{emoji}</span>
                                                                            </motion.button>
                                                                        );
                                                                    })}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>

                                                        {/* Displayed Reactions (Stuck to bottom of bubble) */}
                                                        {msg.reactions && msg.reactions.length > 0 && (
                                                            <div className={`flex flex-wrap gap-1 mt-1.5 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                                {Array.from(new Set(msg.reactions.map(r => r.reaction))).map(emoji => (
                                                                    <button
                                                                        key={emoji}
                                                                        onClick={() => handleToggleReaction(msg.id, emoji)}
                                                                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] border transition-all active:scale-95 ${msg.reactions?.some(r => r.reaction === emoji && r.user_id === currentUserId)
                                                                            ? 'bg-primary/10 border-primary/30 text-primary font-bold'
                                                                            : 'bg-muted/50 border-border text-muted-foreground'
                                                                            }`}
                                                                    >
                                                                        <span>{emoji}</span>
                                                                        <span className="opacity-80">{msg.reactions?.filter(r => r.reaction === emoji).length}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className={`flex items-center gap-1 mt-1 px-1 text-[10px] text-muted-foreground bg-background/80 backdrop-blur-sm rounded-full py-0.5`}>
                                                <span>{hasMounted ? format(new Date(msg.created_at), 'HH:mm') : '--:--'}</span>
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
                    <>
                        <form onSubmit={handleSend} className="flex gap-2">
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="shrink-0 h-11 w-11 rounded-full text-muted-foreground hover:text-foreground hidden sm:flex"
                                title="Attach file"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isSending || isUploading}
                            >
                                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
                            </Button>
                            <Input
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex-1 h-11 rounded-full px-5 border-border focus-visible:border-border/80 focus-visible:ring-0 bg-background/50 text-sm placeholder:text-muted-foreground/40 transition-all shadow-none"
                                disabled={isSending}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="shrink-0 h-11 w-11 rounded-full transition-transform active:scale-95"
                                disabled={(!inputValue.trim() && !attachmentUrl) || isSending || isUploading}
                            >
                                <Send className="h-4 w-4 translate-x-[-1px] translate-y-[1px]" />
                            </Button>
                        </form>
                        {attachmentUrl && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-primary bg-primary/5 p-2 rounded border border-primary/20 animate-in fade-in slide-in-from-top-1 max-w-fit">
                                <FileIcon className="h-3 w-3" />
                                <span className="truncate max-w-[200px]">File attached</span>
                                <button
                                    type="button"
                                    onClick={() => setAttachmentUrl(null)}
                                    className="hover:text-destructive transition-colors ml-1"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        )}
                    </>
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
