import { NextResponse } from "next/server";
import { auth } from "./app/config/auth";

export async function proxy(request){

    const session=await auth();

    const {pathname}=request.nextUrl
    if(!session &&  !pathname.startsWith("/login")){
        return NextResponse.redirect(new URL("/login",request.url))
    }
    if(session && pathname.startsWith("/login")){
        return NextResponse.redirect(new URL("/",request.url))
    }
    return NextResponse.next();

}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files like CSS/JS)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public images (svg, png, jpg, jpeg)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
    ],
};