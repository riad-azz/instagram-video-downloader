import axios from "axios";
import { load } from "cheerio";
import { VideoJson } from "@/types";
import { InstagramVideo, InstagramPostJson } from "@/types/instagram";
import { BadRequest, ServerError } from "@/exceptions/instagramExceptions";

export const getVideoJson = (json: InstagramPostJson) => {
  const videoList = json.video;

  if (videoList.length === 0) {
    throw new BadRequest("This post does not contain a video");
  }

  const video: InstagramVideo = videoList[0];

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

export const getDownloadJson = (json: InstagramPostJson) => {
  const videoList = json.video;

  if (videoList.length === 0) {
    throw new BadRequest("This post does not contain a video");
  }

  const postId = json.identifier.value;
  const username = json.author.identifier.value;
  const filename = `${username}-instagram-${postId}.mp4`;

  const video = videoList[0];
  const downloadUrl = video.contentUrl;

  const downloadJson = {
    filename: filename,
    downloadUrl: downloadUrl,
  };

  return downloadJson;
};

export const fetchPostJson = async (postID: string) => {
  const postUrl = "https://www.instagram.com/p/" + postID;
  const response = await axios.get(postUrl);
  if (response.statusText !== "OK") {
    throw new ServerError(`Could not reach post, please try again.`);
  }

  const $ = load(response.data);
  const jsonElement = $("script[type='application/ld+json']");

  if (jsonElement.length === 0) {
    throw new ServerError(
      `Could not find video JSON, download request was aborted.`
    );
  }

  const jsonText: string = jsonElement.text();
  const json: InstagramPostJson = JSON.parse(jsonText);
  return json;
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
