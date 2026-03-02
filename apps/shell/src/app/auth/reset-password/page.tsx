"use client";

import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@bventy/ui";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
    return (
        <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                New Password
                            </CardTitle>
                            <CardDescription>
                                Enter the code we sent to your email and choose a new password.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
                                <ResetPasswordForm />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
