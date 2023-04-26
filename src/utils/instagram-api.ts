import axios from "axios";

import { VideoJson } from "@/types";
import { GraphqlPostJson, GraphqlResponse } from "@/types/instagram";
import { BadRequest } from "@/exceptions/instagramExceptions";

export const useGraphqlAPI = process.env.USE_GRAPHQL_API === "true";

const formatGraphqlJson = (json: GraphqlPostJson) => {
  if (!json.video_versions) {
    throw new BadRequest("This post does not contain a video");
  }

  const video = json.video_versions.filter((vid) =>
    vid.url.includes("video_dashinit")
  )[0];

  if (!video) {
    throw new BadRequest("This post does not contain any download links");
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

  const postJson = json.items[0];

  const formattedJson = formatGraphqlJson(postJson);
  return formattedJson;
};
