import { NextResponse } from "next/server";
import { getPostID, fetchPostJson, formatResponse } from "./utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let url: string | null = searchParams.get("url");
  let postID;

  if (!url) {
    return NextResponse.json(
      { error: "Instagram URL was not provided" },
      { status: 400 }
    );
  }

  try {
    postID = getPostID(url);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    const json = await fetchPostJson(postID);
    const response = formatResponse(postID, json);

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  let url: string | null = searchParams.get("url");
  let postID;

  if (!url) {
    return NextResponse.json(
      { error: "Instagram URL was not provided" },
      { status: 400 }
    );
  }

  try {
    postID = getPostID(url);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    const json = await fetchPostJson(postID);
    const response = formatResponse(postID, json);

    return NextResponse.redirect(response.videos[0].url);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
