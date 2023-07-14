import { NextResponse } from "next/server";
import { Exception } from "@/exceptions";
import { getPostId, fetchPostJson } from "@/lib/instagram";
import { enableServerAPI } from "@/configs/instagram";
import { makeErrorResponse, makeSuccessResponse } from "@/lib/utils";
import { VideoInfo } from "@/types";

function handleError(error: any) {
  if (error instanceof Exception) {
    const response = makeErrorResponse(error.message);
    return NextResponse.json(response, { status: error.code });
  } else {
    console.error(error);
    const response = makeErrorResponse();
    return NextResponse.json(response, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!enableServerAPI) {
    return NextResponse.json({ error: "Not Implemented" }, { status: 501 });
  }

  const { searchParams } = new URL(request.url);
  const url: string | null = searchParams.get("url");
  let postId;

  try {
    postId = getPostId(url);
  } catch (error: any) {
    return handleError(error);
  }

  try {
    const postJson = await fetchPostJson(postId);
    const response = makeSuccessResponse<VideoInfo>(postJson);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return handleError(error);
  }
}
