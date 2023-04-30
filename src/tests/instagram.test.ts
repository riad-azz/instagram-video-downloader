/**
 * @jest-environment node
 */
import { IGBadRequest } from "@/exceptions/instagramExceptions";
import { pageExist, fetchPostJson } from "@/lib/instagram";

// URL for post page with no ld+json included
const postUrl = "https://www.instagram.com/p/CrYKenNJeey";
const postId = "CrYKenNJeey";

// Check if pageExist function is working
describe("valid pageExist", () => {
  it("should throw a bad request error", async () => {
    const apiUrl = postUrl + "/?__a=1&__d=dis";
    const result = await pageExist(apiUrl);
    expect(result).toBe(true);
  });
});

describe("invalid pageExist", () => {
  it("should throw a bad request error", async () => {
    const apiUrl = postUrl + "this-post-doesnt-exist" + "/?__a=1&__d=dis";
    try {
      const result = await pageExist(apiUrl);
    } catch (error) {
      expect(error instanceof IGBadRequest).toBe(true);
    }
  });
});

// Check if fetchPostJson function is working
describe("fetchPostJson", () => {
  it("should return an object", async () => {
    const response = await fetchPostJson(postId);
    expect(typeof response).toBe("object");
  });
});
