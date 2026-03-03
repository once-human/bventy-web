"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, userService } from "./services/user";
import { authService } from "./services/auth";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import {
    getAppUrl,
    getAdminUrl,
    getVendorUrl,
    getAuthUrl,
    ensureAbsolute,
    redirectToLogin
} from "./utils/redirects";

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    login: (shouldRedirect?: boolean) => Promise<void>;
    logout: () => void;
    refetch: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const posthog = usePostHog();

    const fetchUser = async () => {
        try {
            const profile = await userService.getMe();
            setUser(profile);

            if (profile && profile.id) {
                posthog.identify(profile.id, {
                    email: profile.email,
                    name: profile.full_name,
                    role: profile.role,
                });
            }
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (shouldRedirect = true) => {
        await fetchUser();

        if (shouldRedirect) {
            const APP_URL = getAppUrl();
            const ADMIN_URL = getAdminUrl();
            const VENDOR_URL = getVendorUrl();

            // Re-fetch user to get the latest role
            const profile = await userService.getMe();

            // Check if there's a returnTo parameter in the current URL
            const params = new URLSearchParams(window.location.search);
            const returnTo = params.get("returnTo");

            if (returnTo) {
                window.location.href = ensureAbsolute(returnTo);
                return;
            }

            if (profile && ["admin", "super_admin"].includes(profile.role)) {
                window.location.href = ADMIN_URL;
            } else if (profile && profile.vendor_profile_exists) {
                window.location.href = `${VENDOR_URL}/overview`;
            } else {
                window.location.href = `${APP_URL}/dashboard`;
            }
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            posthog.reset();
            const authUrl = getAuthUrl();
            window.location.href = `${authUrl}/login`;
        } catch (e) {
            console.error("Logout failed", e);
            setUser(null);
            const authUrl = getAuthUrl();
            window.location.href = `${authUrl}/login`;
        }
    };



    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                refetch: fetchUser,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
