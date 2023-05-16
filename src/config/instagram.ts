// Scraper vars
export const enableIGScraper = true;
// API vars
export const enableApiGuest = true;
export const enableApiUser = false;
const isUsingSession = process.env.USE_IG_SESSION ?? "";
export const enableIGSession = isUsingSession === "true";
// Login vars
export const userId = process.env.USER_ID ?? "";
export const sessionId = process.env.SESSION_ID ?? "";
export const csrfToken = process.env.CSRF_TOKEN ?? "";
export const authCookie = `ds_user_id=${userId}; sessionid=${sessionId}; csrftoken=${csrfToken};`;
