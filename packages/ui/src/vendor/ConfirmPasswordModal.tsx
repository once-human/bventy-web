"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Button,
    Input,
    Label
} from "../index";
import { ShieldCheck, Loader2, Lock } from "lucide-react";

interface ConfirmPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (password: string) => Promise<void>;
    title?: string;
    description?: string;
    actionLabel?: string;
}

export function ConfirmPasswordModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Password",
    description = "Please enter your password to confirm this sensitive action.",
    actionLabel = "Confirm Action"
}: ConfirmPasswordModalProps) {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        if (!password) return;
        setIsLoading(true);
        try {
            await onConfirm(password);
            setPassword("");
            onClose();
        } catch (error) {
            console.error("Password confirmation failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] border-primary/20 bg-card/95 backdrop-blur-md">
                <DialogHeader className="space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="text-center space-y-1">
                        <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                        <DialogDescription className="text-sm">
                            {description}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="password" data-testid="password-label" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10 h-11 bg-background/50 border-primary/10 focus:border-primary/30 transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
                                autoFocus
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 font-semibold"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!password || isLoading}
                        className="flex-1 font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            actionLabel
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
