import { BadRequest } from "@/exceptions";

import { fetchFromAPI } from "./instagramAPI";
import { fetchFromPage } from "./instagramScraper";

export const getPostId = (postUrl: string | null) => {
  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;
  let postId;

  if (!postUrl) {
    throw new BadRequest("Instagram URL was not provided");
  }

  const postCheck = postUrl.match(postRegex);
  if (postCheck) {
    postId = postCheck.at(-1);
  }

  const reelCheck = postUrl.match(reelRegex);
  if (reelCheck) {
    postId = reelCheck.at(-1);
  }

  if (!postId) {
    throw new BadRequest("Instagram post/reel ID was not found");
  }

  return postId;
};

export const fetchPostJson = async (postID: string, timeout?: number) => {
  const postUrl = "https://www.instagram.com/p/" + postID;

  const pageJson = await fetchFromPage(postUrl, timeout);
  if (pageJson) return pageJson;

  const apiJson = await fetchFromAPI(postUrl, timeout);
  if (apiJson) return apiJson;

  throw new BadRequest(
    "The video download link for this post is not available.",
    401
  );
};
