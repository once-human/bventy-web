import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';
    const session = request.cookies.get('bventy_session');

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
        // Logged in user trying to access auth.bventy.in -> Redirect to app.bventy.in
        const targetUrl = new URL(request.url);
        targetUrl.host = host.replace('auth.', 'app.');
        targetUrl.pathname = '/dashboard';
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
