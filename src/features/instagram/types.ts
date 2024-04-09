export type GraphQLResponse = {
  data: {
    xdt_shortcode_media: MediaData;
  };
  extensions: {
    is_final: boolean;
  };
};

export type MediaData = {
  __typename: string;
  __isXDTGraphMediaInterface: string;
  id: string;
  shortcode: string;
  thumbnail_src: string;
  dimensions: {
    height: number;
    width: number;
  };
  gating_info: any;
  fact_check_overall_rating: any;
  fact_check_information: any;
  sensitivity_friction_info: any;
  sharing_friction_info: {
    should_have_sharing_friction: boolean;
    bloks_app_url: any;
  };
  media_overlay_info: any;
  media_preview: string;
  display_url: string;
  display_resources: Array<{
    src: string;
    config_width: number;
    config_height: number;
  }>;
  accessibility_caption: any;
  dash_info: {
    is_dash_eligible: boolean;
    video_dash_manifest: any;
    number_of_qualities: number;
  };
  has_audio: boolean;
  video_url: string;
  video_view_count: number;
  video_play_count: number;
  encoding_status: any;
  is_published: boolean;
  product_type: string;
  title: string;
  video_duration: number;
  clips_music_attribution_info: {
    artist_name: string;
    song_name: string;
    uses_original_audio: boolean;
    should_mute_audio: boolean;
    should_mute_audio_reason: string;
    audio_id: string;
  };
  is_video: boolean;
  tracking_token: string;
  upcoming_event: any;
  edge_media_to_tagged_user: {
    edges: Array<any>;
  };
  owner: {
    id: string;
    username: string;
    is_verified: boolean;
    profile_pic_url: string;
    blocked_by_viewer: boolean;
    restricted_by_viewer: any;
    followed_by_viewer: boolean;
    full_name: string;
    has_blocked_viewer: boolean;
    is_embeds_disabled: boolean;
    is_private: boolean;
    is_unpublished: boolean;
    requested_by_viewer: boolean;
    pass_tiering_recommendation: boolean;
    edge_owner_to_timeline_media: {
      count: number;
    };
    edge_followed_by: {
      count: number;
    };
  };
  edge_media_to_caption: {
    edges: Array<{
      node: {
        created_at: string;
        text: string;
        id: string;
      };
    }>;
  };
  can_see_insights_as_brand: boolean;
  caption_is_edited: boolean;
  has_ranked_comments: boolean;
  like_and_view_counts_disabled: boolean;
  edge_media_to_comment: {
    count: number;
    page_info: {
      has_next_page: boolean;
      end_cursor: string;
    };
    edges: Array<any>;
  };
  comments_disabled: boolean;
  commenting_disabled_for_viewer: boolean;
  taken_at_timestamp: number;
  edge_media_preview_like: {
    count: number;
    edges: Array<any>;
  };
  edge_media_to_sponsor_user: {
    edges: Array<any>;
  };
  is_affiliate: boolean;
  is_paid_partnership: boolean;
  location: any;
  nft_asset_info: any;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  is_ad: boolean;
  edge_web_media_to_related_media: {
    edges: Array<any>;
  };
  coauthor_producers: Array<any>;
  pinned_for_users: Array<any>;
  edge_related_profiles: {
    edges: Array<{
      node: {
        id: string;
        full_name: string;
        is_private: boolean;
        is_verified: boolean;
        profile_pic_url: string;
        username: string;
        edge_followed_by: {
          count: number;
        };
        edge_owner_to_timeline_media: {
          count: number;
          edges: Array<any>;
        };
      };
    }>;
  };
};
