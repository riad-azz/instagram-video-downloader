import { VideoJson, DownloadJson, IFetchPostFunction } from "@/types";

import { axiosFetch, getRandomUserAgent } from "@/lib/helpers";
import { BadRequest } from "@/exceptions";

import { fetchFromAPI } from "./instagramAPI";
import { fetchFromPage } from "./instagramScraper";
import { enableApiUser, enableIGSession } from "@/configs/instagram";

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

export const pageExist = async ({ postUrl, timeout }: IFetchPostFunction) => {
  const headers = {
    "User-Agent": getRandomUserAgent(),
  };

  const apiUrl = postUrl + "/?__a=1&__d=dis";
  try {
    await axiosFetch({
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
    throw new BadRequest("This post page isn't available.", 404);
  }

  const pageJson = await fetchFromPage({ postUrl, timeout });
  if (pageJson) return pageJson;

  const apiJson = await fetchFromAPI({ postUrl, timeout });
  if (apiJson) return apiJson;

  if (enableIGSession && enableApiUser) {
    console.error("Instagram session might have been expired.");
  }

  throw new BadRequest(
    "The video download link for this post is not available.",
    401
  );
};
