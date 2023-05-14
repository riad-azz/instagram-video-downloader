import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getClientIp } from "./helpers";
import { NextRequest } from "next/server";
import { upstashToken, upstashUrl, enableUpstash } from "@/config/upstash";

export const redisClient = new Redis({
  url: upstashUrl,
  token: upstashToken,
});

// Create a new ratelimiter, that allows 1 requests per 1 minute
export const ratelimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.fixedWindow(5, `1 m`),
});

export const isNotRatelimited = async (request: NextRequest) => {
  if (!enableUpstash) return true;
  try {
    const clientIp = getClientIp(request);
    const identifier = clientIp ?? "riad-insta";
    const result = await ratelimit.limit(identifier);
    if (!result.success) {
      // Ban spammer for 24 hours
      await redisClient.setex(`ban:${identifier}`, 86400, "banned");
    }
    return result.success;
  } catch (error: any) {
    console.error(error.message);
    return true;
  }
};
