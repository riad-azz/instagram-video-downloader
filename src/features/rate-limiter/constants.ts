import { Duration } from "@/types";

// Upstash configs
const USE_UPSTASH = process.env.USE_UPSTASH ?? "";
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL ?? "";
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? "";

// Enable/Disable ratelimit
const enabled = USE_UPSTASH === "true";

// Ratelimit configs
const maxRequests = 5; // Max requests every requests window
const requestsWindow: Duration = "1 m"; // 5 requests allowed every 1 min

// Ban configs
const enableBan = true; // Ban user by ip in case of spam
const banDuration = 4 * 60 * 60; // 4 hours;

if (enabled) {
  if (!UPSTASH_URL) {
    throw new Error("Upstash is enabled but UPSTASH_URL is not set");
  }

  if (!UPSTASH_TOKEN) {
    throw new Error("Upstash is enabled but UPSTASH_TOKEN is not set");
  }
}

export const UPSTASH_CONFIGS = {
  enabled,
  url: UPSTASH_URL,
  token: UPSTASH_TOKEN,
  enableBan,
  banDuration,
  maxRequests,
  requestsWindow,
};
