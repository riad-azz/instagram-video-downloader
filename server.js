const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const path = require("path");

const app = express();
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api", async (req, res) => {
  const postID = req.query.id;
  if (!postID) {
    res.send({ error: "Please provide a instagram post ID" });
    return;
  }

  try {
    const instaPostURL = "https://www.instagram.com/p/" + postID;
    const response = await axios.get(instaPostURL);
    const myDocument = cheerio.load(response.data);
    const dataText = myDocument("script[type='application/ld+json']").text();
    const dataJson = JSON.parse(dataText);

    const videoUrl = dataJson.video[0].contentUrl;
    const result = {
      id: postID,
      url: videoUrl,
    };
    res.status(200).send(result);
  } catch (error) {
    res.send({
      error: "Something went wrong. Make sure the post ID is correct.",
    });
  }
});

app.listen(3000);
