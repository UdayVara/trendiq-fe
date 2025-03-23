
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export const middleware = async (req: NextRequest) => {
    const url = req.nextUrl.pathname;

    // List of public URLs
    const publicUrls = ["/", "/products", "/signin", "/signup"];
    
    // Allow dynamic route matching (e.g., `/product/123`)
    const isPublic = publicUrls.includes(url) || url.startsWith("/product/");

    const isAuthRoutes = ["/signin", "/signup"].includes(url);

    if(isAuthRoutes){
        const user = await auth()
        console.log("user",user)
        if(user?.user){
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    if(!isPublic){
        const user = await auth()
        console.log("user",user)
        if(!user?.user){
            return NextResponse.redirect(new URL('/signin', req.url))
        }
    }
};



export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }