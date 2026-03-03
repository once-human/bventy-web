"use client";

import { useEffect } from "react";
import { useAuth, getAuthUrl } from "@bventy/services";

export default function RootPage() {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (user) {
                window.location.href = "/dashboard";
            } else {
                // Check if we have a token in the URL or storage first
                const params = new URLSearchParams(window.location.search);
                if (params.has("token") || localStorage.getItem("token")) {
                    // AuthContext will handle it
                    return;
                }
                const authUrl = getAuthUrl();
                const returnTo = encodeURIComponent(window.location.host);
                window.location.href = `${authUrl}/login?returnTo=${returnTo}`;
            }
        }
    }, [user, loading]);

    return null;
}
