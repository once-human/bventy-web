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
import { useState } from "react";
import { authService } from "@bventy/services";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@bventy/ui";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
});

export function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError(null);
        try {
            await authService.requestReset(values);
            setSuccess(true);
        } catch (err: any) {
            setError("Unable to process request. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    if (success) {
        return (
            <div className="space-y-4 text-center">
                <div className="text-primary font-semibold text-lg">Check your email</div>
                <p className="text-sm text-muted-foreground">
                    If an account exists with that email, we've sent a instructions to reset your password.
                </p>
                <div className="pt-4">
                    <Link href={`/reset-password?email=${encodeURIComponent(form.getValues("email"))}`}>
                        <Button className="w-full">Enter Reset Code</Button>
                    </Link>
                </div>
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

                    {error && (
                        <Alert variant="destructive" className="py-2.5">
                            <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full h-11 text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Sending..." : "Send Reset Instructions"}
                    </Button>

                    <Link
                        href="/login"
                        className="text-center text-xs font-medium text-muted-foreground hover:text-primary transition-all block"
                    >
                        Back to Login
                    </Link>
                </form>
            </Form>
        </div>
    );
}
