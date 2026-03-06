export const ensureAbsolute = (url: string) => {
    if (!url) return "";
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`;
    }
    return url;
};

export const getAppUrl = () => ensureAbsolute(process.env.NEXT_PUBLIC_APP_URL || "app.bventy.in");
export const getAdminUrl = () => ensureAbsolute(process.env.NEXT_PUBLIC_ADMIN_URL || "admin.bventy.in");
export const getVendorUrl = () => ensureAbsolute(process.env.NEXT_PUBLIC_VENDOR_URL || "partner.bventy.in");
export const getAuthUrl = () => ensureAbsolute(process.env.NEXT_PUBLIC_AUTH_URL || "auth.bventy.in");
export const getWwwUrl = () => ensureAbsolute(process.env.NEXT_PUBLIC_WWW_URL || "bventy.in");

export const redirectToLogin = (returnTo?: string) => {
    const authUrl = getAuthUrl();
    const currentHost = typeof window !== "undefined" ? window.location.host : "";
    const target = returnTo || currentHost;
    window.location.href = `${authUrl}/login?returnTo=${encodeURIComponent(target)}`;
};

export const crossRedirect = (targetUrl: string) => {
    window.location.href = ensureAbsolute(targetUrl);
};
