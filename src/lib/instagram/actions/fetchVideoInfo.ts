"use server";

import { VideoInfo } from "@/types";
import { Exception } from "@/lib/exceptions";
import { fetchPostJson } from "@/lib/instagram";
import { makeErrorResponse, makeSuccessResponse } from "@/utils";

function handleError(error: any) {
  if (error instanceof Exception) {
    return makeErrorResponse(error.message);
  } else {
    console.error(error);
    return makeErrorResponse();
  }
}

export async function fetchVideoInfoAction(postUrl: string) {
  try {
    const videoInfo = await fetchPostJson(postUrl);
    const response = makeSuccessResponse<VideoInfo>(videoInfo);
    return response;
  } catch (error: any) {
    return handleError(error);
  }
}
