import { NextResponse } from "next/server";
import {
  InstagramException,
  BadRequest,
} from "@/exceptions/instagramExceptions";
import {
  getPostId,
  fetchPostJson,
  getVideoJson,
  getDownloadJson,
} from "./utils";

function handleError(error: any) {
  if (error instanceof InstagramException) {
    return NextResponse.json({ error: error.message }, { status: error.code });
  } else {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
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
    const response = getVideoJson(postJson);

    return NextResponse.json(response);
  } catch (error: any) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  let url: string | null = searchParams.get("url");
  let postId;

  try {
    postId = getPostId(url);
  } catch (error: any) {
    return handleError(error);
  }

  try {
    const postJson = await fetchPostJson(postId);
    const response = getDownloadJson(postJson);

    return NextResponse.json(response);
  } catch (error: any) {
    return handleError(error);
  }
}
