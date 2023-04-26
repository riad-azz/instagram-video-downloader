import axios from "axios";
import { load } from "cheerio";

import { ServerError } from "@/exceptions/instagramExceptions";
import { PostJson, GraphqlResponse } from "@/types/instagram";
import { formatGraphqlJson, formatPageJson } from "@/utils/helpers";

const useGraphqlAPI = process.env.USE_GRAPHQL_API === "true";

const fetchFromPage = async (postUrl: string) => {
  const response = await axios.get(postUrl);
  if (response.statusText !== "OK") {
    return null;
  }

  const $ = load(response.data);
  const jsonElement = $("script[type='application/ld+json']");

  if (jsonElement.length === 0) {
    return null;
  }

  try {
    const jsonText: string = jsonElement.text();
    const json: PostJson = JSON.parse(jsonText);
    const formattedJson = formatPageJson(json);
    return formattedJson;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const fetchFromAPI = async (postUrl: string) => {
  const HEADERS = {
    Cookie: `ds_user_id=0; sessionid=${process.env.INSTAGRAM_SESSION_ID};`,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
  };

  const apiUrl = postUrl + "/?__a=1&__d=dis";

  const response = await axios.get(apiUrl, {
    headers: HEADERS,
  });

  if (response.statusText !== "OK") {
    return null;
  }
  const json: GraphqlResponse = response.data;

  if (!json.items) {
    return null;
  }

  if (json.items.length === 0) {
    return null;
  }

  const postJson = json.items.at(-1);

  const formattedJson = formatGraphqlJson(postJson);
  return formattedJson;
};

export const fetchPostJson = async (postID: string) => {
  const postUrl = "https://www.instagram.com/p/" + postID;
  const pageJson = await fetchFromPage(postUrl);
  if (pageJson) return pageJson;
  if (useGraphqlAPI) {
    const apiJson = await fetchFromAPI(postUrl);
    if (apiJson) return apiJson;
  }
  throw new ServerError("Could not find download link for this post", 500);
};
