/**
 * @jest-environment node
 */

import { fetchFromPage } from "@/lib/instagram/instagramScraper";

// Url for post page with ld+json include
const postUrl = "https://www.instagram.com/p/CGh4a0iASGS";

// Check if the page json scraper is working
describe("fetchFromPage", () => {
  it("should return an object", async () => {
    const response = await fetchFromPage(postUrl);
    expect(typeof response).toBe("object");
  });
});
