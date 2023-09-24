import { NextRequest, NextResponse } from "next/server";

import { upstashBanDuration } from "@/configs/upstash";
import { enableServerAPI } from "@/configs/instagram";

import { getClientIp } from "@/utils";
import { isRatelimited } from "@/lib/rate-limiter";

const isStaticPath = (path: string) => {
  const staticPaths = [
    "/_next",
    "/images",
    "/favicon.ico",
    "/robots.txt",
    "/webmanifest.json",
  ];
  for (const staticPath of staticPaths) {
    if (path.startsWith(staticPath)) {
      return true;
    }
  }

  return false;
};

export async function middleware(request: NextRequest) {
  const requestPath = request.nextUrl.pathname;
  const country = request.geo?.country ?? "Country";

  if (isStaticPath(requestPath)) {
    return NextResponse.next();
  }

  if (requestPath.startsWith("/api") && enableServerAPI) {
    const isLimited = await isRatelimited(request);
    if (!isLimited) return;

    // Ban duration in hours (4 hours is the default in src/configs/upstash.ts)
    const banDuration = Math.floor(upstashBanDuration / 60 / 60);
    return NextResponse.json(
      {
        error: `Too many requests, you have been banned for ${banDuration} hours.`,
      },
      { status: 429 }
    );
  }

  const clientIp = getClientIp(request);
  console.log(`${request.method} ${clientIp} (${country}) -> ${requestPath}`);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
