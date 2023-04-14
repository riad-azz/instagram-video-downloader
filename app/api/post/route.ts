import { NextResponse } from "next/server";
import {
  getPostId,
  fetchPostJson,
  formatResponse,
  formatFirstVideo,
} from "./utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let url: string | null = searchParams.get("url");
  let postId;

  if (!url) {
    return NextResponse.json(
      { error: "Instagram URL was not provided" },
      { status: 400 }
    );
  }

  try {
    postId = getPostId(url);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    const json = await fetchPostJson(postId);
    const response = formatResponse(postId, json);

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  let url: string | null = searchParams.get("url");
  let postId;

  if (!url) {
    return NextResponse.json(
      { error: "Instagram URL was not provided" },
      { status: 400 }
    );
  }

  try {
    postId = getPostId(url);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    const json = await fetchPostJson(postId);
    const response = formatFirstVideo(postId, json);

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
