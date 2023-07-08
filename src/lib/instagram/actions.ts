"use server";
import { Exception } from "@/exceptions";
import { getPostId, fetchPostJson, formatDownloadJson } from "@/lib/instagram";

function handleError(error: any) {
  if (error instanceof Exception) {
    return { error: error.message };
  } else {
    console.error(error);
    return {
      error: "Internal Server Error",
    };
  }
}

export async function downloadInstagramVideo(postUrl: string) {
  let postId;

  try {
    postId = getPostId(postUrl);
  } catch (error: any) {
    return handleError(error);
  }

  try {
    const postJson = await fetchPostJson(postId);
    const downloadJson = formatDownloadJson(postId, postJson);

    return downloadJson;
  } catch (error: any) {
    return handleError(error);
  }
}
