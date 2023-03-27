const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const path = require("path");

const app = express();

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use("/api", async (req, res) => {
  const url = req.query.url;
  if (url === "" || !url) {
    res.send({ error: "Please provide a instagram video url" });
    return;
  } else if (!url.includes("instagram.com")) {
    res.send({ error: "Invalid url. This works only for instagram videos" });
    return;
  }
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const dataText = $("script[type='application/ld+json']").text();
    const dataJson = JSON.parse(dataText);

    const name = dataJson.identifier.value;
    const videoUrl = dataJson.video[0].contentUrl;
    const result = {
      name: name,
      url: videoUrl,
    };
    res.status(200).send(result);
  } catch (error) {
    res.send({
      error: "Something went wrong. Make sure the video url is correct.",
    });
  }
});

app.listen(3000);
