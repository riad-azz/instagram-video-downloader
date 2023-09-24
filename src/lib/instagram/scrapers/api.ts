import { load } from "cheerio";

import { VideoInfo } from "@/types";
import { InstagramAPIResponse, VideoVersion } from "@/types/instagram";
import { BadRequest, ServerException } from "@/lib/exceptions";
import {
  enableGuestApi,
  enableUserApi,
  instagramCookie,
} from "@/configs/instagram";

import { makeHttpRequest } from "@/utils";

import { handleScraperError, getIGVideoFileName } from "./helpers";

export const formatGuestJson = (json: InstagramAPIResponse) => {
  const postJson = json.graphql.shortcode_media;

  if (!postJson.is_video) {
    throw new BadRequest("This post does not contain a video", 400);
  }

  const filename = getIGVideoFileName();

  const videoJson: VideoInfo = {
    filename: filename,
    width: postJson.dimensions.width.toString(),
    height: postJson.dimensions.height.toString(),
    videoUrl: postJson.video_url,
  };

  return videoJson;
};

export const fetchAsGuest = async (postId: string, timeout: number = 0) => {
  if (!enableGuestApi) {
    console.log("Instagram Guest API is disabled in @config/instagram");
    return null;
  }

  if (!postId) return null;

  const postUrl = "https://www.instagram.com/p/" + postId;

  const headers = {
    accept:
      "*/*, text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8",
    host: "www.instagram.com",
    referer: "https://www.instagram.com/",
    DNT: "1",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299",
  };

  const apiUrl = postUrl + "/?__a=1&__d=dis";

  let response;
  try {
    response = await makeHttpRequest({
      url: apiUrl,
      method: "GET",
      headers,
      timeout,
    });
  } catch (e: any) {
    handleScraperError(e);
    return null;
  }

  if (response.statusText === "error") return null;

  if (!response.data) return null;

  const json: InstagramAPIResponse = response.data;

  if (json.require_login) {
    console.log("Guest graphql got rate limited by Instagram API");
    return null;
  }

  if (!json.graphql) {
    console.log("Instagram Guest API response has been modified");
    return null;
  }

  const formattedJson = formatGuestJson(json);
  return formattedJson;
};

export const formatUserJson = (htmlString: string) => {
  const firstPart = htmlString.split(
    "xdt_api__v1__media__shortcode__web_info"
  )[1];

  if (!firstPart) {
    console.log("xdt_api__v1__media__shortcode__web_info not found");
    console.log(
      "the API might have been changed or the session has been expired"
    );
    throw new ServerException("Something went wrong, please try again");
  }

  const secondPart = firstPart.split('video_versions":')[1];
  if (!secondPart) {
    console.log("video_versions not found");
    return null;
  }

  const videosString = secondPart.split(',"is_dash_eligible"')[0];
  if (!videosString) {
    console.log("is_dash_eligible not found");
    return null;
  }

  const videoVersions: VideoVersion[] = JSON.parse(videosString);

  const videoUrl = videoVersions[0].url?.replace("\\u0025", "%");
  const videoWidth = videoVersions[0].width.toString();
  const videoHeight = videoVersions[0].height.toString();

  if (!videoUrl) {
    return null;
  }

  const filename = getIGVideoFileName();

  const videoJson: VideoInfo = {
    filename: filename,
    width: videoWidth,
    height: videoHeight,
    videoUrl: videoUrl,
  };

  return videoJson;
};

export const fetchAsUser = async (postId: string, timeout: number = 0) => {
  if (!enableUserApi) {
    console.log("Instagram User API is disabled in @config/instagram");
    return null;
  }

  if (!postId) return null;
  const postUrl = "https://www.instagram.com/p/" + postId;

  const headers = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    Host: "www.instagram.com",
    Origin: "https://www.instagram.com",
    Referer: "https://www.instagram.com/",
    DNT: 1,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299",
    Cookie: instagramCookie,
  };

  let response;
  try {
    response = await makeHttpRequest({
      url: postUrl,
      method: "GET",
      headers,
      timeout,
    });
  } catch (e: any) {
    handleScraperError(e);
    return null;
  }

  if (response.statusText === "error") return null;

  if (!response.data) return null;

  const postHtml = load(response.data);
  const htmlString = postHtml.text();

  const formattedJson = formatUserJson(htmlString);
  return formattedJson;
};

export const fetchFromAPI = async (postId: string, timeout: number = 0) => {
  const jsonAsGuest = await fetchAsGuest(postId, timeout);
  if (jsonAsGuest) return jsonAsGuest;

  const jsonAsUser = await fetchAsUser(postId, timeout);
  if (jsonAsUser) return jsonAsUser;

  return null;
};
