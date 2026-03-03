"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import {
    LayoutDashboard,
    Users,
    Store,
    Settings,
    MessageSquare,
    Calendar,
    Briefcase,
    Star,
    BarChart3,
    Wallet,
    UserCircle,
    Bell,
    ChevronRight
} from "lucide-react";
import { Separator } from "../ui/separator";

const sidebarGroups = [
    {
        label: "Workspace",
        items: [
            { title: "Overview", href: "/overview", icon: LayoutDashboard },
            { title: "Leads", href: "/leads", icon: Briefcase },
            { title: "Messages", href: "/messages", icon: MessageSquare },
            { title: "Calendar", href: "/calendar", icon: Calendar },
        ]
    },
    {
        label: "Business",
        items: [
            { title: "Services & Pricing", href: "/services", icon: Store },
            { title: "Portfolio", href: "/portfolio", icon: Users },
            { title: "Reviews", href: "/reviews", icon: Star },
            { title: "Staff", href: "/staff", icon: Users },
        ]
    },
    {
        label: "Insights",
        items: [
            { title: "Performance", href: "/performance", icon: BarChart3 },
            { title: "Earnings", href: "/earnings", icon: Wallet },
        ]
    },
    {
        label: "Settings",
        items: [
            { title: "Business Profile", href: "/settings/profile", icon: UserCircle },
            { title: "Account", href: "/settings/account", icon: Settings },
            { title: "Notifications", href: "/settings/notifications", icon: Bell },
        ]
    }
];

export function VendorSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-64 flex-col border-r bg-card md:flex h-[calc(100vh-4rem)] sticky top-16">
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-4 px-4 text-sm font-medium">
                    {sidebarGroups.map((group, groupIdx) => (
                        <div key={group.label} className="space-y-1">
                            <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                                {group.label}
                            </h3>
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "group flex items-center justify-between rounded-md px-3 py-2 transition-all hover:bg-accent hover:text-accent-foreground",
                                            pathname === item.href
                                                ? "bg-accent text-accent-foreground"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={cn(
                                                "h-4 w-4 transition-colors",
                                                pathname === item.href ? "text-primary" : "group-hover:text-primary"
                                            )} />
                                            {item.title}
                                        </div>
                                        {pathname === item.href && (
                                            <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                                        )}
                                    </Link>
                                ))}
                            </div>
                            {groupIdx < sidebarGroups.length - 1 && (
                                <Separator className="my-4 opacity-50" />
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
