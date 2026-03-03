"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@bventy/ui";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@bventy/ui";
import { Input } from "@bventy/ui";
import { useState, useEffect } from "react";
import { authService, useAuth } from "@bventy/services";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@bventy/ui";

const formSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6, {
        message: "Verification code must be 6 digits.",
    }),
});

export function VerifyEmailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, login, loading: authLoading } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const emailParam = searchParams.get("email") || "";

    // Redirect if already verified
    useEffect(() => {
        if (!authLoading && user?.email_verified) {
            router.push("/vendor/overview");
        }
    }, [user, authLoading, router]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: emailParam,
            otp: "",
        },
    });

    useEffect(() => {
        if (emailParam) {
            form.setValue("email", emailParam);
        }
    }, [emailParam, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError(null);
        try {
            await authService.verifyEmail(values);
            setSuccess(true);
            // Auto-login after verification
            setTimeout(async () => {
                await login(true); // This handles the role-based redirect to dashboard
            }, 1500);
        } catch (err: any) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Verification failed. Please check your code and try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (success) {
        return (
            <div className="space-y-4 text-center">
                <div className="text-primary font-semibold text-lg">Email Verified!</div>
                <p className="text-sm text-muted-foreground">
                    Your account has been successfully verified. Redirecting you to login...
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name@example.com"
                                        {...field}
                                        disabled={!!emailParam}
                                        className="h-11 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-all"
                                    />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Verification Code</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="123456"
                                        maxLength={6}
                                        {...field}
                                        className="h-11 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-all tracking-[0.5em] text-center font-mono text-lg"
                                    />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />

                    {error && (
                        <Alert variant="destructive" className="py-2.5">
                            <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full h-11 text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
