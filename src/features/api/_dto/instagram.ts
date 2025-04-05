export type IG_GraphQLResponseDto = {
  data: DataDto;
  extensions: ExtensionsDto;
  status: string;
};

export type DataDto = {
  xdt_shortcode_media: XdtShortcodeMediaDto;
};

export type XdtShortcodeMediaDto = {
  __typename: string;
  __isXDTGraphMediaInterface: string;
  id: string;
  shortcode: string;
  thumbnail_src: string;
  dimensions: DimensionsDto;
  gating_info: null;
  fact_check_overall_rating: null;
  fact_check_information: null;
  sensitivity_friction_info: null;
  sharing_friction_info: SharingFrictionInfoDto;
  media_overlay_info: null;
  media_preview: string;
  display_url: string;
  display_resources: DisplayResourceDto[];
  accessibility_caption: null;
  dash_info: DashInfoDto;
  has_audio: boolean;
  video_url: string;
  video_view_count: number;
  video_play_count: number;
  encoding_status: null;
  is_published: boolean;
  product_type: string;
  title: string;
  video_duration: number;
  clips_music_attribution_info: ClipsMusicAttributionInfoDto;
  is_video: boolean;
  tracking_token: string;
  upcoming_event: null;
  edge_media_to_tagged_user: EdgeMediaToCaptionClassDto;
  owner: XdtShortcodeMediaOwnerDto;
  edge_media_to_caption: EdgeMediaToCaptionClassDto;
  can_see_insights_as_brand: boolean;
  caption_is_edited: boolean;
  has_ranked_comments: boolean;
  like_and_view_counts_disabled: boolean;
  edge_media_to_parent_comment: EdgeMediaToParentCommentClassDto;
  edge_media_to_hoisted_comment: EdgeMediaToCaptionClassDto;
  edge_media_preview_comment: EdgeMediaPreviewDto;
  comments_disabled: boolean;
  commenting_disabled_for_viewer: boolean;
  taken_at_timestamp: number;
  edge_media_preview_like: EdgeMediaPreviewDto;
  edge_media_to_sponsor_user: EdgeMediaToCaptionClassDto;
  is_affiliate: boolean;
  is_paid_partnership: boolean;
  location: null;
  nft_asset_info: null;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  is_ad: boolean;
  edge_web_media_to_related_media: EdgeMediaToCaptionClassDto;
  coauthor_producers: any[];
  pinned_for_users: any[];
};

export type ClipsMusicAttributionInfoDto = {
  artist_name: string;
  song_name: string;
  uses_original_audio: boolean;
  should_mute_audio: boolean;
  should_mute_audio_reason: string;
  audio_id: string;
};

export type DashInfoDto = {
  is_dash_eligible: boolean;
  video_dash_manifest: string;
  number_of_qualities: number;
};

export type DimensionsDto = {
  height: number;
  width: number;
};

export type DisplayResourceDto = {
  src: string;
  config_width: number;
  config_height: number;
};

export type EdgeMediaPreviewDto = {
  count: number;
  edges: EdgeMediaPreviewCommentEdgeDto[];
};

export type EdgeMediaToParentCommentClassDto = {
  count: number;
  page_info: PageInfoDto;
  edges: EdgeMediaPreviewCommentEdgeDto[];
};

export type PurpleNodeDto = {
  id: string;
  text: string;
  created_at: number;
  did_report_as_spam: boolean;
  owner: NodeOwnerDto;
  viewer_has_liked: boolean;
  edge_liked_by: EdgeFollowedByClassDto;
  is_restricted_pending: boolean;
  edge_threaded_comments?: EdgeMediaToParentCommentClassDto;
};

export type EdgeMediaPreviewCommentEdgeDto = {
  node: PurpleNodeDto;
};

export type PageInfoDto = {
  has_next_page: boolean;
  end_cursor: null | string;
};

export type EdgeFollowedByClassDto = {
  count: number;
};

export type NodeOwnerDto = {
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
};

export type EdgeMediaToCaptionClassDto = {
  edges: EdgeMediaToCaptionEdgeDto[];
};

export type EdgeMediaToCaptionEdgeDto = {
  node: FluffyNodeDto;
};

export type FluffyNodeDto = {
  created_at: string;
  text: string;
  id: string;
};

export type XdtShortcodeMediaOwnerDto = {
  id: string;
  username: string;
  is_verified: boolean;
  profile_pic_url: string;
  blocked_by_viewer: boolean;
  restricted_by_viewer: null;
  followed_by_viewer: boolean;
  full_name: string;
  has_blocked_viewer: boolean;
  is_embeds_disabled: boolean;
  is_private: boolean;
  is_unpublished: boolean;
  requested_by_viewer: boolean;
  pass_tiering_recommendation: boolean;
  edge_owner_to_timeline_media: EdgeFollowedByClassDto;
  edge_followed_by: EdgeFollowedByClassDto;
};

export type SharingFrictionInfoDto = {
  should_have_sharing_friction: boolean;
  bloks_app_url: null;
};

export type ExtensionsDto = {
  is_final: boolean;
};
