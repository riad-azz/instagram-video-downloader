import { NextRequest, NextResponse } from "next/server";

import { getIpFromRequest } from "@/lib/http";

import { isRatelimited } from "@/features/rate-limiter/utils";
import { UPSTASH_CONFIGS } from "@/features/rate-limiter/constants";

export async function middleware(request: NextRequest) {
  const requestPath = request.nextUrl.pathname;
  const country = request.geo?.country ?? "Country";

  const clientIp = getIpFromRequest(request);

  // Log request info
  console.log(`${request.method} ${clientIp} (${country}) -> ${requestPath}`);

  // If there IP is not provided we skip rate limiting because its what we are using as an identifier
  // typically you would use the user ID but we don't have authentication implemented
  if (!clientIp) return NextResponse.next();

  // Check if ratelimit is successful
  const isLimited = await isRatelimited(clientIp);
  if (!isLimited) return NextResponse.next();

  // Ban duration in hours (4 hours is the default)
  const banDuration = Math.floor(UPSTASH_CONFIGS.banDuration / 60 / 60);
  return NextResponse.json(
    {
      error: `Too many requests, you have been banned for ${banDuration} hours.`,
    },
    { status: 429 }
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*"],
};
