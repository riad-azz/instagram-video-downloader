import { NextRequest, NextResponse } from "next/server";
import { isNotRatelimited } from "./lib/rate-limiter";
import { getClientIp } from "@/lib/helpers";

const isStaticPath = (path: string) => {
  return (
    path.startsWith("/_next") ||
    path.startsWith("/images") ||
    path.startsWith("/favicon.ico") ||
    path.startsWith("/og.png") ||
    path.startsWith("/robot.txt") ||
    path.startsWith("/site.webmanifest") ||
    path.startsWith("/google0888728b41583a8e.html")
  );
};

export async function middleware(request: NextRequest) {
  const requestPath = request.nextUrl.pathname;
  const country = request.geo?.country ?? "Country";

  if (isStaticPath(requestPath)) {
    return NextResponse.next();
  }

  if (requestPath.startsWith("/api")) {
    const notLimited = await isNotRatelimited(request);
    if (!notLimited) {
      return NextResponse.json(
        {
          error: "Too many requests you have been banned for 24 hours.",
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
