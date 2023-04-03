import axios from "axios";
import { load } from "cheerio";

export const formatVideoInfo = (videoObj) => {
  const height = videoObj.height;
  const width = videoObj.width;
  const resolution = `${width}x${height}`;
  const formattedInfo = {
    caption: videoObj.caption,
    description: videoObj.description,
    resolution: resolution,
    uploadDate: videoObj.uploadDate,
    thumbnail: videoObj.thumbnailUrl,
    url: videoObj.contentUrl,
  };

  return formattedInfo;
};

export const formatResponse = (postID, json) => {
  const username = json.author.identifier.value;
  const videoList = json.video;
  const formattedVideoList = [];

  if (videoList.length === 0) {
    throw Error("This post does not have any videos");
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

export const fetchPostJson = async (postID) => {
  const instaPostUrl = "https://www.instagram.com/p/" + postID;
  const response = await axios.get(instaPostUrl);
  const $ = load(response.data);
  const jsonElement = $("script[type='application/ld+json']");
  if (jsonElement.length === 0) {
    throw Error(`This post does not exist or is private`);
  }
  const jsonText = jsonElement.text();
  const json = JSON.parse(jsonText);
  return json;
};
