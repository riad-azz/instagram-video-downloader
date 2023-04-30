import axios from "axios";

import { VideoJson } from "@/types";
import {
  IGUserResponse,
  IGGuestResponse,
  IGUserPostJson,
  IGGuestPostJson,
} from "@/types/instagramAPI";

import { IGBadRequest } from "@/exceptions/instagramExceptions";
import { getRandomUserAgent } from "@/lib/helpers";

export const useInstagramAPI = process.env.USE_INSTAGRAM_API === "true";

const formatUserJson = (json: IGUserPostJson) => {
  if (!json.video_versions) {
    throw new IGBadRequest("This post does not contain a video", 400);
  }

  const video = json.video_versions.filter((vid) =>
    vid.url.includes("video_dashinit")
  )[0];

  if (!video) {
    throw new IGBadRequest(
      "This post does not contain any download links",
      400
    );
  }
  const thumbnail = json.image_versions2.candidates[0];

  const videoJson: VideoJson = {
    username: json.user.username,
    width: video.width.toString(),
    height: video.height.toString(),
    caption: json.caption.text,
    downloadUrl: video.url,
    thumbnailUrl: thumbnail.url,
  };

  return videoJson;
};

const formatGuestJson = (json: IGGuestPostJson) => {
  if (!json.is_video) {
    throw new IGBadRequest("This post does not contain a video", 400);
  }

  const videoJson: VideoJson = {
    username: json.owner.username,
    width: json.dimensions.width.toString(),
    height: json.dimensions.height.toString(),
    caption: json.edge_media_to_caption.edges[0]?.node.text ?? "No caption",
    downloadUrl: json.video_url,
    thumbnailUrl: json.thumbnail_src,
  };

  return videoJson;
};

export const fetchAsUser = async (postUrl: string) => {
  const sessionId = process.env.INSTAGRAM_SESSION_ID;

  if (!sessionId) return null;

  const HEADERS = {
    Cookie: `ds_user_id=0; sessionid=${process.env.INSTAGRAM_SESSION_ID};`,
    "User-Agent": getRandomUserAgent(),
  };

  let response;
  try {
    const apiUrl = postUrl + "/?__a=1&__d=dis";
    response = await axios.get(apiUrl, {
      headers: HEADERS,
    });
  } catch (error: any) {
    return null;
  }

  if (response.statusText !== "OK") {
    return null;
  }
  const json: IGUserResponse = response.data;

  if (!json.items) {
    console.error("sessionId might be expired");
    return null;
  }

  if (json.items.length === 0) {
    return null;
  }

  const postJson: IGUserPostJson = json.items[0];

  const formattedJson = formatUserJson(postJson);
  return formattedJson;
};

export const fetchAsGuest = async (postUrl: string) => {
  const HEADERS = {
    "User-Agent": getRandomUserAgent(),
  };

  let response;
  try {
    const apiUrl = postUrl + "/?__a=1&__d=dis";
    response = await axios.get(apiUrl, {
      headers: HEADERS,
    });
  } catch (error: any) {
    return null;
  }

  if (response.statusText !== "OK") {
    return null;
  }

  const json: IGGuestResponse = response.data;

  if (json.require_login) {
    console.error("Rate limited by Instagram API");
    return null;
  }

  if (!json.graphql) {
    console.error("Instagram API response was modified");
    return null;
  }

  const postJson: IGGuestPostJson = json.graphql.shortcode_media;

  const formattedJson = formatGuestJson(postJson);
  return formattedJson;
};

export const fetchFromAPI = async (postUrl: string) => {
  const jsonAsGuest = await fetchAsGuest(postUrl);

  if (jsonAsGuest) return jsonAsGuest;

  if (useInstagramAPI) {
    const jsonAsUser = await fetchAsUser(postUrl);
    if (jsonAsUser) return jsonAsUser;
  }
};
