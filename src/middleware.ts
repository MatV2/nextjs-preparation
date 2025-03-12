import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Get maintenance mode setting from environment variable
const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

// You can add paths that should be accessible even in maintenance mode
const ALLOWED_PATHS = [
  '/maintenance',
  '/api/health', // Example API endpoint that should remain accessible
];

// Get allowed IPs from environment variable
const ALLOWED_IPS: string[] = (process.env.ALLOWED_IPS || '')
  .split(',')
  .map(ip => ip.trim())
  .filter(Boolean);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.ip || '';

  // Check if maintenance mode is enabled
  if (MAINTENANCE_MODE) {
    // Allow access to specific paths even in maintenance mode
    if (ALLOWED_PATHS.some(path => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // Allow specific IPs to bypass maintenance mode
    if (ALLOWED_IPS.includes(ip)) {
      return NextResponse.next();
    }

    // Redirect all other requests to the maintenance page
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  // If maintenance mode is disabled, proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (image files)
     * - public files (e.g. robots.txt)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:jpg|jpeg|png|gif|svg|ico)).*)',
  ],
}; 