import { BadRequest } from "@/lib/exceptions";

import { fetchFromAPI } from "./instagramAPI";
import { fetchFromPage } from "./instagramScraper";

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
