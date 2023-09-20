import { BadRequest, TimeoutException } from "@/lib/exceptions";
import { fetchPostJson } from "@/lib/instagram";
import { getPostId } from "@/lib/instagram/helpers";

// URL for post page with ld+json included
const postUrl = "https://www.instagram.com/p/CGh4a0iASGS";
const postId = "CGh4a0iASGS";

// Check if getPostId function is working
describe("success-getPostId", () => {
  it("should return a postId from the postUrl", () => {
    const testPostId = getPostId(postUrl);
    expect(testPostId).toBe(postId);
  });
});

describe("fail-getPostId", () => {
  it("should throw BadRequest error", () => {
    const invalidPostUrl = "https://www.doesnt-exist.com/p/CrYKenNJeey/";
    expect(() => {
      getPostId(invalidPostUrl);
    }).toThrow(BadRequest);
  });
});

// Check if fetchPostJson function is working
describe("success-fetchPostJson", () => {
  it("should return a VideoInfo object", async () => {
    const response = await fetchPostJson(postId);
    expect(response?.videoUrl).toBeDefined();
  });
});
