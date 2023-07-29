import { BadRequest, TimeoutException } from "@/exceptions";
import { fetchPostJson, getPostId } from "@/lib/instagram";

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
  it("should return a VideoJson object", async () => {
    const response = await fetchPostJson(postId);
    expect(response?.videoUrl).toBeDefined();
  });
});

describe("timeout-fetchPostJson", () => {
  it("should throw TimeoutException error", async () => {
    try {
      // Set timeout of 1ms to force timeout error
      await fetchPostJson(postId, 1);
    } catch (error) {
      expect(error instanceof TimeoutException).toBe(true);
    }
  });
});
