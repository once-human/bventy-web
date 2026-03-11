import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJWT(token: string) {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';
    const session = request.cookies.get('bventy_session');

    // 0. Handle Global Legal Pages (Privacy/Terms) - Always use /www versions
    if (url.pathname === '/privacy') {
        url.pathname = '/www/privacy';
        return NextResponse.rewrite(url);
    }
    if (url.pathname === '/terms') {
        url.pathname = '/www/terms';
        return NextResponse.rewrite(url);
    }

    // 0.1 Exclude Analytics/Relay from subdomain path mapping (to avoid /status/a/u/...)
    const isAnalytics = url.pathname.startsWith('/a/') || url.pathname.startsWith('/vercel-relay/');
    if (isAnalytics) {
        return NextResponse.next();
    }

    // 1. Handle Subdomain Mappings & Redirects
    let appPath = '/www';

    // Explicit Redirect: vendor.bventy.in -> partner.bventy.in
    if (host.startsWith('vendor.')) {
        const newUrl = request.nextUrl.clone();
        newUrl.host = host.replace('vendor.', 'partner.');
        return NextResponse.redirect(newUrl, 301);
    }

    // 2. Authentication Redirection Logic
    const isAuthSubdomain = host.startsWith('auth.');
    const isProtectedSubdomain = ['app.', 'admin.', 'partner.', 'vendor.'].some(sub => host.startsWith(sub));

    if (isAuthSubdomain && session) {
        // Logged in user trying to access auth.bventy.in -> Redirect to app.bventy.in or admin.bventy.in
        const claims = decodeJWT(session.value);
        const role = claims?.role;
        const isAdminOrStaff = ['admin', 'super_admin', 'staff'].includes(role);

        const targetUrl = new URL(request.url);
        if (isAdminOrStaff) {
            targetUrl.host = host.replace('auth.', 'admin.');
            targetUrl.pathname = '/'; // Admins/Staff go to root
        } else {
            targetUrl.host = host.replace('auth.', 'app.');
            targetUrl.pathname = '/dashboard'; // Standard users go to /dashboard
        }
        return NextResponse.redirect(targetUrl);
    }

    if (isProtectedSubdomain && !session) {
        // Not logged in user trying to access protected subdomain -> Redirect to auth.bventy.in/login
        const authUrl = new URL(request.url);
        authUrl.host = host.replace(/^[^.]+\./, 'auth.');
        authUrl.pathname = '/login';
        authUrl.searchParams.set('returnTo', request.url);
        return NextResponse.redirect(authUrl);
    }

    // 3. Subdomain Path Mapping
    if (host.startsWith('auth.')) {
        appPath = '/auth';
    } else if (host.startsWith('app.')) {
        appPath = '/app';
    } else if (host.startsWith('partner.')) {
        appPath = '/vendor';
    } else if (host.startsWith('admin.')) {
        appPath = '/admin';
    } else if (host.startsWith('status.')) {
        appPath = '/status';
    }

    // 4. Rewrite internal path
    url.pathname = `${appPath}${url.pathname}`;
    const response = NextResponse.rewrite(url);

    // 5. Fix Cookie Domain for local development
    // (We intercept the response to rewrite Set-Cookie headers from the backend)
    // Note: Since this is a rewrite, headers might be tricky to catch here.
    // We'll also rely on the individual app configs if needed, but the Shell is the primary gateway.

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (internal rewrites handled by next.config.api)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
