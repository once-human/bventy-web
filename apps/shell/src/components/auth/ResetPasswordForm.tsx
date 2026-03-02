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
import { authService } from "@bventy/services";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@bventy/ui";

const formSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6, {
        message: "Code must be 6 digits.",
    }),
    new_password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const emailParam = searchParams.get("email") || "";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: emailParam,
            otp: "",
            new_password: "",
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
            await authService.resetPassword(values);
            setSuccess(true);
            setTimeout(() => {
                router.push("/login?reset=success");
            }, 2000);
        } catch (err: any) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to reset password. Please check your code and try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (success) {
        return (
            <div className="space-y-4 text-center">
                <div className="text-primary font-semibold text-lg">Password Reset!</div>
                <p className="text-sm text-muted-foreground">
                    Your password has been successfully reset. Redirecting to login...
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
                                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Reset Code</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="new_password"
                        render={({ field }) => (
                            <FormItem className="space-y-1.5">
                                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...field}
                                        className="h-11 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-all"
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
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
