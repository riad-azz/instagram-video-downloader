import { Router } from "express";
const cheerio = require("cheerio");
const axios = require("axios");

const router = Router();

const formatVideo = (videoObj) => {
  return {
    caption: videoObj.caption,
    description: videoObj.description,
    thumbnail: videoObj.thumbnailUrl,
    url: videoObj.contentUrl,
  };
};

const formatResponse = (json) => {
  const username = json.author.identifier.value;
  const createdDate = json.dateCreated;
  const formattedVideoList = [];
  for (video of videoList) {
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
  const $ = cheerio.load(response.data);
  const dataText = $("script[type='application/ld+json']").text();
  const json = JSON.parse(dataText);
  return json;
};

router.get("/api", async (req, res, next) => {
  const postID = req.query.id;

  if (!postID) {
    const error = new Error("Please provide an instagram post ID");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const json = fetchPostJson(postID);
    const response = formatResponse(json);
    return res.status.json(response);
  } catch (error) {
    return next(error);
  }
});
