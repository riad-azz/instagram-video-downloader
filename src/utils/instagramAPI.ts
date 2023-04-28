import axios from "axios";

import { VideoJson } from "@/types";
import { GraphqlResponse, GraphqlPostJson } from "@/types/instagramAPI";
import { BadRequest } from "@/exceptions/instagramExceptions";

export const useInstagramAPI = process.env.USE_INSTAGRAM_API === "true";

const formatGraphqlJson = (json: GraphqlPostJson) => {
  if (!json.video_versions) {
    throw new BadRequest("This post does not contain a video", 400);
  }

  const video = json.video_versions.filter((vid) =>
    vid.url.includes("video_dashinit")
  )[0];

  if (!video) {
    throw new BadRequest("This post does not contain any download links", 400);
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

export const fetchFromAPI = async (postUrl: string) => {
  const HEADERS = {
    Cookie: `ds_user_id=0; sessionid=${process.env.INSTAGRAM_SESSION_ID};`,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
  };

  let response;

  try {
    const apiUrl = postUrl + "/?__a=1&__d=dis";
    response = await axios.get(apiUrl, {
      headers: HEADERS,
    });
  } catch (error: any) {
    if (error.message.includes("404")) {
      throw new BadRequest("This post page isn't available.", 404);
    }
    console.error(error.message);
    return null;
  }

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

  const postJson = json.items[0];

  const formattedJson = formatGraphqlJson(postJson);
  return formattedJson;
};
