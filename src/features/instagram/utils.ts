import { CheerioAPI } from "cheerio";
import querystring from "querystring";

import { getTimedFilename } from "@/lib/utils";

import { VideoInfo } from "@/types";
import { MediaData } from "./types";

export const getIGVideoFileName = () =>
  getTimedFilename("ig-downloader", "mp4");

export const getPostIdFromUrl = (postUrl: string) => {
  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

  return postUrl.match(postRegex)?.at(-1) || postUrl.match(reelRegex)?.at(-1);
};

export const encodeGraphqlRequestData = (shortcode: string) => {
  const requestData = {
    av: "0",
    __d: "www",
    __user: "0",
    __a: "1",
    __req: "3",
    __hs: "19624.HYP:instagram_web_pkg.2.1..0.0",
    dpr: "3",
    __ccg: "UNKNOWN",
    __rev: "1008824440",
    __s: "xf44ne:zhh75g:xr51e7",
    __hsi: "7282217488877343271",
    __dyn:
      "7xeUmwlEnwn8K2WnFw9-2i5U4e0yoW3q32360CEbo1nEhw2nVE4W0om78b87C0yE5ufz81s8hwGwQwoEcE7O2l0Fwqo31w9a9x-0z8-U2zxe2GewGwso88cobEaU2eUlwhEe87q7-0iK2S3qazo7u1xwIw8O321LwTwKG1pg661pwr86C1mwraCg",
    __csr:
      "gZ3yFmJkillQvV6ybimnG8AmhqujGbLADgjyEOWz49z9XDlAXBJpC7Wy-vQTSvUGWGh5u8KibG44dBiigrgjDxGjU0150Q0848azk48N09C02IR0go4SaR70r8owyg9pU0V23hwiA0LQczA48S0f-x-27o05NG0fkw",
    __comet_req: "7",
    lsd: "AVqbxe3J_YA",
    jazoest: "2957",
    __spin_r: "1008824440",
    __spin_b: "trunk",
    __spin_t: "1695523385",
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "PolarisPostActionLoadPostQueryQuery",
    variables: JSON.stringify({
      shortcode: shortcode,
      fetch_comment_count: "null",
      fetch_related_profile_media_count: "null",
      parent_comment_count: "null",
      child_comment_count: "null",
      fetch_like_count: "null",
      fetch_tagged_user_count: "null",
      fetch_preview_comment_count: "null",
      has_threaded_comments: "false",
      hoisted_comment_id: "null",
      hoisted_reply_id: "null",
    }),
    server_timestamps: "true",
    doc_id: "10015901848480474",
  };
  const encoded = querystring.stringify(requestData);
  return encoded;
};

export const formatGraphqlJson = (data: MediaData) => {
  const filename = getIGVideoFileName();
  const width = data.dimensions.width.toString();
  const height = data.dimensions.height.toString();
  const videoUrl = data.video_url;

  const videoJson: VideoInfo = {
    filename,
    width,
    height,
    videoUrl,
  };

  return videoJson;
};

export const formatPageJson = (postHtml: CheerioAPI) => {
  const videoElement = postHtml("meta[property='og:video']");

  if (videoElement.length === 0) {
    return null;
  }

  const videoUrl = videoElement.attr("content");
  if (!videoUrl) return null;

  const width =
    postHtml("meta[property='og:video:width']").attr("content") ?? "";
  const height =
    postHtml("meta[property='og:video:height']").attr("content") ?? "";

  const filename = getIGVideoFileName();

  const videoJson: VideoInfo = {
    filename,
    width,
    height,
    videoUrl,
  };

  return videoJson;
};

export const isValidInstagramURL = (postUrl: string) => {
  if (!postUrl) {
    return "Instagram URL was not provided";
  }

  if (!postUrl.includes("instagram.com/")) {
    return "Invalid URL does not contain Instagram domain";
  }

  if (!postUrl.startsWith("https://")) {
    return 'Invalid URL it should start with "https://www.instagram.com..."';
  }

  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

  if (!postRegex.test(postUrl) && !reelRegex.test(postUrl)) {
    return "URL does not match Instagram post or reel";
  }

  return "";
};
