import { CheerioAPI, load } from "cheerio";

import { VideoInfo } from "@/types";

import {
  makeHttpRequest,
  getInstagramHeaders,
  getTimedFilename,
} from "@/lib/utils";
import { BadRequest } from "@/exceptions";
import { enableScraper } from "@/configs/instagram";

const formatPageJson = (postHtml: CheerioAPI) => {
  const videoElement = postHtml("meta[property='og:video']");

  if (videoElement.length === 0) {
    return null;
  }

  const videoUrl = videoElement.attr("content");

  if (!videoUrl) {
    throw new BadRequest("This post video URL is not public");
  }

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

export const fetchFromPage = async (postUrl: string, timeout: number = 0) => {
  const headers = getInstagramHeaders();

  if (!enableScraper) {
    console.log("Instagram Scraper is disabled in @config/instagram");
    return null;
  }

  const response = await makeHttpRequest<string>({
    url: postUrl,
    method: "GET",
    headers,
    timeout,
  });

  if (response.status === "error") {
    console.log(response.message);
    if (response.message.includes("status code 404")) {
      throw new BadRequest(
        "This post does not exist, make sure the URL is correct"
      );
    }
    return null;
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
