import { CheerioAPI } from "cheerio";

import { VideoInfo, VideoVersion } from "@/types";
import { getTimedFilename } from "@/lib/utils";
import { BadRequest, ClientException } from "@/exceptions";
import { InstagramAPIResponse } from "@/types/instagramAPI";

export const validateFormInput = (postUrl: string) => {
  if (!postUrl) {
    throw new ClientException("Instagram URL was not provided");
  }

  if (!postUrl.includes("instagram.com/")) {
    throw new ClientException("Invalid URL does not contain Instagram domain");
  }

  if (!postUrl.startsWith("https://")) {
    throw new ClientException(
      'Invalid URL it should start with "https://www.instagram.com..."'
    );
  }

  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

  if (!postRegex.test(postUrl) && !reelRegex.test(postUrl)) {
    throw new ClientException("URL does not match Instagram post or reel");
  }
};

export const formatGuestJson = (json: InstagramAPIResponse) => {
  const postJson = json.graphql.shortcode_media;

  if (!postJson.is_video) {
    throw new BadRequest("This post does not contain a video", 400);
  }

  const filename = getTimedFilename("instagram-saver", "mp4");

  const videoJson: VideoInfo = {
    filename: filename,
    width: postJson.dimensions.width.toString(),
    height: postJson.dimensions.height.toString(),
    videoUrl: postJson.video_url,
  };

  return videoJson;
};

export const formatUserJson = (htmlString: string) => {
  const videosString = htmlString
    .split("xdt_api__v1__media__shortcode__web_info")[1]
    .split('video_versions":')[1]
    .split(',"is_dash_eligible"')[0];

  if (!videosString) {
    return null;
  }

  const videoVersions: VideoVersion[] = JSON.parse(videosString);

  const videoUrl = videoVersions[0].url?.replace("\\u0025", "%");
  const videoWidth = videoVersions[0].width.toString();
  const videoHeight = videoVersions[0].height.toString();

  if (!videoUrl) {
    return null;
  }

  const filename = getTimedFilename("instagram-saver", "mp4");

  const videoJson: VideoInfo = {
    filename: filename,
    width: videoWidth,
    height: videoHeight,
    videoUrl: videoUrl,
  };

  return videoJson;
};

export const formatPageJson = (postHtml: CheerioAPI) => {
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
