import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Platform } from '@/types/user';

// Define the shape of our metadata
interface UserMetadata {
  is_confirmed?: boolean;
  platform_preference?: Platform;
  opt_in_newsletter?: boolean;
}

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/clerk(.*)',
  '/terms(.*)',
  '/best-x-posts(.*)',
  '/best-linkedin-posts(.*)',
  '/best-substack-posts(.*)',
]);

// Define onboarding routes
const isOnboardingRoute = createRouteMatcher([
  '/onboarding(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();
  
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // If not authenticated and trying to access protected route, redirect to sign-in
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Get metadata from session claims
  const metadata = sessionClaims?.metadata as UserMetadata || {};
  
  // Check if user is fully onboarded (all three fields are present and valid)
  const isFullyOnboarded = 
    metadata?.is_confirmed === true && 
    metadata?.platform_preference && 
    typeof metadata?.opt_in_newsletter === 'boolean';

  // If user is on onboarding route
  if (isOnboardingRoute(req)) {
    // If fully onboarded, redirect to dashboard
    if (isFullyOnboarded) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Otherwise, allow access to onboarding
    return NextResponse.next();
  }

  // If not fully onboarded and not on onboarding route, redirect to onboarding
  if (!isFullyOnboarded) {
    return NextResponse.redirect(new URL('/onboarding/platform-selection', req.url));
  }

  // If accessing root path and fully onboarded, redirect to dashboard
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Allow access to protected routes for fully onboarded users
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/(api|trpc)(.*)',
  ],
};