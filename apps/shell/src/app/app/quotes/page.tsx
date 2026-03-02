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
import { FileText, Phone, Mail, MessageCircle } from "lucide-react";

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
                                                                <Button size="sm" variant="outline" className="h-8 shadow-none text-green-600 hover:text-green-700 hover:bg-green-50" onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleContactVendor(quote); }}>
                                                                    <Phone className="h-4 w-4 mr-2" />
                                                                    Contact
                                                                </Button>
                                                            )}
                                                            <Button size="sm" variant="ghost" className="h-8 shadow-none" onClick={(e: React.MouseEvent) => { e.stopPropagation(); openDetails(quote); }}>
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
                    <DialogContent className="sm:max-w-[550px] max-h-[90vh] flex flex-col p-0 overflow-hidden shadow-2xl border-none">
                        <DialogHeader className="p-6 pb-4 border-b bg-white dark:bg-slate-900 sticky top-0 z-10">
                            <DialogTitle className="text-xl font-bold">Quote Details</DialogTitle>
                            <DialogDescription className="text-sm">
                                Review the quote response from the vendor.
                            </DialogDescription>
                        </DialogHeader>

                        {selectedQuote && (
                            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide hover:scrollbar-default transition-all">
                                <div className="grid grid-cols-2 gap-6 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Vendor</p>
                                        <p className="font-semibold text-base">{selectedQuote.vendor_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Event</p>
                                        <p className="font-semibold text-base">{selectedQuote.event_title}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Your Message</p>
                                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl text-sm leading-relaxed border border-slate-200 dark:border-slate-800 italic text-muted-foreground">
                                        "{selectedQuote.message || "No message provided."}"
                                    </div>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border">
                                        <h4 className="font-bold text-sm uppercase tracking-tight">Vendor Response</h4>
                                        <Badge
                                            variant={
                                                selectedQuote.status === 'accepted' ? 'default' :
                                                    selectedQuote.status === 'rejected' ? 'destructive' :
                                                        selectedQuote.status === 'responded' ? 'secondary' :
                                                            selectedQuote.status === 'archived' ? 'outline' :
                                                                selectedQuote.status === 'revision_requested' ? 'outline' : 'outline'
                                            }
                                            className="px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                                        >
                                            {selectedQuote.status === 'archived' ? 'Contact Expired' : selectedQuote.status.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    {selectedQuote.status === 'accepted' && selectedQuote.contact_expires_at && (
                                        <div className="bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 p-3 rounded-xl flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                            <p className="text-[11px] text-green-700 dark:text-green-400 font-semibold">
                                                Active access until {new Date(selectedQuote.contact_expires_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}

                                    {selectedQuote.status === 'pending' ? (
                                        <div className="text-center py-8 border-2 border-dashed rounded-xl">
                                            <p className="text-sm text-muted-foreground italic">
                                                Waiting for the vendor to respond...
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Requested Budget</p>
                                                    <p className="font-bold text-lg">{selectedQuote.budget_range || '-'}</p>
                                                </div>
                                                <div className="p-4 rounded-xl bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/50">
                                                    <p className="text-[10px] uppercase tracking-wider font-bold text-green-700 dark:text-green-400 mb-1">Final Quoted Price</p>
                                                    <p className="font-bold text-lg text-green-800 dark:text-green-300">{selectedQuote.quoted_price ? `₹${selectedQuote.quoted_price}` : 'Pending'}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Proposal Details</p>
                                                <div className="bg-white dark:bg-slate-900 border shadow-inner p-4 rounded-xl text-sm whitespace-pre-wrap leading-relaxed min-h-[100px]">
                                                    {selectedQuote.vendor_response || "The vendor provided pricing without a detailed message."}
                                                </div>
                                            </div>

                                            {selectedQuote.attachment_url && (
                                                <div className="space-y-2">
                                                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Files & Attachments</p>
                                                    <a
                                                        href={selectedQuote.attachment_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                                                    >
                                                        <div className="flex items-center">
                                                            <div className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                                                                <FileText className="h-5 w-5 text-primary" />
                                                            </div>
                                                            <span className="text-sm font-semibold">View Quote PDF</span>
                                                        </div>
                                                        <Eye className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {(selectedQuote.special_requirements || selectedQuote.deadline) && (
                                    <div className="pt-6 border-t space-y-4">
                                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground">Additional Details</h4>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {selectedQuote.special_requirements && (
                                                <div className="p-3 bg-muted/40 rounded-lg">
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Requirements</p>
                                                    <p className="text-xs leading-relaxed">{selectedQuote.special_requirements}</p>
                                                </div>
                                            )}
                                            {selectedQuote.deadline && (
                                                <div className="p-3 bg-muted/40 rounded-lg">
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Expected By</p>
                                                    <p className="text-xs font-semibold">{new Date(selectedQuote.deadline).toLocaleDateString()}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedQuote?.status === 'responded' && (
                            <DialogFooter className="p-6 pt-4 border-t bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm sticky bottom-0 z-10 flex flex-col sm:flex-row gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={!!actionLoading}
                                    onClick={() => setIsRevisionOpen(true)}
                                    className="flex-1 h-11 rounded-xl shadow-none"
                                >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Request Revision
                                </Button>
                                <div className="flex gap-3 flex-1">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={!!actionLoading}
                                        onClick={() => handleReject(selectedQuote.id)}
                                        className="flex-1 h-11 rounded-xl shadow-none text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        {actionLoading === selectedQuote.id + "-reject" ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                                    </Button>
                                    <Button
                                        type="button"
                                        disabled={!!actionLoading}
                                        onClick={() => handleAccept(selectedQuote.id)}
                                        className="flex-[2] h-11 rounded-xl shadow-lg shadow-primary/10"
                                    >
                                        {actionLoading === selectedQuote.id + "-accept" ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                                        Accept Quote
                                    </Button>
                                </div>
                            </DialogFooter>
                        )}
                        {selectedQuote?.status === 'accepted' && (
                            <DialogFooter className="p-6 pt-4 border-t bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm sticky bottom-0 z-10">
                                <Button className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 shadow-xl shadow-green-500/20 text-base font-bold" onClick={() => handleContactVendor(selectedQuote)}>
                                    <Phone className="h-5 w-5 mr-3" />
                                    Contact Vendor
                                </Button>
                            </DialogFooter>
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
