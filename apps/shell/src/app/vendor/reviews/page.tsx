"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Badge,
    Separator,
    Avatar,
    AvatarFallback
} from "@bventy/ui";
import {
    Star,
    MessageSquare,
    CheckCircle2,
    ThumbsUp,
    Filter,
    ChevronDown
} from "lucide-react";

export default function ReviewsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
                    <p className="text-muted-foreground">Manage your customer feedback and online reputation.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        All Time <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                {/* Rating Summary */}
                <Card className="md:col-span-1 shadow-sm h-fit">
                    <CardHeader>
                        <CardTitle className="text-sm">Rating Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center space-y-2">
                            <div className="text-4xl font-extrabold">4.8</div>
                            <div className="flex justify-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`h-5 w-5 ${s <= 4 ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground">Based on 124 reviews</p>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-2 text-xs">
                                    <span className="w-3">{rating}</span>
                                    <Star className="h-3 w-3 fill-primary text-primary" />
                                    <div className="flex-1 h-1.5 bg-muted rounded-full">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all"
                                            style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                                        />
                                    </div>
                                    <span className="w-8 text-right opacity-70">
                                        {rating === 5 ? "80%" : rating === 4 ? "15%" : "5%"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="md:col-span-3 space-y-6">
                    {[
                        { name: "Anil Sharma", date: "2 days ago", rating: 5, comment: "Absolutely fantastic service! The food was delicious and the staff was extremely professional. Highly recommended for any large corporate event.", response: "Thank you Anil! It was a pleasure serving your team at Acme Corp." },
                        { name: "Priya Singh", date: "1 week ago", rating: 4, comment: "Great variety of dishes. The presentation was top-notch. Minor delay in dessert serving but overall a great experience.", response: null },
                        { name: "Vikram Malhotra", date: "2 weeks ago", rating: 5, comment: "The best catering experience we've had in years. The regional specialties were a huge hit with the guests.", response: null },
                    ].map((review, i) => (
                        <Card key={i} className="shadow-sm">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-primary/10 text-primary">{review.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-semibold">{review.name}</p>
                                            <p className="text-[10px] text-muted-foreground">{review.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className={`h-3 w-3 ${s <= review.rating ? "fill-primary text-primary" : "text-muted-foreground opacity-30"}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    &quot;{review.comment}&quot;
                                </p>
                                {review.response ? (
                                    <div className="bg-muted/40 p-4 rounded-lg space-y-2 border-l-2 border-primary">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="text-[10px] py-0 px-1.5 h-auto">Your Response</Badge>
                                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                        </div>
                                        <p className="text-xs italic text-muted-foreground">
                                            &quot;{review.response}&quot;
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 pt-2">
                                        <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold hover:text-primary">
                                            <MessageSquare className="mr-2 h-3 w-3" /> Reply to Review
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold">
                                            <ThumbsUp className="mr-2 h-3 w-3" /> Like Review
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                    <Button variant="outline" className="w-full">Load More Reviews</Button>
                </div>
            </div>
        </div>
    );
}
