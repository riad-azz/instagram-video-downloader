import { FetchPostArgs, VideoInfo } from "@/types";
import { InstaAPIResponse } from "@/types/instagramAPI";

import { axiosFetch, getHeaders, getTimedFilename } from "@/lib/utils";
import { BadRequest } from "@/exceptions";

import { enableGuestApi } from "@/configs/instagram";

const formatGuestJson = (json: InstaAPIResponse) => {
  const postJson = json.graphql.shortcode_media;

  if (!postJson.is_video) {
    throw new BadRequest("This post does not contain a video", 400);
  }

  const filename = getTimedFilename("instagram-saver", "mp4");

  const videoJson: VideoInfo = {
    filename: filename,
    width: postJson.dimensions.width.toString(),
    height: postJson.dimensions.height.toString(),
    videoUrl: postJson.video_url,
  };

  return videoJson;
};

export const fetchAsGuest = async ({ postUrl, timeout }: FetchPostArgs) => {
  if (!enableGuestApi) {
    console.log("Instagram Guest API is disabled in @config/instagram");
    return null;
  }

  const headers = getHeaders();

  const apiUrl = postUrl + "/?__a=1&__d=dis";
  const response = await axiosFetch({ url: apiUrl, headers, timeout });
  if (!response) {
    return null;
  }

  if (response.statusText !== "OK") {
    console.error("Bad response from API Guest");
    return null;
  }

  const json: InstaAPIResponse = response.data;

  if (json.require_login) {
    console.error("Guest graphql got rate limited by Instagram API");
    return null;
  }

  if (!json.graphql) {
    console.error("Instagram Guest API response has been modified");
    return null;
  }

  const formattedJson = formatGuestJson(json);
  return formattedJson;
};

export const fetchFromAPI = async ({ postUrl, timeout }: FetchPostArgs) => {
  const jsonAsGuest = await fetchAsGuest({ postUrl, timeout });
  if (jsonAsGuest) return jsonAsGuest;

  return null;
};
