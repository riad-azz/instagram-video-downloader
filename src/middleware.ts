import { NextRequest, NextResponse } from "next/server";
import { isRatelimited } from "./lib/rate-limiter";
import { getClientIp } from "@/lib/utils";
import { upstashBanDuration } from "./configs/upstash";

const isStaticPath = (path: string) => {
  return (
    path.startsWith("/_next") ||
    path.startsWith("/images") ||
    path.startsWith("/favicon.ico") ||
    path.startsWith("/og.png") ||
    path.startsWith("/robot.txt") ||
    path.startsWith("/site.webmanifest") ||
    path.startsWith("/google1f8f82246dfef594.html")
  );
};

export async function middleware(request: NextRequest) {
  const requestPath = request.nextUrl.pathname;
  const country = request.geo?.country ?? "Country";

  if (isStaticPath(requestPath)) {
    return NextResponse.next();
  }

  if (requestPath.startsWith("/api")) {
    const isLimited = await isRatelimited(request);
    if (isLimited) {
      const banDuration = Math.floor(upstashBanDuration / 60 / 60); // Ban duration in hours
      return NextResponse.json(
        {
          error: `Too many requests, you have been banned for ${banDuration} hours.`,
        },
        { status: 429 }
      );
    }
  }

  const clientIp = getClientIp(request);
  console.log(`${request.method} ${clientIp} (${country}) -> ${requestPath}`);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
