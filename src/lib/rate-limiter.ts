import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const upstashUrl = process.env.UPSTASH_URL ?? "";
const upstashToken = process.env.UPSTASH_TOKEN ?? "";
const redis = new Redis({
  url: upstashUrl,
  token: upstashToken,
});

// Create a new ratelimiter, that allows 1 requests per 1 minute
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(1, `1 m`),
});
