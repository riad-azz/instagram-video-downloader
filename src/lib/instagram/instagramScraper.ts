import { load } from "cheerio";
import { makeHttpRequest, getRandomUserAgent } from "@/utils";
import { BadRequest } from "@/lib/exceptions";
import { enableScraper } from "@/configs/instagram";
import { formatPageJson } from "./helpers";

export const fetchFromPage = async (postUrl: string, timeout: number = 0) => {
  if (!enableScraper) {
    console.log("Instagram Scraper is disabled in @config/instagram");
    return null;
  }

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

  if (!response.data) return null;

  const postHtml = load(response.data);
  const videoElement = postHtml("meta[property='og:video']");

  if (videoElement.length === 0) {
    console.log("Video URL is not public for this post");
    return null;
  }

  const formattedJson = formatPageJson(postHtml);
  return formattedJson;
};
