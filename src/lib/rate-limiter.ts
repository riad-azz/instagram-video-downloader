import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const upstashUrl = process.env.UPSTASH_URL ?? "";
const upstashToken = process.env.UPSTASH_TOKEN ?? "";
export const redisClient = new Redis({
  url: upstashUrl,
  token: upstashToken,
});

// Create a new ratelimiter, that allows 1 requests per 1 minute
export const ratelimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.fixedWindow(5, `1 m`),
});
