import { NextResponse } from "next/server";
import { Exception } from "@/exceptions";
import { getPostId, fetchPostJson, formatDownloadJson } from "@/lib/instagram";

function handleError(error: any) {
  if (error instanceof Exception) {
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

    return NextResponse.json(postJson);
  } catch (error: any) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
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
    const downloadJson = formatDownloadJson(postId, postJson);

    return NextResponse.json(downloadJson);
  } catch (error: any) {
    return handleError(error);
  }
}
