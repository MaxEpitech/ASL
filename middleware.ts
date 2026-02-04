import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isLoginPage = req.nextUrl.pathname === '/admin/login';
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin') && !isLoginPage;

    // Redirect to login if trying to access admin pages without being logged in
    if (isAdminRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Redirect to admin dashboard if already logged in and trying to access login
    if (isLoginPage && isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/blog', req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/admin/:path*'],
};
