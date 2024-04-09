import { UPSTASH_CONFIGS } from "./constants";
import { ratelimit, redisClient } from "./client";

export const isRatelimited = async (identifier: string) => {
  if (!UPSTASH_CONFIGS.enabled) return false;

  try {
    // Check if ratelimit is successful
    const result = await ratelimit.limit(identifier);
    if (result.success) return false;

    // Ban user if ratelimit exceeded
    if (UPSTASH_CONFIGS.enableBan) {
      await redisClient.setex(
        `ban:${identifier}`,
        UPSTASH_CONFIGS.banDuration,
        "banned"
      );
    }

    return true;
  } catch (error: any) {
    // If an error occurs abort ratelimit
    console.error(error.message);
    return false;
  }
};
