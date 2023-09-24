import { load } from "cheerio";
import { CheerioAPI } from "cheerio";

import { VideoInfo } from "@/types";

import { BadRequest } from "@/lib/exceptions";
import { enableWebpage } from "@/configs/instagram";

import { getTimedFilename } from "@/utils";
import { makeHttpRequest, getRandomUserAgent } from "@/utils";

import { handleScraperError } from "./helpers";

export const formatPageJson = (postHtml: CheerioAPI) => {
  const videoElement = postHtml("meta[property='og:video']");
  if (videoElement.length === 0) return null;

  const videoUrl = videoElement.attr("content");
  if (!videoUrl) return null;

  const width = postHtml("meta[property='og:video:width']").attr("content");
  const height = postHtml("meta[property='og:video:height']").attr("content");

  const filename = getTimedFilename("instagram-saver", "mp4");

  const videoJson: VideoInfo = {
    filename: filename,
    width: width ?? "",
    height: height ?? "",
    videoUrl: videoUrl,
  };

  return videoJson;
};

export const fetchFromPage = async (postId: string, timeout: number = 0) => {
  if (!enableWebpage) {
    console.log("Instagram Webpage Scraper is disabled in @config/instagram");
    return null;
  }

  const postUrl = "https://www.instagram.com/p/" + postId;

  const headers = {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    host: "www.instagram.com",
    referer: "https://www.instagram.com/",
    DNT: "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": getRandomUserAgent(),
  };

  let response;
  try {
    response = await makeHttpRequest({
      url: postUrl,
      method: "GET",
      headers,
      timeout,
    });
  } catch (e: any) {
    handleScraperError(e);
    return null;
  }

  if (response.statusText === "error") {
    return null;
  }

  if (!response.data) return null;

  if (!response.data.includes("instapp:owner_user_id")) {
    throw new BadRequest("This post is private or does not exist");
  }

  const postHtml = load(response.data);
  const videoElement = postHtml("meta[property='og:video']");

  if (videoElement.length === 0) {
    console.log("Video URL is not public for this post");
    return null;
  }

  const formattedJson = formatPageJson(postHtml);
  return formattedJson;
};
