import { enableIGSession } from "@/configs/instagram";
import { BadRequest, TimeoutException } from "@/exceptions";
import { pageExist, fetchPostJson, getPostId } from "@/lib/instagram";
import { isValidSession } from "@/lib/instagram/instagramAPI";

// URL for post page with ld+json included
const postUrl = "https://www.instagram.com/p/CGh4a0iASGS";
const postId = "CGh4a0iASGS";

// Check if pageExist function is working
describe("success-pageExist", () => {
  it("should return true if the post exists", async () => {
    const apiUrl = postUrl + "/?__a=1&__d=dis";
    const result = await pageExist({ postUrl: apiUrl });
    expect(result).toBe(true);
  });
});

describe("fail-pageExist", () => {
  it("should throw BadRequest error", async () => {
    const apiUrl = postUrl + "this-post-doesnt-exist" + "/?__a=1&__d=dis";
    try {
      await pageExist({ postUrl: apiUrl });
    } catch (error) {
      expect(error instanceof BadRequest).toBe(true);
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
    expect(response?.username).toBeDefined();
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

// Check if session variables are correct if its enabled
if (enableIGSession) {
  describe("valid-session-variables", () => {
    it("should return a VideoJson object", async () => {
      const validSession = isValidSession();
      expect(validSession).toBe(true);
    });
  });
}
