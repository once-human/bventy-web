"use client";

import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@bventy/ui";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
    return (
        <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                Verify your email
                            </CardTitle>
                            <CardDescription>
                                We've sent a 6-digit code to your email. Enter it below to verify your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
                                <VerifyEmailForm />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
