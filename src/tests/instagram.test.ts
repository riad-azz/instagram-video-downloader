import { IGBadRequest, IGTimeout } from "@/exceptions/instagramExceptions";
import { pageExist, fetchPostJson, getPostId } from "@/lib/instagram";

// URL for post page with no ld+json included
const postUrl = "https://www.instagram.com/p/CrYKenNJeey";
const postId = "CrYKenNJeey";

// Check if pageExist function is working
describe("success-pageExist", () => {
  it("should return true if the post exists", async () => {
    const apiUrl = postUrl + "/?__a=1&__d=dis";
    const result = await pageExist({ postUrl: apiUrl });
    expect(result).toBe(true);
  });
});

describe("fail-pageExist", () => {
  it("should throw IGBadRequest error", async () => {
    const apiUrl = postUrl + "this-post-doesnt-exist" + "/?__a=1&__d=dis";
    try {
      await pageExist({ postUrl: apiUrl });
    } catch (error) {
      expect(error instanceof IGBadRequest).toBe(true);
    }
  });
});

// Check if getPostId function is working
describe("success-getPostId", () => {
  it("should return a postId from the postUrl", () => {
    const testPostId = getPostId(postUrl);
    expect(testPostId).toBe(postId);
  });
});

describe("fail-getPostId", () => {
  it("should throw IGBadRequest error", () => {
    const invalidPostUrl = "https://www.doesnt-exist.com/p/CrYKenNJeey/";
    expect(() => {
      getPostId(invalidPostUrl);
    }).toThrow(IGBadRequest);
  });
});

// Check if fetchPostJson function is working
describe("success-fetchPostJson", () => {
  it("should return a VideoJson object", async () => {
    const response = await fetchPostJson(postId);
    expect(response.username).toBeDefined();
  }, 15000); // 15 seconds timeout because it can make up to 4 fetch requests
});

describe("timeout-fetchPostJson", () => {
  it("should throw IGTimeout error", async () => {
    try {
      // Set timeout of 1ms to force timeout error
      await fetchPostJson(postId, 1);
    } catch (error) {
      expect(error instanceof IGTimeout).toBe(true);
    }
  });
});
