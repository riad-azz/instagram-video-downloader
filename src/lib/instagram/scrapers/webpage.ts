import { load } from "cheerio";
import { CheerioAPI } from "cheerio";

import { VideoInfo } from "@/types";

import { BadRequest } from "@/lib/exceptions";
import { enableWebpage } from "@/configs/instagram";

import { makeHttpRequest } from "@/utils";
import { handleScraperError, getIGVideoFileName } from "./helpers";

export const formatPageJson = (postHtml: CheerioAPI) => {
  const videoElement = postHtml("meta[property='og:video']");

  if (videoElement.length === 0) {
    return null;
  }

  const videoUrl = videoElement.attr("content");
  if (!videoUrl) return null;

  const width = postHtml("meta[property='og:video:width']").attr("content");
  const height = postHtml("meta[property='og:video:height']").attr("content");

  const filename = getIGVideoFileName();

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
    accept: "*/*",
    host: "www.instagram.com",
    referer: "https://www.instagram.com/",
    DNT: "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
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

  const postHtml = load(response.data);
  const videoElement = postHtml("meta[property='og:video']");

  if (videoElement.length === 0) {
    return null;
  }

  const formattedJson = formatPageJson(postHtml);
  return formattedJson;
};
