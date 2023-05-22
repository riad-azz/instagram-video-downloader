import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getClientIp } from "./helpers";
import { NextRequest } from "next/server";
import {
  upstashToken,
  upstashUrl,
  enableUpstash,
  upstashBanEnabled,
  upstashBanDuration,
  maxRequests,
  maxRequestsDuration,
} from "@/configs/upstash";

const isValidUpstash = () => {
  if (!upstashUrl) {
    console.error("UPSTASH_URL is missing from your environment variables.");
  }

  if (!upstashToken) {
    console.error("UPSTASH_TOKEN is missing from your environment variables.");
  }

  return upstashUrl !== "" && upstashToken != "";
};

export const redisClient = new Redis({
  url: upstashUrl,
  token: upstashToken,
});

// Create a new ratelimiter, that allows 1 requests per 1 minute
export const ratelimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.fixedWindow(maxRequests, maxRequestsDuration),
});

export const isNotRatelimited = async (request: NextRequest) => {
  if (!enableUpstash) return true;

  // Check if upstash variables are set correctly
  const validUpstash = isValidUpstash();
  if (!validUpstash) return true;

  try {
    const clientIp = getClientIp(request);
    const identifier = clientIp ?? "riad-insta";
    const result = await ratelimit.limit(identifier);
    // Ban user if ratelimit exceeded
    if (!result.success && upstashBanEnabled) {
      // Ban spammer for 24 hours
      await redisClient.setex(
        `ban:${identifier}`,
        upstashBanDuration,
        "banned"
      );
    }
    return result.success;
  } catch (error: any) {
    console.error(error.message);
    return true;
  }
};
