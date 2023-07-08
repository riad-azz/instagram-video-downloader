import { FetchPostProps, VideoJson } from "@/types";
import {
  GuestResponse,
  GuestPostJson,
  IGUserResponse,
  IGUserPostJson,
} from "@/types/instagramAPI";

import { axiosFetch, getHeaders } from "@/lib/utils";
import { BadRequest } from "@/exceptions";

import { authCookie, enableGuestApi, enableUserApi } from "@/configs/instagram";

const isValidCookie = (cookieString: string) => {
  const cookiesToCheck = [
    "mid",
    "ig_did",
    "ig_nrcb",
    "datr",
    "csrftoken",
    "rur",
    "ds_user_id",
    "sessionid",
  ];

  for (const cookie of cookiesToCheck) {
    if (!cookieString.includes(cookie)) {
      console.log("Invalid authentication cookie");
      return false;
    }
  }

  return true;
};

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

const formatUserJson = (json: IGUserPostJson) => {
  if (!json.video_versions) {
    throw new BadRequest("This post does not contain a video", 400);
  }

  let video = json.video_versions.filter((vid) =>
    vid.url.includes("video_dashinit")
  )[0];

  if (!video) video = json.video_versions[0];

  if (!video) {
    throw new BadRequest("This post does not contain any download links", 400);
  }

  const thumbnail = json.image_versions2.candidates[0];

  const videoJson: VideoJson = {
    username: json.user.username,
    width: video.width?.toString(),
    height: video.height?.toString(),
    caption: json.caption?.text ?? "No caption",
    downloadUrl: video.url,
    thumbnailUrl: thumbnail.url,
  };

  return videoJson;
};

export const fetchAsGuest = async ({ postUrl, timeout }: FetchPostProps) => {
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

export const fetchAsUser = async ({ postUrl, timeout }: FetchPostProps) => {
  if (!enableUserApi) {
    console.log("Instagram User API is disabled in @config/instagram");
    return null;
  }

  const isValidAuthCookie = isValidCookie(authCookie);
  if (!isValidAuthCookie) return null;

  const headers = getHeaders(authCookie);

  const apiUrl = postUrl + "/?__a=1&__d=dis";

  const response = await axiosFetch({
    url: apiUrl,
    headers,
    timeout,
  });
  if (!response) {
    return null;
  }

  if (response.statusText !== "OK") {
    return null;
  }

  const json: IGUserResponse = response.data;

  if (json.require_login) {
    console.error("sessionId has been expired, it should be updated");
    return null;
  }

  if (json.graphql) {
    console.error("Instagram User API returned Guest response");
    return null;
  }

  if (!json.items) {
    console.error("Instagram User API response has been modified");
    return null;
  }

  if (json.items.length === 0) {
    return null;
  }

  const postJson: IGUserPostJson = json.items[0];

  const formattedJson = formatUserJson(postJson);
  return formattedJson;
};

export const fetchFromAPI = async ({ postUrl, timeout }: FetchPostProps) => {
  const jsonAsGuest = await fetchAsGuest({ postUrl, timeout });
  if (jsonAsGuest) return jsonAsGuest;

  const jsonAsUser = await fetchAsUser({ postUrl, timeout });
  if (jsonAsUser) return jsonAsUser;

  return null;
};
