import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const userToken = request.cookies.get('access_token');
    const adminToken = request.cookies.get('admin_access_token');

    if (pathname.startsWith('/dashboard')) {
        if (!userToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        if (adminToken) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    if (pathname.startsWith('/admin/dashboard')) {
        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        if (userToken) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    if (pathname === '/login' || pathname === '/register') {
        if (userToken) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        if (adminToken) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    if (pathname === '/admin/login' || pathname === '/admin/register') {
        if (adminToken) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
        if (userToken) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/dashboard/:path*',
        '/login',
        '/register',
        '/admin/login',
        '/admin/register',
    ],
};