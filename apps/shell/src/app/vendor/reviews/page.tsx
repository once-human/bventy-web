"use client";

import React, { useState, useMemo } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Badge,
    Separator,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    Textarea,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    Input
} from "@bventy/ui";
import {
    Star,
    MessageSquare,
    CheckCircle2,
    ThumbsUp,
    Filter,
    ChevronDown,
    Search,
    SortAsc,
    MoreHorizontal,
    Loader2
} from "lucide-react";
import useSWR from "swr";
import { vendorService, useAuth, Review } from "@bventy/services";
import { format } from "date-fns";
import { toast } from "sonner";

export default function ReviewsPage() {
    const { user } = useAuth();
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const [replyFilter, setReplyFilter] = useState<string>("all"); // all, replied, unreplied
    const [sortBy, setSortBy] = useState<string>("newest");
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [replyText, setReplyText] = useState("");
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);

    const { data: reviews, error, isLoading, mutate } = useSWR(
        user?.vendor_slug ? [`vendor-reviews`, user.vendor_slug, ratingFilter, replyFilter, sortBy] : null,
        () => vendorService.getVendorReviews(user!.vendor_slug!, {
            rating: ratingFilter || undefined,
            has_reply: replyFilter === "all" ? undefined : replyFilter === "replied",
            sort: sortBy
        })
    );

    const { data: vendorProfile } = useSWR(
        user?.vendor_slug ? ["vendor-me"] : null,
        () => vendorService.getMyProfile()
    );

    const { data: allReviews } = useSWR(
        user?.vendor_slug ? [`vendor-reviews-all`, user.vendor_slug] : null,
        () => vendorService.getVendorReviews(user!.vendor_slug!)
    );

    const stats = useMemo(() => {
        if (!allReviews || allReviews.length === 0) return { avg: 0, count: 0, distribution: [0, 0, 0, 0, 0] };

        const count = allReviews.length;
        const totalRating = allReviews.reduce((acc, r) => acc + r.rating, 0);
        const dist = [0, 0, 0, 0, 0];
        allReviews.forEach(r => dist[r.rating - 1]++);

        return {
            avg: (totalRating / count).toFixed(1),
            count,
            distribution: dist.reverse() // [5-star, 4-star, ...]
        };
    }, [allReviews]);

    const handleReply = (review: Review) => {
        setSelectedReview(review);
        setReplyText(review.reply_text || "");
        setIsReplyModalOpen(true);
    };

    const submitReply = async () => {
        if (!selectedReview || !replyText.trim()) return;

        setIsSubmittingReply(true);
        try {
            await vendorService.replyToReview(selectedReview.id, replyText);
            toast.success("Reply saved successfully");
            setIsReplyModalOpen(false);
            mutate();
        } catch (err) {
            toast.error("Failed to save reply");
        } finally {
            setIsSubmittingReply(false);
        }
    };

    const handleLike = async (reviewId: string) => {
        try {
            await vendorService.likeReview(reviewId);
            toast.success("Helpful mark added!");
            mutate();
        } catch (err) {
            toast.error("Failed to like review");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
                    <p className="text-muted-foreground">Manage your customer feedback and online reputation.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 gap-2">
                                <Star className="h-4 w-4" />
                                {ratingFilter ? `${ratingFilter} Stars` : "All Ratings"}
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setRatingFilter(null)}>All Ratings</DropdownMenuItem>
                            {[5, 4, 3, 2, 1].map(r => (
                                <DropdownMenuItem key={r} onClick={() => setRatingFilter(r)}>
                                    {r} Stars
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 gap-2">
                                <Filter className="h-4 w-4" />
                                {replyFilter === "all" ? "All Reviews" : replyFilter === "replied" ? "Replied" : "Needs Reply"}
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setReplyFilter("all")}>All Reviews</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setReplyFilter("replied")}>Replied</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setReplyFilter("unreplied")}>Needs Reply</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 gap-2">
                                <SortAsc className="h-4 w-4" />
                                {sortBy === "newest" ? "Newest First" : sortBy === "oldest" ? "Oldest First" : sortBy === "highest" ? "Highest Rated" : "Lowest Rated"}
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest First</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("highest")}>Highest Rated</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("lowest")}>Lowest Rated</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
                {/* Rating Summary */}
                <Card className="lg:col-span-1 shadow-sm h-fit sticky top-6">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Rating Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center space-y-2">
                            <div className="text-5xl font-extrabold tracking-tighter">{stats.avg}</div>
                            <div className="flex justify-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`h-5 w-5 ${s <= Math.round(Number(stats.avg)) ? "fill-primary text-primary" : "text-muted opacity-30 fill-muted"}`} />
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground font-medium">Based on {stats.count} reviews</p>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((rating, i) => (
                                <div key={rating} className="flex items-center gap-2 text-xs">
                                    <span className="w-3 font-semibold">{rating}</span>
                                    <Star className="h-3 w-3 fill-primary text-primary opacity-50" />
                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${stats.count > 0 ? (stats.distribution[i] / stats.count) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <span className="w-8 text-right font-medium tabular-nums opacity-60">
                                        {stats.count > 0 ? Math.round((stats.distribution[i] / stats.count) * 100) : 0}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="lg:col-span-3 space-y-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-20 space-y-4">
                            <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
                            <p className="text-sm text-muted-foreground animate-pulse">Fetching your reviews...</p>
                        </div>
                    ) : !reviews || reviews.length === 0 ? (
                        <Card className="border-dashed shadow-none bg-muted/20">
                            <CardContent className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                <div className="bg-background p-4 rounded-full shadow-sm">
                                    <MessageSquare className="h-8 w-8 text-muted-foreground opacity-20" />
                                </div>
                                <div className="max-w-xs space-y-1">
                                    <h3 className="font-bold text-lg">No reviews found</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {ratingFilter || replyFilter !== "all"
                                            ? "Try changing your filters to see more feedback."
                                            : "You haven't received any reviews yet. Complete bookings to start building your reputation!"
                                        }
                                    </p>
                                </div>
                                {(ratingFilter || replyFilter !== "all") && (
                                    <Button variant="outline" size="sm" onClick={() => { setRatingFilter(null); setReplyFilter("all"); }}>
                                        Clear All Filters
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        reviews.map((review) => (
                            <Card key={review.id} className="group shadow-sm hover:shadow-md transition-all duration-300 border-primary/5 hover:border-primary/20">
                                <CardContent className="p-6 space-y-5">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-primary/10 shadow-sm ring-2 ring-background">
                                                <AvatarImage src={review.profile_image} />
                                                <AvatarFallback className="bg-primary/5 text-primary text-lg font-bold">
                                                    {review.organizer_name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-base font-bold tracking-tight">{review.organizer_name}</p>
                                                    <Badge variant="outline" className="text-[10px] h-4 leading-none py-0 border-primary/20 text-primary/70">Verified Hire</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60">
                                                    {format(new Date(review.created_at), "MMMM d, yyyy")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star key={s} className={`h-4 w-4 ${s <= review.rating ? "fill-primary text-primary" : "text-muted opacity-20 fill-muted"}`} />
                                                ))}
                                            </div>
                                            <Badge variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] h-5 font-bold">
                                                {review.rating}.0 Rating
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-3 top-0 bottom-0 w-1 bg-primary/10 rounded-full group-hover:bg-primary/30 transition-all" />
                                        <p className="text-sm text-foreground/80 leading-relaxed font-medium pl-2 italic">
                                            &ldquo;{review.comment}&rdquo;
                                        </p>
                                    </div>

                                    {review.reply_text ? (
                                        <div className="bg-muted/30 p-5 rounded-2xl space-y-3 border border-primary/5 relative overflow-hidden group/reply">
                                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover/reply:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleReply(review)}>
                                                    <MoreHorizontal className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                                        {vendorProfile?.business_name ? vendorProfile.business_name[0] : "Y"}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-primary">Your Business</span>
                                                        <CheckCircle2 className="h-3 w-3 text-emerald-500 fill-emerald-500/10" />
                                                    </div>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground font-bold opacity-50">
                                                    {review.replied_at ? format(new Date(review.replied_at), "MMM d") : ""}
                                                </p>
                                            </div>
                                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                                {review.reply_text}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="h-9 px-4 text-xs font-bold gap-2 bg-primary/5 hover:bg-primary hover:text-white text-primary transition-all rounded-full border border-primary/10"
                                                    onClick={() => handleReply(review)}
                                                >
                                                    <MessageSquare className="h-3.5 w-3.5" />
                                                    Reply to Feedback
                                                </Button>
                                                <Separator orientation="vertical" className="h-4" />
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-9 px-3 text-xs font-bold gap-2 rounded-full hover:bg-muted/50"
                                                    onClick={() => handleLike(review.id)}
                                                >
                                                    <ThumbsUp className={`h-3.5 w-3.5 ${review.helpful_count > 0 ? "fill-primary text-primary" : ""}`} />
                                                    {review.helpful_count > 0 ? `${review.helpful_count} Helpful` : "Helpful"}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            {/* Reply Modal */}
            <Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
                <DialogContent className="sm:max-w-[500px] border-none shadow-2xl overflow-hidden p-0">
                    <div className="h-2 bg-primary w-full" />
                    <DialogHeader className="p-8 pb-0">
                        <DialogTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
                            <MessageSquare className="h-6 w-6 text-primary" />
                            {selectedReview?.reply_text ? "Edit Your Reply" : "Reply to Review"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="p-8 space-y-6">
                        {selectedReview && (
                            <div className="bg-muted/20 p-4 rounded-xl border border-dashed text-sm space-y-2">
                                <p className="font-bold text-xs uppercase tracking-wider text-muted-foreground opacity-70">Review from {selectedReview.organizer_name}</p>
                                <p className="italic text-foreground/70">&quot;{selectedReview.comment}&quot;</p>
                            </div>
                        )}

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold tracking-tight text-foreground/80">Your Response</label>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-40">Public on Profile</span>
                            </div>
                            <Textarea
                                placeholder="Thank you for your business! We really enjoyed working with you..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="min-h-[150px] resize-none focus-visible:ring-primary border-muted bg-background/50 rounded-2xl p-4 text-sm"
                            />
                        </div>
                    </div>

                    <DialogFooter className="bg-muted/30 p-6 flex flex-row items-center justify-between gap-4">
                        <Button variant="ghost" onClick={() => setIsReplyModalOpen(false)} className="font-bold h-11 px-6 rounded-full">
                            Cancel
                        </Button>
                        <Button
                            onClick={submitReply}
                            disabled={isSubmittingReply || !replyText.trim()}
                            className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isSubmittingReply ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Post Reply"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
