import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

import { UPSTASH_CONFIGS } from "./constants";

export const redisClient = new Redis({
  url: UPSTASH_CONFIGS.url,
  token: UPSTASH_CONFIGS.token,
});

export const ratelimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(
    UPSTASH_CONFIGS.maxRequests,
    UPSTASH_CONFIGS.requestsWindow
  ),
});
