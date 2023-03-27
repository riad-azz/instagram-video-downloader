const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();

app.use("/api", async (req, res) => {
  const url = req.query.url;
  if (url === "" || !url) {
    res.send({ error: "url was not provided" });
    return;
  }
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const dataText = $("script[type='application/ld+json']").text();
    const dataJson = JSON.parse(dataText);
    const videoUrl = dataJson.video[0].contentUrl;
    const result = {
      videoUrl: videoUrl,
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use("/", async (req, res) => {
  res.send("Hello there friend !!");
});

app.listen(3000);
