"use client";

import { useAuth } from "@bventy/services";
import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@bventy/ui";

export function VerificationBanner() {
    const { user, loading } = useAuth();

    if (loading || !user || user.email_verified) {
        return null;
    }

    const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.bventy.in";

    return (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <Alert variant="warning" className="border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-800 dark:text-amber-300 font-semibold">Email Verification Required</AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-400 flex items-center justify-between flex-wrap gap-2">
                    <span>
                        Please verify your email address to access all features. We've sent a code to <strong>{user.email}</strong>.
                    </span>
                    <Link
                        href={`${AUTH_URL}/auth/verify-email?email=${encodeURIComponent(user.email)}`}
                        className="inline-flex items-center text-sm font-bold underline underline-offset-4 hover:text-amber-900 dark:hover:text-amber-200 transition-colors"
                    >
                        Verify Now <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </AlertDescription>
            </Alert>
        </div>
    );
}
