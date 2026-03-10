"use client";

import { Skeleton } from "@bventy/ui";

export function VendorProfileSkeleton() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                <div className="space-y-8">
                    {/* Header Skeleton */}
                    <div>
                        <div className="flex gap-2 mb-4">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                        <Skeleton className="h-10 w-3/4 mb-4" />
                        <div className="flex gap-4">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>

                    {/* About Skeleton */}
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>

                    {/* Services Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-40" />
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                                <Skeleton className="h-6 w-20" />
                            </div>
                        ))}
                    </div>

                    {/* Gallery Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-24" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Skeleton key={i} className="aspect-square rounded-lg" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="space-y-6">
                    <div className="rounded-xl border p-6 space-y-4">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <div className="pt-4 border-t space-y-4">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
