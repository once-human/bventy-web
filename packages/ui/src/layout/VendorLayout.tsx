"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { VendorSidebar } from "../vendor/VendorSidebar";

interface VendorLayoutProps {
    children: React.ReactNode;
}

export function VendorLayout({ children }: VendorLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50/50 dark:bg-slate-950/50">
            <Navbar />
            <div className="flex flex-1">
                <VendorSidebar />
                <main className="flex-1 overflow-x-hidden p-6 md:p-8">
                    <div className="mx-auto max-w-7xl animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
