import { NextResponse } from "next/server"

export function middleware(request) {
  const path = request.nextUrl.pathname
  // const { searchParams } = request.nextUrl

  const response = NextResponse.next()
  const isLoggedIn = request.cookies.has("userInfo")
  if (
    !isLoggedIn &&
    path !== "/signup" &&
    path !== "/login"
    //  && !(searchParams.get("type") === "mobile" || searchParams.get("type") === "type")
  ) {
    return NextResponse.redirect(new URL("/login?type=email", request.url))
  }
  if (isLoggedIn && path === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  return response
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
