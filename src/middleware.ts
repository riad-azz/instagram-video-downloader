import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { ratelimit } from "./lib/rate-limiter";

async function isNotLimited(request: NextApiRequest) {
  try {
    const ip =
      request.headers["x-real-ip"] ||
      request.headers["x-forwarded-for"] ||
      request.socket?.remoteAddress;
    const ipString = Array.isArray(ip) ? ip.join(",") : ip?.toString();
    const identifier = ipString ?? "riad-insta";
    console.log("identifier:", identifier);
    const result = await ratelimit.limit(identifier);
    return result.success;
  } catch (error: any) {
    console.error(error.message);
    return true;
  }
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextApiRequest) {
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
