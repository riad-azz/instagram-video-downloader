// Scraper vars
export const useIGScraper = true;
// API vars
export const useApiGuest = true;
export const useApiUser = true;
export const useIGSession = process.env.USE_IG_SESSION === "true";
// Login vars
export const userId = process.env.USER_ID;
export const sessionId = process.env.SESSION_ID;
export const csrfToken = process.env.CSRF_TOKEN;
export const authCookie = `ds_user_id=${userId}; csrftoken=${csrfToken}; sessionid=${sessionId};`;
