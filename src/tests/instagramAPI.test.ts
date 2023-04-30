/**
 * @jest-environment node
 */
import { fetchFromAPI } from "@/lib/instagram/instagramAPI";

// url for post page with no ld+json included
const postUrl = "https://www.instagram.com/p/CrYKenNJeey";

// Check if the environment variables are defined
describe("env", () => {
  it("should have a use instagram API variable", () => {
    expect(process.env.USE_INSTAGRAM_API).toBeDefined();
  });

  it("should have a session id variable", () => {
    expect(process.env.INSTAGRAM_SESSION_ID).toBeDefined();
  });
});

// Check if the Instagram API is working
describe("fetchFromAPI", () => {
  it("should return an object", async () => {
    const response = await fetchFromAPI(postUrl);
    expect(typeof response).toBe("object");
  });
});
