"use client";

import { authService, useAuth } from "@bventy/services";
import { AlertCircle, ArrowRight, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle, Button } from "@bventy/ui";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function VerificationBanner() {
    const { user, loading } = useAuth();
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        let timer: any;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    if (loading || !user || user.email_verified) {
        return null;
    }

    const handleResend = async () => {
        setIsResending(true);
        try {
            await authService.resendVerification({ email: user.email });
            toast.success("Verification code resent! Please check your inbox.");
            setCountdown(60); // Start a local 60s cooldown
        } catch (error: any) {
            const message = error.response?.data?.error || "Failed to resend code";
            toast.error(message);

            // If backend says wait, try to parse the time
            if (error.response?.data?.retry_after) {
                setCountdown(error.response.data.retry_after);
            }
        } finally {
            setIsResending(false);
        }
    };

    const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.bventy.in";

    return (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <Alert variant="warning" className="border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20 shadow-sm">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-amber-800 dark:text-amber-300 font-semibold">Email Verification Required</AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-400 flex items-center justify-between flex-wrap gap-4 mt-1">
                    <span className="flex-1 min-w-[280px]">
                        Please verify your email address to access all features. We've sent a code to <strong>{user.email}</strong>.
                    </span>
                    <div className="flex items-center gap-3 shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-amber-700 hover:text-amber-800 hover:bg-amber-100 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-900/50 font-medium text-xs"
                            onClick={handleResend}
                            disabled={isResending || countdown > 0}
                        >
                            {isResending ? (
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                            ) : (
                                <Mail className="mr-2 h-3 w-3" />
                            )}
                            {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
                        </Button>
                        <Link
                            href={`${AUTH_URL}/verify-email?email=${encodeURIComponent(user.email)}`}
                            className="inline-flex items-center h-8 px-3 rounded-md bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors shadow-sm"
                        >
                            Verify Now <ArrowRight className="ml-1.5 h-3 w-3" />
                        </Link>
                    </div>
                </AlertDescription>
            </Alert>
        </div>
    );
}
