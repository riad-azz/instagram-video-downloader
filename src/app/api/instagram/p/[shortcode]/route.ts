import { NextRequest, NextResponse } from "next/server";

import {
  getInstagramPostGraphQL,
  getMediaItemFromWebInfoResponse,
  normalizeMediaToLegacyGraphQL,
} from "./utils";

interface RouteContext {
  params: Promise<{
    shortcode: string;
  }>;
}

export async function GET(_: NextRequest, context: RouteContext) {
  const { shortcode } = await context.params;

  if (!shortcode) {
    return NextResponse.json(
      { error: "noShortcode", message: "shortcode is required" },
      { status: 400 }
    );
  }

  try {
    const response = await getInstagramPostGraphQL({
      shortcode,
    });

    const status = response.status;

    if (status === 200) {
      const payload = await response.json();
      const mediaItem = getMediaItemFromWebInfoResponse(payload);

      if (!mediaItem) {
        return NextResponse.json(
          { error: "notFound", message: "post not found" },
          { status: 404 }
        );
      }

      const data = normalizeMediaToLegacyGraphQL(mediaItem);

      if (!data.xdt_shortcode_media?.is_video) {
        return NextResponse.json(
          { error: "notVideo", message: "post is not a video" },
          { status: 400 }
        );
      }

      if (!data.xdt_shortcode_media.video_url) {
        return NextResponse.json(
          { error: "notFound", message: "video url not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ data }, { status: 200 });
    }

    if (status === 404) {
      return NextResponse.json(
        { error: "notFound", message: "post not found" },
        { status: 404 }
      );
    }

    if (status === 429 || status === 401) {
      return NextResponse.json(
        {
          error: "tooManyRequests",
          message: "too many requests, try again later",
        },
        { status: 429 }
      );
    }

    throw new Error("Failed to fetch post data");
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "serverError", message: error.message },
      { status: 500 }
    );
  }
}
