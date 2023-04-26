import { VideoJson, DownloadJson } from "@/types";
import { BadRequest } from "@/exceptions/instagramExceptions";
import { PostJsonVideo, PostJson, GraphqlPostJson } from "@/types/instagram";

export const formatPageJson = (json: PostJson) => {
  const videoList = json.video;

  if (videoList.length === 0) {
    throw new BadRequest("This post does not contain a video");
  }

  const video: PostJsonVideo = videoList[0];

  const videoJson: VideoJson = {
    username: json.author.identifier.value,
    width: video.width,
    height: video.height,
    caption: video.caption,
    downloadUrl: video.contentUrl,
    thumbnailUrl: video.thumbnailUrl,
  };

  return videoJson;
};

export const formatGraphqlJson = (json: GraphqlPostJson) => {
  if (!json.video_versions) {
    throw new BadRequest("This post does not contain a video");
  }

  const video = json.video_versions.filter((v) =>
    v.url.includes("video_dashinit")
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

export const formatDownloadJson = (postId: string, json: VideoJson) => {
  const username = json.username;
  const filename = `${username}-instagram-${postId}.mp4`;
  const downloadUrl = json.downloadUrl;

  const downloadJson: DownloadJson = {
    filename: filename,
    downloadUrl: downloadUrl,
  };

  return downloadJson;
};

export const getPostId = (postUrl: string | null) => {
  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;
  let postId;

  if (!postUrl) {
    throw new BadRequest("Instagram URL was not provided");
  }

  const postCheck = postUrl.match(postRegex);
  if (postCheck) {
    postId = postCheck.at(-1);
  }

  const reelCheck = postUrl.match(reelRegex);
  if (reelCheck) {
    postId = reelCheck.at(-1);
  }

  if (!postId) {
    throw new BadRequest("Instagram post/reel ID was not found");
  }

  return postId;
};
