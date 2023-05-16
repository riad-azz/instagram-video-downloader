// Upstash configs
export const upstashUrl = process.env.UPSTASH_URL ?? "";
export const upstashToken = process.env.UPSTASH_TOKEN ?? "";
const isUsingUpstash = process.env.USE_UPSTASH ?? "";
export const enableUpstash = isUsingUpstash === "true";
// Ratelimit configs
export const maxRequests = 5; // Max requests per IP
export const maxRequestsDuration = "1 m"; // 5 requests allowed every 1 min
// Ban configs
export const upstashBanEnabled = false; // Ban user by ip in case of spam
export const upstashBanDuration = 86400; // 24 hours;
