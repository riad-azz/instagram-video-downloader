import { CheerioAPI } from "cheerio";

import { VideoInfo } from "@/types";
import { InstagramAPIResponse, VideoVersion } from "@/types/instagramAPI";
import { BadRequest } from "@/lib/exceptions";
import { getTimedFilename } from "@/utils";

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
  const firstPart = htmlString.split(
    "xdt_api__v1__media__shortcode__web_info"
  )[1];
  if (!firstPart) {
    console.log("xdt_api__v1__media__shortcode__web_info not found");
    return null;
  }

  const secondPart = firstPart.split('video_versions":')[1];
  if (!secondPart) {
    console.log("video_versions not found");
    return null;
  }

  const videosString = secondPart.split(',"is_dash_eligible"')[0];
  if (!videosString) {
    console.log("is_dash_eligible not found");
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
