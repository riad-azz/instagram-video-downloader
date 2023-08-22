import { VideoInfo } from "@/types";
import { InstagramAPIResponse } from "@/types/instagramAPI";

import {
  makeHttpRequest,
  getInstagramHeaders,
  getTimedFilename,
} from "@/lib/utils";
import { BadRequest } from "@/exceptions";

import { enableGuestApi } from "@/configs/instagram";

const formatGuestJson = (json: InstagramAPIResponse) => {
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

export const fetchAsGuest = async (postUrl: string, timeout: number = 0) => {
  if (!enableGuestApi) {
    console.log("Instagram Guest API is disabled in @config/instagram");
    return null;
  }

  if (!postUrl) return null;

  const headers = getInstagramHeaders(postUrl);

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

export const fetchFromAPI = async (postUrl: string, timeout: number = 0) => {
  const jsonAsGuest = await fetchAsGuest(postUrl, timeout);
  if (jsonAsGuest) return jsonAsGuest;

  return null;
};
