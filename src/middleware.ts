import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "./lib/rate-limiter";

async function isNotLimited(request: NextRequest) {
  try {
    let ip = request.ip ?? request.headers.get("x-real-ip");
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (!ip && forwardedFor) {
      ip = forwardedFor.split(",").at(0) ?? null;
    }
    const identifier = ip ?? "riad-insta";
    console.log("identifier:", identifier);
    const result = await ratelimit.limit(identifier);
    return result.success;
  } catch (error: any) {
    console.error(error.message);
    return true;
  }
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const success = await isNotLimited(request);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests, try again later." },
      { status: 429 }
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/instagram/:path*",
};
