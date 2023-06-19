import { IFetchPostFunction, VideoJson } from "@/types";
import { GuestResponse, GuestPostJson } from "@/types/instagramAPI";

import { axiosFetch, getRandomUserAgent } from "@/lib/utils";
import { BadRequest } from "@/exceptions";

import { enableApi } from "@/configs/instagram";

const formatGuestJson = (json: GuestPostJson) => {
  if (!json.is_video) {
    throw new BadRequest("This post does not contain a video", 400);
  }

  const videoJson: VideoJson = {
    username: json.owner.username,
    width: json.dimensions.width.toString(),
    height: json.dimensions.height.toString(),
    caption: json.edge_media_to_caption?.edges[0]?.node?.text ?? "No caption",
    downloadUrl: json.video_url,
    thumbnailUrl: json.thumbnail_src,
  };

  return videoJson;
};

export const fetchAsGuest = async ({
  postUrl,
  timeout,
}: IFetchPostFunction) => {
  if (!enableApi) {
    console.log("Instagram Guest API is disabled in @config/instagram");
    return null;
  }
  const headers = {
    "User-Agent": getRandomUserAgent(),
  };

  const apiUrl = postUrl + "/?__a=1&__d=dis";
  const response = await axiosFetch({ url: apiUrl, headers, timeout });
  if (!response) {
    return null;
  }

  if (response.statusText !== "OK") {
    console.error("Bad response from API Guest");
    return null;
  }

  const json: GuestResponse = response.data;

  if (json.require_login) {
    console.error("Guest graphql got rate limited by Instagram API");
    return null;
  }

  if (!json.graphql) {
    console.error("Instagram Guest API response has been modified");
    return null;
  }

  const postJson: GuestPostJson = json.graphql.shortcode_media;

  const formattedJson = formatGuestJson(postJson);
  return formattedJson;
};

export const fetchFromAPI = async ({
  postUrl,
  timeout,
}: IFetchPostFunction) => {
  const jsonAsGuest = await fetchAsGuest({ postUrl, timeout });
  if (jsonAsGuest) return jsonAsGuest;

  return null;
};
