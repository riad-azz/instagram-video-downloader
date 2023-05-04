import { load } from "cheerio";

import { IFetchPostFunction, VideoJson } from "@/types";
import { ScrapedPost, PostJsonVideo } from "@/types/instagramScraper";

import { axiosFetch, getRandomUserAgent } from "@/lib/helpers";
import { BadRequest } from "@/exceptions";
import { useIGScraper } from "@/config/instagram";

const formatPageJson = (json: ScrapedPost) => {
  const videoList = json.video;

  if (videoList.length === 0) {
    throw new BadRequest("This post does not contain a video");
  }

  const video: PostJsonVideo = videoList[0];

  const videoJson: VideoJson = {
    username: json.author.identifier.value,
    width: video.width,
    height: video.height,
    caption: video.caption,
    downloadUrl: video.contentUrl,
    thumbnailUrl: video.thumbnailUrl,
  };

  return videoJson;
};

export const fetchFromPage = async ({
  postUrl,
  timeout,
}: IFetchPostFunction) => {
  const headers = {
    "User-Agent": getRandomUserAgent(),
  };

  if (!useIGScraper) {
    console.log("Instagram Scraper is disabled in @config/instagram");
    return null;
  }

  const response = await axiosFetch({ url: postUrl, headers, timeout });
  if (!response) {
    return null;
  }

  if (response.statusText !== "OK") {
    return null;
  }

  const $ = load(response.data);
  const jsonElement = $("script[type='application/ld+json']");

  if (jsonElement.length === 0) {
    return null;
  }

  const jsonText: string = jsonElement.text();
  const json: ScrapedPost = JSON.parse(jsonText);
  const formattedJson = formatPageJson(json);
  return formattedJson;
};
