// Instagram Configurations
export const enableScraper = true;
export const enableGuestApi = true;
// Instagram API
export const instagramCookie = process.env.INSTAGRAM_COOKIE ?? "";
export const enableUserApi = !!instagramCookie && true;

// API endpoints
export const enableServerAPI = false;
