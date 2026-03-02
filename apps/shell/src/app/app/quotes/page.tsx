"use client";

import { useEffect, useState } from "react";
import { quoteService, Quote } from "@bventy/services";
import { Navbar } from "@bventy/ui";
import { Footer } from "@bventy/ui";
import { Button } from "@bventy/ui";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@bventy/ui";
import { Badge } from "@bventy/ui";
import { Loader2, ReceiptText, Check, X, ArrowLeft, Eye } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@bventy/services";
import { QuoteContact } from "@bventy/services";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@bventy/ui";
import { FileText, Phone, Mail, MessageCircle, ExternalLink } from "lucide-react";

export default function MyQuotesPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"active" | "archived">("active");

    const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const [contactLoading, setContactLoading] = useState(false);

    // Contact Modal
    const [contactInfo, setContactInfo] = useState<QuoteContact | null>(null);
    const [isContactOpen, setIsContactOpen] = useState(false);

    // Revision Dialog
    const [isRevisionOpen, setIsRevisionOpen] = useState(false);
    const [revisionComment, setRevisionComment] = useState("");

    const openDetails = (quote: any) => {
        setSelectedQuote(quote);
        setIsDetailsOpen(true);
    };

    useEffect(() => {
        if (!authLoading && !user) {
            const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || "";
            window.location.href = `${AUTH_URL}/login`;
            return;
        }

        if (user) {
            fetchQuotes();
        }
    }, [user, authLoading, router]);

    const fetchQuotes = async () => {
        try {
            const data = await quoteService.getMyQuotes();
            setQuotes(data);
        } catch (error) {
            console.error("Failed to fetch quotes", error);
            toast.error("Failed to load quotes.");
        } finally {
            setLoading(false);
        }
    };

    const handleContactVendor = async (quote: any) => {
        setSelectedQuote(quote);
        setContactLoading(true);
        setIsContactOpen(true);
        try {
            const info = await quoteService.getQuoteContact(quote.id);
            setContactInfo(info);
        } catch (error: any) {
            console.error("Failed to fetch contact info", error);
            const msg = error.response?.data?.error || "Failed to fetch contact information.";
            toast.error(msg);
            setIsContactOpen(false);
        } finally {
            setContactLoading(false);
        }
    };

    const handleRequestRevision = async () => {
        if (!selectedQuote) return;
        const id = selectedQuote.id;
        setActionLoading(id + "-revision");
        try {
            await quoteService.requestRevision(id, revisionComment);
            toast.success("Revision requested successfully!");
            setIsRevisionOpen(false);
            setIsDetailsOpen(false);
            setRevisionComment("");
            await fetchQuotes();
        } catch (error) {
            console.error(error);
            toast.error("Failed to request revision.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleAccept = async (id: string) => {
        setActionLoading(id + "-accept");
        try {
            await quoteService.acceptQuote(id);
            toast.success("Quote accepted successfully!");
            setIsDetailsOpen(false);
            await fetchQuotes();
        } catch (error) {
            console.error(error);
            toast.error("Failed to accept quote.");
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id: string) => {
        setActionLoading(id + "-reject");
        try {
            await quoteService.rejectQuote(id);
            toast.success("Quote rejected.");
            setIsDetailsOpen(false);
            await fetchQuotes();
        } catch (error) {
            console.error(error);
            toast.error("Failed to reject quote.");
        } finally {
            setActionLoading(null);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-6 flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">My Quotes</h1>
                        <p className="text-muted-foreground">Manage quotes you have requested from vendors.</p>
                    </div>
                </div>

                <div className="flex gap-4 mb-6 border-b pb-1">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`pb-2 px-4 transition-colors relative ${activeTab === 'active' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                    >
                        Active Quotes
                        {activeTab === 'active' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab("archived")}
                        className={`pb-2 px-4 transition-colors relative ${activeTab === 'archived' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                    >
                        Archived
                        {activeTab === 'archived' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />}
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm overflow-hidden">
                    {quotes.filter(q => activeTab === 'active' ? q.status !== 'archived' : q.status === 'archived').length === 0 ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center text-center p-8 animate-in fade-in-50">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <ReceiptText className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">No Quotes Found</h3>
                            <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
                                {activeTab === 'active'
                                    ? "You don't have any active quote requests at the moment."
                                    : "You don't have any archived or expired quotes."}
                            </p>
                            {activeTab === 'active' && (
                                <Button asChild>
                                    <Link href="/vendors">Find Vendors</Link>
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Requested Budget</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Quoted Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {quotes
                                        .filter(q => activeTab === 'active' ? q.status !== 'archived' : q.status === 'archived')
                                        .map((quote) => {
                                            const vendorName = quote.vendor_name || quote.vendor_id;
                                            const eventTitle = quote.event_title || quote.event_id;

                                            return (
                                                <TableRow key={quote.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openDetails(quote)}>
                                                    <TableCell className="font-medium">{vendorName}</TableCell>
                                                    <TableCell>{eventTitle}</TableCell>
                                                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                                                        {quote.budget_range || "-"}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground whitespace-nowrap">
                                                        {quote.created_at ? new Date(quote.created_at).toLocaleDateString() : '-'}
                                                    </TableCell>
                                                    <TableCell className="font-semibold">
                                                        {quote.quoted_price ? `₹${quote.quoted_price}` : 'Pending response'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                quote.status === 'accepted' ? 'default' :
                                                                    quote.status === 'rejected' ? 'destructive' :
                                                                        quote.status === 'responded' ? 'secondary' :
                                                                            quote.status === 'archived' ? 'outline' :
                                                                                quote.status === 'revision_requested' ? 'outline' : 'outline'
                                                            }
                                                            className="capitalize"
                                                        >
                                                            {quote.status === 'archived' ? 'Contact Expired' : quote.status.replace('_', ' ')}
                                                        </Badge>
                                                        {quote.status === 'accepted' && quote.contact_expires_at && (
                                                            <p className="text-[10px] text-orange-600 mt-1 font-medium">
                                                                Access expires: {new Date(quote.contact_expires_at).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            {quote.status === 'accepted' && (
                                                                <Button size="sm" variant="outline" className="h-8 shadow-none text-green-600 hover:text-green-700 hover:bg-green-50" onClick={(e) => { e.stopPropagation(); handleContactVendor(quote); }}>
                                                                    <Phone className="h-4 w-4 mr-2" />
                                                                    Contact
                                                                </Button>
                                                            )}
                                                            <Button size="sm" variant="ghost" className="h-8 shadow-none" onClick={(e) => { e.stopPropagation(); openDetails(quote); }}>
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>

                {/* Quote Details Dialog */}
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogContent className="sm:max-w-[600px] h-[90vh] flex flex-col p-0 overflow-hidden shadow-2xl border-none">
                        <div className="p-6 pb-4 border-b bg-white dark:bg-slate-950 z-10">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold">Quote Details</DialogTitle>
                                <DialogDescription>
                                    Review the quote response from the vendor.
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 min-h-0">
                            {selectedQuote && (
                                <>
                                    <div className="grid grid-cols-2 gap-8 pb-6 border-b border-dashed border-slate-200 dark:border-slate-800">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Vendor</p>
                                            <p className="font-semibold text-foreground text-base">{selectedQuote.vendor_name || 'Something'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Event</p>
                                            <p className="font-semibold text-foreground text-base">{selectedQuote.event_title || 'Wednesday'}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Your Message</p>
                                        <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/60 italic text-sm text-foreground/80 leading-relaxed shadow-sm">
                                            "{selectedQuote.message || 'No message provided.'}"
                                        </div>
                                    </div>

                                    <div className="pt-2 space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-xl flex items-center gap-3">
                                                Vendor Response
                                                <Badge
                                                    variant={selectedQuote.status === 'accepted' ? 'default' : 'secondary'}
                                                    className="rounded-full px-4 py-0.5 h-6 text-[10px] uppercase font-black"
                                                >
                                                    {selectedQuote.status === 'archived' ? 'Contact Expired' : selectedQuote.status.replace('_', ' ')}
                                                </Badge>
                                            </h3>
                                        </div>

                                        {selectedQuote.status === 'accepted' && selectedQuote.contact_expires_at && (
                                            <div className="bg-orange-50/60 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 p-5 rounded-2xl flex items-start gap-4 shadow-sm shadow-orange-100/10 transition-all">
                                                <div className="h-2.5 w-2.5 rounded-full bg-orange-500 mt-1.5 shrink-0 animate-pulse ring-4 ring-orange-500/10" />
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold text-orange-900 dark:text-orange-200 uppercase tracking-tighter">Access Unlocked</p>
                                                    <p className="text-xs text-orange-800/80 dark:text-orange-300/80 leading-relaxed font-medium">
                                                        Direct contact window ends on {new Date(selectedQuote.contact_expires_at).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {selectedQuote.status !== 'pending' && (
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="bg-slate-50/80 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/60 group hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 group-hover:text-foreground transition-colors">Requested Budget</p>
                                                    <p className="font-extrabold text-xl font-mono tracking-tight">₹{selectedQuote.budget_range || '-'}</p>
                                                </div>
                                                <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20 group hover:bg-primary/[0.08] transition-all">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1 group-hover:text-primary transition-colors">Quoted Price</p>
                                                    <p className="font-extrabold text-xl text-primary font-mono tracking-tight">
                                                        {selectedQuote.quoted_price ? `₹${selectedQuote.quoted_price}` : 'Pending'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Message from Vendor</p>
                                            <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/60 text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
                                                {selectedQuote.vendor_response || (selectedQuote.status === 'pending' ? 'The vendor has not responded yet.' : 'No response details provided.')}
                                            </div>
                                        </div>

                                        {selectedQuote.attachment_url && (
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Related Documents</p>
                                                <a
                                                    href={selectedQuote.attachment_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center p-5 border rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all group border-dashed border-slate-300 dark:border-slate-700 hover:border-primary/50"
                                                >
                                                    <div className="bg-primary/10 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                                                        <FileText className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold group-hover:text-primary transition-colors truncate">Quote Rate Card & PDF</p>
                                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Digital Attachment</p>
                                                    </div>
                                                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
                                                </a>
                                            </div>
                                        )}

                                        {(selectedQuote.special_requirements || selectedQuote.deadline) && (
                                            <div className="pt-10 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-6">
                                                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground/50">Full Request Meta</p>
                                                <div className="grid gap-6">
                                                    {selectedQuote.special_requirements && (
                                                        <div className="space-y-2">
                                                            <p className="font-bold text-[11px] text-muted-foreground uppercase">Special Requirements</p>
                                                            <p className="text-sm text-foreground/80 leading-relaxed font-medium">{selectedQuote.special_requirements}</p>
                                                        </div>
                                                    )}
                                                    {selectedQuote.deadline && (
                                                        <div className="space-y-2">
                                                            <p className="font-bold text-[11px] text-muted-foreground uppercase">Organized By Date</p>
                                                            <p className="text-sm font-bold underline decoration-primary/30 underline-offset-4 decoration-2">
                                                                {new Date(selectedQuote.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {selectedQuote && (
                            <div className="p-6 pt-5 border-t bg-slate-50/40 dark:bg-slate-950/40 z-20 backdrop-blur-sm mt-auto">
                                <DialogFooter className="flex flex-col sm:flex-row gap-4 w-full">
                                    {selectedQuote.status === 'accepted' ? (
                                        <Button
                                            className="w-full h-14 rounded-2xl text-base font-black bg-green-600 hover:bg-green-700 shadow-xl shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] border-none"
                                            onClick={() => handleContactVendor(selectedQuote)}
                                        >
                                            <Phone className="mr-3 h-6 w-6 fill-current" />
                                            CONTACT VENDOR NOW
                                        </Button>
                                    ) : selectedQuote.status === 'responded' ? (
                                        <>
                                            <div className="flex gap-4 w-full">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="flex-1 h-14 rounded-2xl font-bold transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-md border-slate-200 dark:border-slate-800"
                                                    onClick={() => setIsRevisionOpen(true)}
                                                >
                                                    <Eye className="h-5 w-5 mr-2" />
                                                    REVISION
                                                </Button>
                                                <div className="flex-[2] flex gap-4">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="flex-1 h-14 rounded-2xl font-bold border-red-100 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                                                        onClick={() => handleReject(selectedQuote.id)}
                                                    >
                                                        REJECT
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        className="flex-[1.5] h-14 rounded-2xl font-black bg-primary transition-all hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]"
                                                        onClick={() => handleAccept(selectedQuote.id)}
                                                    >
                                                        <Check className="h-5 w-5 mr-3 stroke-[3]" />
                                                        ACCEPT
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-900"
                                            onClick={() => setIsDetailsOpen(false)}
                                        >
                                            Dismiss Overview
                                        </Button>
                                    )}
                                </DialogFooter>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Contact Dialog */}
                <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                    <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader>
                            <DialogTitle>Vendor Contact Information</DialogTitle>
                            <DialogDescription>
                                Secure communication unlocked for {selectedQuote?.vendor_name}
                            </DialogDescription>
                            {selectedQuote?.contact_expires_at && (
                                <div className="mt-2 text-[10px] font-semibold text-orange-600 uppercase tracking-tight">
                                    Expires on {new Date(selectedQuote.contact_expires_at).toLocaleString()}
                                </div>
                            )}
                        </DialogHeader>

                        {contactLoading ? (
                            <div className="py-12 flex justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : contactInfo ? (
                            <div className="space-y-6 py-4">
                                <div className="space-y-4">
                                    <div className="flex items-center p-3 border rounded-lg bg-green-50/50 border-green-100">
                                        <MessageCircle className="h-5 w-5 text-green-600 mr-3" />
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">WhatsApp</p>
                                            <a href={contactInfo.vendor.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline text-green-700">
                                                Click to chat on WhatsApp
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-3 border rounded-lg">
                                        <Phone className="h-5 w-5 text-primary mr-3" />
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Phone Number</p>
                                            <a href={`tel:${contactInfo.vendor.phone}`} className="text-sm font-medium hover:underline">
                                                {contactInfo.vendor.phone || "Not provided"}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-3 border rounded-lg">
                                        <Mail className="h-5 w-5 text-primary mr-3" />
                                        <div className="flex-1">
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Email Address</p>
                                            <a href={`mailto:${contactInfo.vendor.email}`} className="text-sm font-medium hover:underline">
                                                {contactInfo.vendor.email || "Not provided"}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                                    <p className="text-xs text-blue-700 leading-relaxed">
                                        <strong>Pro-tip:</strong> Mention your Event Name ({selectedQuote?.event_title}) when contacting the vendor to help them identify your request.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="py-8 text-center text-sm text-muted-foreground">
                                Failed to load contact information.
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsContactOpen(false)} className="w-full">
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Revision Dialog */}
                <Dialog open={isRevisionOpen} onOpenChange={setIsRevisionOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Request Revision</DialogTitle>
                            <DialogDescription>
                                Tell the vendor what you'd like them to adjust (e.g., lower price, change dates, or add services).
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <textarea
                                className="w-full min-h-[120px] p-3 rounded-md border bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="Example: Could you provide a breakdown for the equipment costs? Also, is there any flexibility on the setup time?"
                                value={revisionComment}
                                onChange={(e) => setRevisionComment(e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsRevisionOpen(false)} disabled={!!actionLoading}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleRequestRevision}
                                disabled={!!actionLoading || !revisionComment.trim()}
                            >
                                {actionLoading?.includes("revision") && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Request
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </main>
            <Footer />
        </div>
    );
}
