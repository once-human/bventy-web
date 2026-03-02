"use client";

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@bventy/ui";

export default function ForgotPasswordPage() {
    return (
        <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                Reset your password
                            </CardTitle>
                            <CardDescription>
                                Enter your email and we'll send you a code to reset your password.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ForgotPasswordForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
