import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';

    // 1. Determine which app to serve based on subdomain
    let appPath = '/www';
    if (host.startsWith('auth.')) {
        appPath = '/auth';
    } else if (host.startsWith('app.')) {
        appPath = '/app';
    } else if (host.startsWith('vendor.')) {
        appPath = '/vendor';
    } else if (host.startsWith('admin.')) {
        appPath = '/admin';
    }

    // 2. Prevent rewrite loop
    if (
        url.pathname.startsWith('/www') ||
        url.pathname.startsWith('/auth') ||
        url.pathname.startsWith('/app') ||
        url.pathname.startsWith('/vendor') ||
        url.pathname.startsWith('/admin')
    ) {
        return NextResponse.next();
    }

    // 3. Rewrite internal path
    if (url.pathname === '/') {
        url.pathname = appPath;
        // TEMPORARY: Use redirect to prove middleware is running
        return NextResponse.redirect(url);
    } else {
        url.pathname = `${appPath}${url.pathname}`;
    }

    const response = NextResponse.rewrite(url);
    response.headers.set('x-debug-rewrite', url.pathname);
    response.headers.set('x-debug-host', host);

    return response;
}

export const config = {
    matcher: [
        '/',
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
