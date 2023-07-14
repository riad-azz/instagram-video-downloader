"use server";

import { Exception } from "@/exceptions";
import { getPostId, fetchPostJson } from "@/lib/instagram";
import { makeErrorResponse, makeSuccessResponse } from "../utils";
import { VideoInfo } from "@/types";

function handleError(error: any) {
  if (error instanceof Exception) {
    return makeErrorResponse(error.message);
  } else {
    console.error(error);
    return makeErrorResponse();
  }
}

export async function fetchVideoInfoAction(postUrl: string) {
  let postId;

  try {
    postId = getPostId(postUrl);
  } catch (error: any) {
    return handleError(error);
  }

  try {
    const videoInfo = await fetchPostJson(postId);
    const response = makeSuccessResponse<VideoInfo>(videoInfo);
    return response;
  } catch (error: any) {
    return handleError(error);
  }
}
