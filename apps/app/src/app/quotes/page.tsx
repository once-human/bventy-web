"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, quoteService, Quote } from "@bventy/services";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
    Loader2,
    Navbar,
    Footer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Badge
} from "@bventy/ui";
import { Check, X, ReceiptText, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function QuotesPage() {
    const router = useRouter();
    const { user: profile, loading: authLoading } = useAuth();
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchQuotes = async () => {
        try {
            const data = await quoteService.getMyQuotes();
            setQuotes(data);
        } catch (error) {
            console.error("Failed to fetch quotes", error);
            toast.error("Failed to load your quotes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authLoading) return;

        if (!profile) {
            const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.bventy.in";
            const returnTo = encodeURIComponent(window.location.host + "/quotes");
            window.location.href = `${AUTH_URL}/login?returnTo=${returnTo}`;
            return;
        }

        fetchQuotes();
    }, [profile, authLoading]);

    const handleAccept = async (id: string) => {
        setActionLoading(id + "-accept");
        try {
            await quoteService.acceptQuote(id);
            toast.success("Quote accepted successfully!");
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
            await fetchQuotes();
        } catch (error) {
            console.error(error);
            toast.error("Failed to reject quote.");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading || authLoading) {
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

    if (!profile) return null;

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Button variant="ghost" size="sm" className="mb-2 -ml-2" asChild>
                            <Link href="/dashboard" className="flex items-center gap-1">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Dashboard
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight">My Quotes</h1>
                        <p className="text-muted-foreground">Detailed history of all your requested quotes.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm overflow-hidden">
                    {quotes.length === 0 ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center text-center p-8">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                                <ReceiptText className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">No Quotes Found</h2>
                            <p className="text-muted-foreground max-w-sm mt-2 mb-8">
                                You haven't requested any quotes from vendors yet.
                                Find the perfect vendor for your next event and request a quote today.
                            </p>
                            <Button asChild>
                                <Link href="/vendors">
                                    Browse Vendors
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Requested Budget</TableHead>
                                        <TableHead>Quoted Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {quotes.map((quote) => {
                                        const vendorName = quote.vendor_name || quote.vendor_id;
                                        const eventTitle = quote.event_title || quote.event_id;
                                        const isQuoted = quote.status === 'responded';

                                        return (
                                            <TableRow key={quote.id}>
                                                <TableCell>
                                                    <div className="font-medium">{vendorName}</div>
                                                    <div className="text-xs text-muted-foreground">{new Date(quote.created_at).toLocaleDateString()}</div>
                                                </TableCell>
                                                <TableCell>{eventTitle}</TableCell>
                                                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                                                    {quote.budget_range || "-"}
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {quote.quoted_price ? `₹${quote.quoted_price}` : 'Pending response'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            quote.status === 'accepted' ? 'default' :
                                                                quote.status === 'rejected' ? 'destructive' :
                                                                    quote.status === 'responded' ? 'secondary' : 'outline'
                                                        }
                                                        className="capitalize"
                                                    >
                                                        {quote.status.replace('_', ' ')}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {isQuoted && (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                disabled={!!actionLoading}
                                                                onClick={() => handleReject(quote.id)}
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 text-xs"
                                                            >
                                                                {actionLoading === quote.id + "-reject" ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3 mr-1" />}
                                                                Reject
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                disabled={!!actionLoading}
                                                                onClick={() => handleAccept(quote.id)}
                                                                className="h-8 text-xs"
                                                            >
                                                                {actionLoading === quote.id + "-accept" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3 mr-1" />}
                                                                Accept
                                                            </Button>
                                                        </div>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
