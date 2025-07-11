import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple JWT decode function for middleware
function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    return null
  }
}

// Check if token is valid and not expired
function isTokenValid(token: string): boolean {
  const decoded = decodeJWT(token)
  if (!decoded) return false
  
  const currentTime = Date.now() / 1000
  return !decoded.exp || decoded.exp > currentTime
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const userRole = request.cookies.get('user-role')?.value
  const userId = request.cookies.get('user-id')?.value
  
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth')
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
  const isProtectedRoute = isAdminRoute || isDashboardRoute
  
  // Check if user is authenticated
  const isAuthenticated = token && isTokenValid(token) && userRole && userId
  
  // If accessing protected routes without valid token, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  // If accessing auth routes with valid token, redirect to appropriate dashboard
  if (isAuthRoute && isAuthenticated) {
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  // For admin routes, check if user has admin role
  if (isAdminRoute && isAuthenticated) {
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/auth/:path*',
    '/checkout/:path*',
    '/consultation/:path*',
    '/onboarding/:path*',
  ],
} 