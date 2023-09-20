import { BadRequest } from "@/lib/exceptions";
import { fetchFromAPI } from "@/lib/instagram/instagramAPI";

// URL for post page with no ld+json included
const postUrl = "https://www.instagram.com/p/CrYKenNJeey";
// Url for post page that does not contain a video
const imagePostUrl = "https://www.instagram.com/p/CpldyYgvdhz";

// Check if the Instagram API is working
describe("success-fetchFromAPI", () => {
  it("should return VideoInfo object", async () => {
    const response = await fetchFromAPI(postUrl);
    expect(response?.videoUrl).toBeDefined();
  });
});

describe("no-video-fetchFromAPI", () => {
  it("should throw BadRequest error", async () => {
    const response = await fetchFromAPI(imagePostUrl);
    expect(response).toBe(null);
  });
});
