import axios from "axios";
import { load } from "cheerio";

import { VideoJson } from "@/types";
import { ScrapedPost, PostJsonVideo } from "@/types/instagramScraper";
import { IGBadRequest } from "@/exceptions/instagramExceptions";

const formatPageJson = (json: ScrapedPost) => {
  const videoList = json.video;

  if (videoList.length === 0) {
    throw new IGBadRequest("This post does not contain a video");
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

export const fetchFromPage = async (postUrl: string) => {
  let response;
  try {
    response = await axios.get(postUrl);
  } catch (error: any) {
    if (error.message.includes("404")) {
      throw new IGBadRequest("This post page isn't available.", 404);
    }
    console.error(error.message);
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

  try {
    const jsonText: string = jsonElement.text();
    const json: ScrapedPost = JSON.parse(jsonText);
    const formattedJson = formatPageJson(json);
    return formattedJson;
  } catch (e) {
    console.error(e);
    return null;
  }
};
