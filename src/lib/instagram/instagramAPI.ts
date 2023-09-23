import { load } from "cheerio";

import { InstagramAPIResponse } from "@/types/instagramAPI";
import { BadRequest } from "@/lib/exceptions";
import {
  enableGuestApi,
  enableUserApi,
  instagramCookie,
} from "@/configs/instagram";
import { makeHttpRequest, getRandomUserAgent } from "@/utils";
import { formatGuestJson, formatUserJson } from "./helpers";

export const fetchAsGuest = async (postUrl: string, timeout: number = 0) => {
  if (!enableGuestApi) {
    console.log("Instagram Guest API is disabled in @config/instagram");
    return null;
  }

  if (!postUrl) return null;

  const headers = {
    accept:
      "*/*, text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8",
    host: "www.instagram.com",
    referer: "https://www.instagram.com/",
    DNT: "1",
    "User-Agent": getRandomUserAgent(),
  };

  const apiUrl = postUrl + "/?__a=1&__d=dis";
  const response = await makeHttpRequest<InstagramAPIResponse>({
    url: apiUrl,
    method: "GET",
    headers,
    timeout,
  });

  if (response.status === "error") {
    console.log(response.message);
    if (response.message.includes("status code 404")) {
      throw new BadRequest(
        "This post does not exist, make sure the URL is correct"
      );
    }
    return null;
  }

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

export const fetchAsUser = async (postUrl: string, timeout: number = 0) => {
  if (!enableUserApi) {
    console.log("Instagram User API is disabled in @config/instagram");
    return null;
  }

  if (!postUrl) return null;

  const headers = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    Host: "www.instagram.com",
    Origin: "https://www.instagram.com",
    Referer: "https://www.instagram.com/",
    Connection: "keep-alive",
    DNT: 1,
    "User-Agent": getRandomUserAgent(),
    Cookie: instagramCookie,
  };

  const response = await makeHttpRequest<string>({
    url: postUrl,
    method: "GET",
    headers,
    timeout,
  });

  if (response.status === "error") {
    console.log(response.message);
    if (response.message.includes("status code 404")) {
      throw new BadRequest(
        "This post does not exist, make sure the URL is correct"
      );
    }
    return null;
  }

  if (!response.data) return null;

  const postHtml = load(response.data);
  const htmlString = postHtml.text();

  const formattedJson = formatUserJson(htmlString);
  return formattedJson;
};

export const fetchFromAPI = async (postUrl: string, timeout: number = 0) => {
  const jsonAsGuest = await fetchAsGuest(postUrl, timeout);
  if (jsonAsGuest) return jsonAsGuest;

  const jsonAsUser = await fetchAsUser(postUrl, timeout);
  if (jsonAsUser) return jsonAsUser;

  return null;
};
