const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const path = require("path");

const formatVideo = (videoObj) => {
  return {
    caption: videoObj.caption,
    description: videoObj.description,
    thumbnail: videoObj.thumbnailUrl,
    url: videoObj.contentUrl,
  };
};

const formatVideoList = (videoList) => {
  let formattedVideoList = [];
  for (video of videoList) {
    let videoObj = formatVideo(video);
    formattedVideoList.push(videoObj);
  }
  return formattedVideoList;
};

const app = express();
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api", async (req, res) => {
  const postID = req.query.id;
  const allVideos = req.query.all === "true";

  if (!postID) {
    res.send({ error: "Please provide an instagram post ID" });
    return;
  }

  try {
    const instaPostUrl = "https://www.instagram.com/p/" + postID;
    const response = await axios.get(instaPostUrl);
    const $ = cheerio.load(response.data);
    const dataText = $("script[type='application/ld+json']").text();
    const dataJson = JSON.parse(dataText);

    const username = dataJson.author.identifier.value;
    const createdDate = dataJson.dateCreated;
    const postInfo = {
      id: postID,
      username: username,
      createdDate: createdDate,
    };

    if (!allVideos) {
      const firstVideo = dataJson.video[0];
      const video = formatVideo(firstVideo);
      const result = Object.assign(postInfo, video);
      res.status(200).send(result);
    } else {
      const videoList = dataJson.video;
      const videos = formatVideoList(videoList);
      const result = Object.assign(postInfo, { videos: videos });
      res.status(200).send(result);
    }
  } catch (error) {
    res.send({
      error: "Something went wrong. Make sure the post ID is correct.",
    });
  }
});

app.listen(3000);
