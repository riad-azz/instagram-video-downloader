import axios from "axios";
import { load } from "cheerio";
import { InstagramVideo, VideoObject, InstagramPostJson } from "@/types";

export const formatVideoInfo = ({
  width,
  height,
  caption,
  description,
  uploadDate,
  contentUrl,
  thumbnailUrl,
}: InstagramVideo) => {
  const formattedVideoInfo: VideoObject = {
    width: width,
    height: height,
    caption: caption,
    description: description,
    uploadDate: uploadDate,
    url: contentUrl,
    thumbnail: thumbnailUrl,
  };

  return formattedVideoInfo;
};

export const formatResponse = (postID: string, json: InstagramPostJson) => {
  const username = json.author.identifier.value;
  const videoList = json.video;

  const formattedVideoList: VideoObject[] = [];

  if (videoList.length === 0) {
    throw Error("This post does not contain any videos");
  }

  for (let video of videoList) {
    let videoObj = formatVideoInfo(video);
    formattedVideoList.push(videoObj);
  }

  const result = {
    id: postID,
    username: username,
    videos: formattedVideoList,
  };

  return result;
};

export const formatDownloadVideo = (
  postID: string,
  json: InstagramPostJson
) => {
  const videoList = json.video;

  if (videoList.length === 0) {
    throw Error("This post does not contain any videos");
  }

  const username = json.author.identifier.value;
  const filename = `${username}_instagram_${postID}.mp4`;

  const video = videoList[0];
  const downloadUrl = video.contentUrl;

  const result = {
    filename: filename,
    downloadUrl: downloadUrl,
  };

  return result;
};

export const fetchPostJson = async (postID: string) => {
  const postUrl = "https://www.instagram.com/p/" + postID;
  const response = await axios.get(postUrl);
  const $ = load(response.data);
  const jsonElement = $("script[type='application/ld+json']");
  if (jsonElement.length === 0) {
    throw Error(`Could not reach post, please try again.`);
  }
  const jsonText: string = jsonElement.text();
  const json: InstagramPostJson = JSON.parse(jsonText);
  return json;
};

export const getPostId = (postUrl: string) => {
  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;
  let postId;

  const postCheck = postUrl.match(postRegex);
  if (postCheck) {
    postId = postCheck.at(-1);
  }

  const reelCheck = postUrl.match(reelRegex);
  if (reelCheck) {
    postId = reelCheck.at(-1);
  }

  if (!postId) {
    const error = new Error("Instagram post/reel ID was not found");
    throw error;
  }

  return postId;
};
