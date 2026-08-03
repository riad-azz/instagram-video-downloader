import { RequestConfigType } from "@/types/request-config";
import { IG_GraphQLResponseDto } from "@/features/api/_dto/instagram";

import querystring from "querystring";

const USER_AGENT =
  "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36";

// Instagram deprecated doc_id 8845758582119845 (xdt_shortcode_media) around June 2026.
const POLARIS_POST_DOC_ID = "27128499623469141";

type InstagramMediaItem = {
  code?: string;
  pk?: string | number;
  media_type?: number;
  taken_at?: number;
  video_versions?: Array<{ url: string }>;
  image_versions2?: { candidates?: Array<{ url: string }> };
  video_duration?: number;
  view_count?: number;
  play_count?: number;
  user?: {
    pk?: string | number;
    username?: string;
    full_name?: string;
    is_verified?: boolean;
    profile_pic_url?: string;
  };
  caption?: { text?: string } | null;
};

type InstagramWebInfoResponse = {
  data?: {
    xdt_api__v1__media__shortcode__web_info?: {
      items?: InstagramMediaItem[];
    };
  } | null;
  status?: string;
  errors?: unknown;
};

function generateRequestBody(shortcode: string) {
  return querystring.stringify({
    av: "0",
    __d: "www",
    __user: "0",
    __a: "1",
    __req: "b",
    dpr: "3",
    __ccg: "GOOD",
    lsd: "AVrqPT0gJDo",
    jazoest: "2946",
    __crn: "comet.igweb.PolarisPostRoute",
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "PolarisPostRootQuery",
    variables: JSON.stringify({
      shortcode,
      __relay_internal__pv__PolarisAIGMMediaWebLabelEnabledrelayprovider: false,
    }),
    server_timestamps: true,
    doc_id: POLARIS_POST_DOC_ID,
  });
}

function extractCsrfToken(setCookieHeaders: string[]): string | null {
  for (const header of setCookieHeaders) {
    const match = header.match(/(?:^|,\s*)csrftoken=([^;]+)/i);
    if (match?.[1]) {
      return match[1];
    }
  }
  return null;
}

async function getCsrfToken(): Promise<string> {
  const response = await fetch("https://www.instagram.com/", {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  const setCookieHeaders =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : [response.headers.get("set-cookie") ?? ""];

  return extractCsrfToken(setCookieHeaders) ?? "";
}

export function normalizeMediaToLegacyGraphQL(
  media: InstagramMediaItem
): IG_GraphQLResponseDto["data"] {
  const mediaType = media.media_type;
  const isVideo = mediaType === 2;
  const candidates = media.image_versions2?.candidates ?? [];
  const videoVersions = media.video_versions ?? [];

  return {
    xdt_shortcode_media: {
      __typename:
        mediaType === 2
          ? "GraphVideo"
          : mediaType === 8
            ? "GraphSidecar"
            : "GraphImage",
      __isXDTGraphMediaInterface: "XDTGraphMediaInterface",
      id: String(media.pk ?? ""),
      shortcode: media.code ?? "",
      thumbnail_src: candidates[0]?.url ?? "",
      dimensions: { height: 0, width: 0 },
      gating_info: null,
      fact_check_overall_rating: null,
      fact_check_information: null,
      sensitivity_friction_info: null,
      sharing_friction_info: {
        should_have_sharing_friction: false,
        bloks_app_url: null,
      },
      media_overlay_info: null,
      media_preview: "",
      display_url: candidates[0]?.url ?? "",
      display_resources: [],
      accessibility_caption: null,
      dash_info: {
        is_dash_eligible: false,
        video_dash_manifest: "",
        number_of_qualities: 0,
      },
      has_audio: isVideo,
      video_url: videoVersions[0]?.url ?? "",
      video_view_count: media.view_count ?? 0,
      video_play_count: media.play_count ?? 0,
      encoding_status: null,
      is_published: true,
      product_type: isVideo ? "clips" : "feed",
      title: "",
      video_duration: media.video_duration ?? 0,
      clips_music_attribution_info: {
        artist_name: "",
        song_name: "",
        uses_original_audio: true,
        should_mute_audio: false,
        should_mute_audio_reason: "",
        audio_id: "",
      },
      is_video: isVideo,
      tracking_token: "",
      upcoming_event: null,
      edge_media_to_tagged_user: { edges: [] },
      owner: {
        id: String(media.user?.pk ?? ""),
        username: media.user?.username ?? "",
        is_verified: media.user?.is_verified ?? false,
        profile_pic_url: media.user?.profile_pic_url ?? "",
        blocked_by_viewer: false,
        restricted_by_viewer: null,
        followed_by_viewer: false,
        full_name: media.user?.full_name ?? "",
        has_blocked_viewer: false,
        is_embeds_disabled: false,
        is_private: false,
        is_unpublished: false,
        requested_by_viewer: false,
        pass_tiering_recommendation: false,
        edge_owner_to_timeline_media: { count: 0 },
        edge_followed_by: { count: 0 },
      },
      edge_media_to_caption: {
        edges: media.caption?.text
          ? [
              {
                node: {
                  created_at: String(media.taken_at ?? ""),
                  text: media.caption.text,
                  id: "",
                },
              },
            ]
          : [],
      },
      can_see_insights_as_brand: false,
      caption_is_edited: false,
      has_ranked_comments: false,
      like_and_view_counts_disabled: false,
      edge_media_to_parent_comment: {
        count: 0,
        page_info: { has_next_page: false, end_cursor: null },
        edges: [],
      },
      edge_media_to_hoisted_comment: { edges: [] },
      edge_media_preview_comment: { count: 0, edges: [] },
      comments_disabled: false,
      commenting_disabled_for_viewer: false,
      taken_at_timestamp: media.taken_at ?? 0,
      edge_media_preview_like: { count: 0, edges: [] },
      edge_media_to_sponsor_user: { edges: [] },
      is_affiliate: false,
      is_paid_partnership: false,
      location: null,
      nft_asset_info: null,
      viewer_has_liked: false,
      viewer_has_saved: false,
      viewer_has_saved_to_collection: false,
      viewer_in_photo_of_you: false,
      viewer_can_reshare: true,
      is_ad: false,
      edge_web_media_to_related_media: { edges: [] },
      coauthor_producers: [],
      pinned_for_users: [],
    },
  };
}

export function getMediaItemFromWebInfoResponse(
  payload: InstagramWebInfoResponse
): InstagramMediaItem | null {
  const items =
    payload.data?.xdt_api__v1__media__shortcode__web_info?.items ?? [];
  return items[0] ?? null;
}

export type GetInstagramPostRequest = {
  shortcode: string;
};

export type GetInstagramPostResponse = IG_GraphQLResponseDto;

export async function getInstagramPostGraphQL(
  data: GetInstagramPostRequest,
  requestConfig?: RequestConfigType
) {
  const csrfToken = await getCsrfToken();
  const requestUrl = new URL("https://www.instagram.com/graphql/query");

  return fetch(requestUrl, {
    credentials: "include",
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-FB-Friendly-Name": "PolarisPostRootQuery",
      "X-BLOKS-VERSION-ID":
        "0d99de0d13662a50e0958bcb112dd651f70dea02e1859073ab25f8f2a477de96",
      "X-CSRFToken": csrfToken,
      "X-IG-App-ID": "1217981644879628",
      "X-FB-LSD": "AVrqPT0gJDo",
      "X-ASBD-ID": "359341",
      "Sec-GPC": "1",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
      ...(csrfToken ? { Cookie: `csrftoken=${csrfToken}` } : {}),
    },
    referrer: `https://www.instagram.com/p/${data.shortcode}/`,
    body: generateRequestBody(data.shortcode),
    method: "POST",
    mode: "cors",
    ...requestConfig,
  });
}
