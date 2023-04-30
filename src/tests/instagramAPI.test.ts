import { IGBadRequest } from "@/exceptions/instagramExceptions";
import { fetchAsUser, fetchFromAPI } from "@/lib/instagram/instagramAPI";

// URL for post page with no ld+json included
const postUrl = "https://www.instagram.com/p/CrYKenNJeey";
// Url for post page that does not contain a video
const imagePostUrl = "https://www.instagram.com/p/CpldyYgvdhz";

// Check if the environment variables are defined
describe("valid-environment-variables", () => {
  it("should have a use session variable", () => {
    expect(process.env.USE_SESSION).toBeDefined();
  });

  it("should have a session id variable", () => {
    expect(process.env.INSTAGRAM_SESSION_ID).toBeDefined();
  });
});

// Check if Instagram session expired
describe("expired-session-fetchAsUser", () => {
  it("should return null if session expired", async () => {
    // Store session id temporarily
    const tempSessionId = process.env.INSTAGRAM_SESSION_ID;
    // Invalidate session id to force server error
    process.env.INSTAGRAM_SESSION_ID = "";
    const response = await fetchAsUser({ postUrl });
    expect(response).toBeNull();
    // Restore session id
    process.env.INSTAGRAM_SESSION_ID = tempSessionId;
  });
});

// Check if the Instagram API is working
describe("success-fetchFromAPI", () => {
  it("should return VideoJson object", async () => {
    const response = await fetchFromAPI({ postUrl });
    expect(response).not.toBeNull();
  });
});

describe("no-video-fetchFromAPI", () => {
  it("should throw IGBadRequest error", async () => {
    await expect(fetchFromAPI({ postUrl: imagePostUrl })).rejects.toThrow(
      IGBadRequest
    );
  });
});
