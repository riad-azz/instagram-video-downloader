import { BadRequest } from "@/exceptions";
import { fetchFromPage } from "@/lib/instagram/instagramScraper";

// Url for post page with ld+json include
const postUrl = "https://www.instagram.com/p/CGh4a0iASGS";
// Url for post page that does not contain a video
const imagePostUrl = "https://www.instagram.com/p/CpldyYgvdhz";

// Check if the page json scraper is working
describe("success-fetchFromPage", () => {
  it("should return a VideoJson object", async () => {
    const response = await fetchFromPage({ postUrl });
    expect(response?.username).toBeDefined();
  });
});

describe("no-video-fetchFromPage", () => {
  it("should throw IGBadRequest error", async () => {
    try {
      await fetchFromPage({ postUrl: imagePostUrl });
    } catch (error) {
      expect(error instanceof BadRequest).toBe(true);
    }
  });
});
