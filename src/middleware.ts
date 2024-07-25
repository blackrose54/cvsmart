import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth,req)=>{
  
    const isAuthRoute = createRouteMatcher(['/auth(.*)'])
    const isPublicRoute = createRouteMatcher(['/','/dashboard/resume/preview/(.*)']);

    if(isPublicRoute(req)) return

    const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

    if(isProtectedRoute(req)) auth().protect();

    if(auth().userId && isAuthRoute(req)) return NextResponse.redirect(new URL('/dashboard',req.url));

    
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};