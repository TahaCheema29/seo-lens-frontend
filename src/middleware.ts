import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // NOTE: Cross-domain cookies don't work between railway.app and vercel.app
    // Auth is handled client-side for now. 
    // TODO: Use same domain for both frontend and backend (e.g., app.yourdomain.com and api.yourdomain.com)
    
    // Allow all requests through - client-side will handle auth
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