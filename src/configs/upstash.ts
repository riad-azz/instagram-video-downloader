// Upstash configs
export const upstashUrl = process.env.UPSTASH_REDIS_REST_URL ?? "";
export const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
const isUsingUpstash = process.env.USE_UPSTASH ?? "";
export const enableUpstash = isUsingUpstash === "true";
// Ratelimit configs
export const maxRequests = 5; // Max requests every requests window
export const requestsWindow = "1 m"; // 5 requests allowed every 1 min
// Ban configs
export const upstashBanEnabled = true; // Ban user by ip in case of spam
export const upstashBanDuration = 14400; // 4 hours;
