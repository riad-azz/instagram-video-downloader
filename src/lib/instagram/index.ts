import { VideoJson, DownloadJson, IFetchPostFunction } from "@/types";

import { axiosFetch, getRandomUserAgent } from "@/lib/helpers";
import { IGBadRequest, IGServerError } from "@/exceptions/instagramExceptions";

import { fetchFromPage } from "./instagramScraper";
import { useInstagramAPI, fetchFromAPI } from "./instagramAPI";

export const formatDownloadJson = (postId: string, json: VideoJson) => {
  const username = json.username;
  const filename = `${username}-instagram-${postId}.mp4`;
  const downloadUrl = json.downloadUrl;

  const downloadJson: DownloadJson = {
    filename: filename,
    downloadUrl: downloadUrl,
  };

  return downloadJson;
};

export const getPostId = (postUrl: string | null) => {
  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;
  let postId;

  if (!postUrl) {
    throw new IGBadRequest("Instagram URL was not provided");
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
    throw new IGBadRequest("Instagram post/reel ID was not found");
  }

  return postId;
};

export const pageExist = async ({ postUrl, timeout }: IFetchPostFunction) => {
  const headers = {
    "User-Agent": getRandomUserAgent(),
  };

  const apiUrl = postUrl + "/?__a=1&__d=dis";
  try {
    const response = await axiosFetch({
      url: apiUrl,
      method: "HEAD",
      throwError: true,
      headers,
      timeout,
    });
  } catch (error: any) {
    if (error.message.includes("404")) {
      return false;
    }
  }

  return true;
};

export const fetchPostJson = async (postID: string, timeout?: number) => {
  const postUrl = "https://www.instagram.com/p/" + postID;

  const isPageExist = await pageExist({ postUrl, timeout });
  if (!isPageExist) {
    throw new IGBadRequest("This post page isn't available.", 404);
  }

  const pageJson = await fetchFromPage({ postUrl, timeout });
  if (pageJson) return pageJson;

  if (useInstagramAPI) {
    const apiJson = await fetchFromAPI({ postUrl, timeout });
    if (apiJson) return apiJson;
  }

  throw new IGServerError("Could not find download link for this post", 500);
};
