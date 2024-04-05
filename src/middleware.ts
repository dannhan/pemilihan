import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    const nextUrl = req.nextUrl;
    const redirect = nextUrl.searchParams.get("redirect");

    if (redirect) {
      return NextResponse.redirect(new URL(redirect, req.url));
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/login"],
};
