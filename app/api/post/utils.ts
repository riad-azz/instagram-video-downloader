import axios from "axios";
import { load } from "cheerio";

export const formatVideoInfo = (videoObj: any) => {
  const formattedInfo = {
    width: videoObj.width,
    height: videoObj.height,
    caption: videoObj.caption,
    description: videoObj.description,
    uploadDate: videoObj.uploadDate,
    url: videoObj.contentUrl,
    thumbnail: videoObj.thumbnailUrl,
  };

  return formattedInfo;
};

export const formatResponse = (postID: string, json: any) => {
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

export const fetchPostJson = async (postID: string) => {
  const postUrl = "https://www.instagram.com/p/" + postID;
  const response = await axios.get(postUrl);
  const $ = load(response.data);
  const jsonElement = $("script[type='application/ld+json']");
  if (jsonElement.length === 0) {
    throw Error(`This post does not exist or is private`);
  }
  const jsonText = jsonElement.text();
  const json = JSON.parse(jsonText);
  return json;
};

export const getPostID = (postUrl: string) => {
  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?$/;

  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reel\/([a-zA-Z0-9_-]+)\/?$/;

  console.log(postRegex.test(postUrl));
  console.log(reelRegex.test(postUrl));
  if (!postRegex.test(postUrl) && !reelRegex.test(postUrl)) {
    const error = new Error("URL does not match Instagram post or reel");
    throw error;
  }

  const postID = postUrl.split("/").at(4);
  if (!postID) {
    const error = new Error("Instagram post ID was not found");
    throw error;
  }

  console.log(postID);

  return postID;
};
