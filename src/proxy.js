import { NextResponse } from "next/server";
import { auth } from "./app/config/auth";
import { ratelimit } from "./app/lib/ratelimit";
export async function proxy(request){

    const session=await auth();

    const {pathname}=request.nextUrl
 // 2. Rate Limiting Logic
 if (pathname.startsWith("/api")) {
    const identifier = session?.user?.id ?? request.ip ?? "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

    if (!success) {
        return new NextResponse("Too Many Requests", {
            status: 429,
            headers: {
                "X-RateLimit-Limit": limit.toString(),
                "X-RateLimit-Remaining": remaining.toString(),
                "X-RateLimit-Reset": reset.toString(),
            },
        });
    }
}
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



// import { NextResponse } from "next/server";
// import { auth } from "./app/config/auth";
// import { ratelimit } from "./app/lib/ratelimit";

// export async function proxy(request) {
//   const { pathname } = request.nextUrl;

//   const session = await auth();

//   if (pathname.startsWith("/api")) {
//     const identifier =
//       session?.user?.id ?? request.ip ?? "127.0.0.1";

//     const { success, limit, reset, remaining } =
//       await ratelimit.limit(identifier);

//     if (!success) {

//       return NextResponse.json(
//         {
//           error: "RATE_LIMITED",
//           message: "Too Many Requests",
//         },
//         {
//           status: 429,
//           headers: {
//             "X-RateLimit-Limit": limit.toString(),
//             "X-RateLimit-Remaining": remaining.toString(),
//             "X-RateLimit-Reset": reset.toString(),
//           },
//         }
//       );
//     }

//     return NextResponse.next();
//   }

//   if (!session && !pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (session && pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }
