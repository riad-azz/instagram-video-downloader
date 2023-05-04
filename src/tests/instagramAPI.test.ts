import { BadRequest } from "@/exceptions";
import { fetchAsUser, fetchFromAPI } from "@/lib/instagram/instagramAPI";

// URL for post page with no ld+json included
const postUrl = "https://www.instagram.com/p/CrYKenNJeey";
// Url for post page that does not contain a video
const imagePostUrl = "https://www.instagram.com/p/CpldyYgvdhz";

// Check if the environment variables are defined
describe("valid-environment-variables", () => {
  it("should have a use session variable", () => {
    expect(process.env.USE_IG_SESSION).toBeDefined();
  });

  it("should have a user id variable", () => {
    expect(process.env.USER_ID).toBeDefined();
  });

  it("should have a session id variable", () => {
    expect(process.env.SESSION_ID).toBeDefined();
  });

  it("should have a csrf token variable", () => {
    expect(process.env.CSRF_TOKEN).toBeDefined();
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
      BadRequest
    );
  });
});
