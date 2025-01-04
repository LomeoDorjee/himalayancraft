import { clerkClient, clerkMiddleware, createRouteMatcher, currentUser, getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/manage(.*)'])
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/(.*)'])

const SUPER_ADMIN_IDS = (process.env.SUPER_ADMIN_IDS || "")
  .split(",")
  .map((ids) => ids.trim());

export default clerkMiddleware(async (auth, req) => {

  if (isProtectedRoute(req)) {

    const { userId } = await auth()

    console.log(userId)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    // Redirect to /403 if the user is not a super admin
    if (!SUPER_ADMIN_IDS.includes(userId)) {
      return NextResponse.redirect(new URL("/not-found", req.url)); // Forbidden page
    }

    auth().protect()
  }

  if (!isPublicRoute(req)) auth().protect()

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}