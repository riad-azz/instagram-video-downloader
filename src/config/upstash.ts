export const upstashUrl = process.env.UPSTASH_URL ?? "";
export const upstashToken = process.env.UPSTASH_TOKEN ?? "";
export const enableUpstash =
  process.env.USE_UPSTASH === "true" && upstashUrl !== "" && upstashToken != "";
