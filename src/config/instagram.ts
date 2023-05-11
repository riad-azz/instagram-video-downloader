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
export const instagramDatr = process.env.DATR;
export const instagramIgDid = process.env.IG_DID;
export const instagramMid = process.env.MID;
export const authCookie = `ds_user_id=${userId}; csrftoken=${csrfToken}; sessionid=${sessionId}; datr=${instagramDatr}; ig_did=${instagramIgDid}; mid=${instagramMid}; ig_nrcb=1;`;
