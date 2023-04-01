import axios from "axios";
import { load } from "cheerio";
import { Router } from "express";

const router = Router();

const formatVideo = (videoObj) => {
  return {
    caption: videoObj.caption,
    description: videoObj.description,
    thumbnail: videoObj.thumbnailUrl,
    url: videoObj.contentUrl,
  };
};

const formatResponse = (postID, json) => {
  const username = json.author.identifier.value;
  const createdDate = json.dateCreated;
  const videoList = json.video;
  const formattedVideoList = [];
  for (let video of videoList) {
    let videoObj = formatVideo(video);
    formattedVideoList.push(videoObj);
  }

  const result = {
    id: postID,
    username: username,
    createdDate: createdDate,
    videos: formattedVideoList,
  };

  return result;
};

const fetchPostJson = async (postID) => {
  const instaPostUrl = "https://www.instagram.com/p/" + postID;
  const response = await axios.get(instaPostUrl);
  const $ = load(response.data);
  const dataText = $("script[type='application/ld+json']").text();
  const json = JSON.parse(dataText);
  return json;
};

router.get("/", async (req, res, next) => {
  const postID = req.query.id;
  if (!postID) {
    const error = new Error("Please provide an instagram post ID");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const json = await fetchPostJson(postID);
    const response = formatResponse(postID, json);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
});

export default router;
