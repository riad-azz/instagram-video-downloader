import axios from "axios";

import { IFetchPostFunction, VideoJson } from "@/types";
import {
  IGUserResponse,
  IGGuestResponse,
  IGUserPostJson,
  IGGuestPostJson,
} from "@/types/instagramAPI";

import { axiosFetch, getRandomUserAgent } from "@/lib/helpers";
import { IGBadRequest, IGTimeout } from "@/exceptions/instagramExceptions";

export const useInstagramAPI = process.env.USE_SESSION === "true";

const formatUserJson = (json: IGUserPostJson) => {
  if (!json.video_versions) {
    throw new IGBadRequest("This post does not contain a video", 400);
  }

  let video = json.video_versions.filter((vid) =>
    vid.url.includes("video_dashinit")
  )[0];

  if (!video) video = json.video_versions[0];

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

export const fetchAsUser = async ({ postUrl, timeout }: IFetchPostFunction) => {
  const sessionId = process.env.INSTAGRAM_SESSION_ID;

  if (!sessionId) return null;

  const headers = {
    Cookie: `ds_user_id=0; sessionid=${process.env.INSTAGRAM_SESSION_ID};`,
    "User-Agent": getRandomUserAgent(),
  };

  const apiUrl = postUrl + "/?__a=1&__d=dis";
  const response = await axiosFetch({ url: apiUrl, headers, timeout });
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

export const fetchAsGuest = async ({
  postUrl,
  timeout,
}: IFetchPostFunction) => {
  const headers = {
    "User-Agent": getRandomUserAgent(),
  };

  const apiUrl = postUrl + "/?__a=1&__d=dis";
  const response = await axiosFetch({ url: apiUrl, headers, timeout });
  if (!response) {
    return null;
  }

  if (response.statusText !== "OK") {
    return null;
  }

  const json: IGGuestResponse = response.data;

  if (json.require_login) {
    console.error("Guest graphql got rate limited by Instagram API");
    return null;
  }

  if (!json.graphql) {
    console.error("Instagram Guest API response has been modified");
    return null;
  }

  const postJson: IGGuestPostJson = json.graphql.shortcode_media;

  const formattedJson = formatGuestJson(postJson);
  return formattedJson;
};

export const fetchFromAPI = async ({
  postUrl,
  timeout,
}: IFetchPostFunction) => {
  const jsonAsGuest = await fetchAsGuest({ postUrl, timeout });
  if (jsonAsGuest) return jsonAsGuest;

  if (useInstagramAPI) {
    const jsonAsUser = await fetchAsUser({ postUrl, timeout });
    if (jsonAsUser) return jsonAsUser;
  }

  return null;
};
