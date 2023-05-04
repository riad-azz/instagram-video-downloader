/* User Response */

export type IGUserResponse = {
  require_login?: boolean;
  graphql?: any;
  items: Item[];
  num_results: number;
  more_available: boolean;
  auto_load_more_enabled: boolean;
  showQRModal: boolean;
};

export type IGUserPostJson = {
  taken_at: number;
  pk: number;
  id: string;
  device_timestamp: number;
  media_type: number;
  code: string;
  client_cache_key: string;
  filter_type: number;
  is_unified_video: boolean;
  should_request_ads: boolean;
  commerciality_status: string;
  is_visual_reply_commenter_notice_enabled: boolean;
  clips_tab_pinned_user_ids: any[];
  comment_inform_treatment: CommentInformTreatment;
  sharing_friction_info: SharingFrictionInfo;
  play_count: number;
  is_paid_partnership: boolean;
  has_delayed_metadata: boolean;
  comment_likes_enabled: boolean;
  comment_threading_enabled: boolean;
  max_num_visible_preview_comments: number;
  has_more_comments: boolean;
  preview_comments: any[];
  comments: any[];
  comment_count: number;
  can_view_more_preview_comments: boolean;
  hide_view_all_comment_entrypoint: boolean;
  inline_composer_display_condition: string;
  user: User;
  can_viewer_reshare: boolean;
  has_liked: boolean;
  like_count: number;
  top_likers: string[];
  facepile_top_likers: any[];
  image_versions2: ImageVersions2;
  original_width: number;
  original_height: number;
  is_organic_product_tagging_eligible: boolean;
  can_see_insights_as_brand: boolean;
  video_subtitles_confidence: number;
  video_subtitles_uri: string;
  caption: Caption;
  caption_is_edited: boolean;
  highlight_post_metadata: null;
  coauthor_producers: null;
  coauthor_producer_can_see_organic_insights: null;
  group: null;
  is_groups_post_pending_admin_approval: null;
  invited_coauthor_producers: null;
  guide_metadata: null;
  is_dash_eligible: number;
  video_dash_manifest: string;
  video_codec: string;
  number_of_qualities: number;
  video_versions: VideoVersion[];
  has_audio: boolean;
  video_duration: number;
  original_media_has_visual_reply_media: boolean;
  like_and_view_counts_disabled: boolean;
  can_viewer_save: boolean;
  is_in_profile_grid: boolean;
  profile_grid_control_enabled: boolean;
  featured_products: any[];
  is_comments_gif_composer_enabled: boolean;
  attribution: null;
  organic_tracking_token: string;
  has_shared_to_fb: number;
  product_type: string;
  show_shop_entrypoint: boolean;
  deleted_reason: number;
  integrity_review_decision: string;
  commerce_integrity_review_decision: null;
  music_metadata: null;
  is_artist_pick: boolean;
  ig_media_sharing_disabled: boolean;
  reshare_count: number;
  clips_metadata: ClipsMetadata;
  media_cropping_info: MediaCroppingInfo;
};

export type Caption = {
  pk: string;
  user_id: number;
  text: string;
  type: number;
  created_at: number;
  created_at_utc: number;
  content_type: string;
  status: string;
  bit_flags: number;
  did_report_as_spam: boolean;
  share_enabled: boolean;
  user: User;
  is_covered: boolean;
  is_ranked_comment: boolean;
  media_id: number;
  private_reply_status: number;
};

export type User = {
  has_anonymous_profile_picture: boolean;
  fan_club_info: FanClubInfo;
  fbid_v2: number;
  transparency_product_enabled: boolean;
  latest_reel_media: number;
  is_favorite: boolean;
  is_unpublished: boolean;
  pk: number;
  pk_id: string;
  strong_id__: string;
  username: string;
  full_name: string;
  is_private: boolean;
  is_verified: boolean;
  friendship_status: FriendshipStatus;
  profile_pic_id: string;
  profile_pic_url: string;
  account_badges: any[];
  show_account_transparency_details: boolean;
  third_party_downloads_enabled: number;
};

export type FanClubInfo = {
  fan_club_id: null;
  fan_club_name: null;
  is_fan_club_referral_eligible: null;
  fan_consideration_page_revamp_eligiblity: null;
  is_fan_club_gifting_eligible: null;
  subscriber_count: null;
};

export type FriendshipStatus = {
  following: boolean;
  outgoing_request: boolean;
  is_bestie: boolean;
  is_restricted: boolean;
  is_feed_favorite: boolean;
};

export type ClipsMetadata = {
  music_info: null;
  original_sound_info: OriginalSoundInfo;
  audio_type: string;
  music_canonical_id: string;
  featured_label: null;
  mashup_info: MashupInfo;
  reusable_text_info: null;
  reusable_text_attribute_string: null;
  nux_info: null;
  viewer_interaction_settings: null;
  branded_content_tag_info: BrandedContentTagInfo;
  shopping_info: null;
  additional_audio_info: AdditionalAudioInfo;
  is_shared_to_fb: boolean;
  breaking_content_info: null;
  challenge_info: null;
  reels_on_the_rise_info: null;
  breaking_creator_info: null;
  asset_recommendation_info: null;
  contextual_highlight_info: null;
  clips_creation_entry_point: string;
  audio_ranking_info: AudioRankingInfo;
  template_info: null;
  is_fan_club_promo_video: boolean;
  disable_use_in_clips_client_cache: boolean;
  content_appreciation_info: ContentAppreciationInfo;
  achievements_info: AchievementsInfo;
  show_achievements: boolean;
  show_tips: boolean;
  merchandising_pill_info: null;
  is_public_chat_welcome_video: boolean;
  professional_clips_upsell_type: number;
};

export type AchievementsInfo = {
  show_achievements: boolean;
  num_earned_achievements: null;
};

export type AdditionalAudioInfo = {
  additional_audio_username: null;
  audio_reattribution_info: AudioReattributionInfo;
};

export type AudioReattributionInfo = {
  should_allow_restore: boolean;
};

export type AudioRankingInfo = {
  best_audio_cluster_id: string;
};

export type BrandedContentTagInfo = {
  can_add_tag: boolean;
};

export type ContentAppreciationInfo = {
  enabled: boolean;
  entry_point_container: null;
};

export type MashupInfo = {
  mashups_allowed: boolean;
  can_toggle_mashups_allowed: boolean;
  has_been_mashed_up: boolean;
  formatted_mashups_count: null;
  original_media: null;
  privacy_filtered_mashups_media_count: null;
  non_privacy_filtered_mashups_media_count: number;
  mashup_type: null;
  is_creator_requesting_mashup: boolean;
  has_nonmimicable_additional_audio: boolean;
};

export type OriginalSoundInfo = {
  audio_asset_id: number;
  music_canonical_id: null;
  progressive_download_url: string;
  duration_in_ms: number;
  dash_manifest: string;
  ig_artist: IgArtist;
  should_mute_audio: boolean;
  hide_remixing: boolean;
  original_media_id: number;
  time_created: number;
  original_audio_title: string;
  consumption_info: ConsumptionInfo;
  can_remix_be_shared_to_fb: boolean;
  formatted_clips_media_count: null;
  allow_creator_to_rename: boolean;
  audio_parts: any[];
  is_explicit: boolean;
  original_audio_subtype: string;
  is_audio_automatically_attributed: boolean;
  is_reuse_disabled: boolean;
  is_xpost_from_fb: boolean;
  xpost_fb_creator_info: null;
  nft_info: null;
  is_original_audio_download_eligible: boolean;
};

export type ConsumptionInfo = {
  is_bookmarked: boolean;
  should_mute_audio_reason: string;
  is_trending_in_clips: boolean;
  should_mute_audio_reason_type: null;
  display_media_id: null;
};

export type IgArtist = {
  pk: number;
  pk_id: string;
  username: string;
  full_name: string;
  is_private: boolean;
  is_verified: boolean;
  profile_pic_id: string;
  profile_pic_url: string;
};

export type CommentInformTreatment = {
  should_have_inform_treatment: boolean;
  text: string;
  url: null;
  action_type: null;
};

export type ImageVersions2 = {
  candidates: FirstFrame[];
  additional_candidates: AdditionalCandidates;
  smart_thumbnail_enabled: boolean;
  scrubber_spritesheet_info_candidates: ScrubberSpritesheetInfoCandidates;
};

export type AdditionalCandidates = {
  igtv_first_frame: FirstFrame;
  first_frame: FirstFrame;
  smart_frame: null;
};

export type FirstFrame = {
  width: number;
  height: number;
  url: string;
};

export type ScrubberSpritesheetInfoCandidates = {
  default: Default;
};

export type Default = {
  video_length: number;
  thumbnail_width: number;
  thumbnail_height: number;
  thumbnail_duration: number;
  sprite_urls: string[];
  thumbnails_per_row: number;
  total_thumbnail_num_per_sprite: number;
  max_thumbnails_per_sprite: number;
  sprite_width: number;
  sprite_height: number;
  rendered_width: number;
  file_size_kb: number;
};

export type MediaCroppingInfo = {
  feed_preview_crop: null;
  square_crop: SquareCrop;
  three_by_four_preview_crop: null;
};

export type SquareCrop = {
  crop_bottom: number;
  crop_left: number;
  crop_right: number;
  crop_top: number;
};

export type SharingFrictionInfo = {
  should_have_sharing_friction: boolean;
  bloks_app_url: null;
  sharing_friction_payload: null;
};

export type VideoVersion = {
  type: number;
  width: number;
  height: number;
  url: string;
  id: string;
};

/* ------------------------------------------------ */
/* ---------------- Guest Response ---------------- */
/* ------------------------------------------------ */

export type IGGuestResponse = {
  require_login?: boolean;
  graphql: Graphql;
  showQRModal: boolean;
};

export type Graphql = {
  shortcode_media: ShortcodeMedia;
};

export type IGGuestPostJson = {
  __typename: Typename;
  id: string;
  shortcode: string;
  dimensions: Dimensions;
  gating_info: null;
  fact_check_overall_rating: null;
  fact_check_information: null;
  sensitivity_friction_info: null;
  sharing_friction_info: SharingFrictionInfo;
  media_overlay_info: null;
  media_preview: string;
  display_url: string;
  display_resources: DisplayResource[];
  accessibility_caption: null;
  dash_info: DashInfo;
  has_audio: boolean;
  video_url: string;
  video_view_count: number;
  video_play_count: number;
  is_video: boolean;
  tracking_token: string;
  upcoming_event: null;
  edge_media_to_tagged_user: EdgeMediaToCaptionClass;
  edge_media_to_caption: EdgeMediaToCaptionClass;
  can_see_insights_as_brand: boolean;
  caption_is_edited: boolean;
  has_ranked_comments: boolean;
  like_and_view_counts_disabled: boolean;
  edge_media_to_parent_comment: EdgeMediaToParentCommentClass;
  edge_media_to_hoisted_comment: EdgeMediaToCaptionClass;
  edge_media_preview_comment: EdgeMediaPreview;
  comments_disabled: boolean;
  commenting_disabled_for_viewer: boolean;
  taken_at_timestamp: number;
  edge_media_preview_like: EdgeMediaPreview;
  edge_media_to_sponsor_user: EdgeMediaToCaptionClass;
  is_affiliate: boolean;
  is_paid_partnership: boolean;
  location: null;
  nft_asset_info: null;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  owner: ShortcodeMediaOwner;
  is_ad: boolean;
  edge_web_media_to_related_media: EdgeMediaToCaptionClass;
  coauthor_producers: any[];
  pinned_for_users: any[];
  encoding_status: null;
  is_published: boolean;
  product_type: string;
  title: string;
  video_duration: number;
  thumbnail_src: string;
  clips_music_attribution_info: ClipsMusicAttributionInfo;
  edge_related_profiles: EdgeRelatedProfiles;
};

export enum Typename {
  GraphImage = "GraphImage",
  GraphSidecar = "GraphSidecar",
  GraphVideo = "GraphVideo",
}

export type ClipsMusicAttributionInfo = {
  artist_name: string;
  song_name: string;
  uses_original_audio: boolean;
  should_mute_audio: boolean;
  should_mute_audio_reason: string;
  audio_id: string;
};

export type DashInfo = {
  is_dash_eligible: boolean;
  video_dash_manifest: null;
  number_of_qualities: number;
};

export type Dimensions = {
  height: number;
  width: number;
};

export type DisplayResource = {
  src: string;
  config_width: number;
  config_height: number;
};

export type EdgeMediaPreview = {
  count: number;
  edges: EdgeMediaPreviewCommentEdge[];
};

export type EdgeMediaToParentCommentClass = {
  count: number;
  page_info: PageInfo;
  edges: EdgeMediaPreviewCommentEdge[];
};

export type PurpleNode = {
  id: string;
  text: string;
  created_at: number;
  did_report_as_spam: boolean;
  owner: PurpleOwner;
  viewer_has_liked: boolean;
  edge_liked_by: EdgeFollowedByClass;
  is_restricted_pending: boolean;
  edge_threaded_comments?: EdgeMediaToParentCommentClass;
};

export type EdgeMediaPreviewCommentEdge = {
  node: PurpleNode;
};

export type PageInfo = {
  has_next_page: boolean;
  end_cursor: null | string;
};

export type EdgeFollowedByClass = {
  count: number;
};

export type PurpleOwner = {
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
};

export type EdgeMediaToCaptionClass = {
  edges: EdgeMediaToCaptionEdge[];
};

export type EdgeMediaToCaptionEdge = {
  node: FluffyNode;
};

export type FluffyNode = {
  created_at: string;
  text: string;
};

export type EdgeRelatedProfiles = {
  edges: EdgeRelatedProfilesEdge[];
};

export type EdgeRelatedProfilesEdge = {
  node: TentacledNode;
};

export type TentacledNode = {
  id: string;
  full_name: string;
  is_private: boolean;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
  edge_followed_by: EdgeFollowedByClass;
  edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia;
};

export type EdgeOwnerToTimelineMedia = {
  count: number;
  edges: EdgeOwnerToTimelineMediaEdge[];
};

export type EdgeOwnerToTimelineMediaEdge = {
  node: StickyNode;
};

export type StickyNode = {
  __typename: Typename;
  id: string;
  shortcode: string;
  edge_media_preview_like: EdgeFollowedByClass;
  edge_media_preview_comment: EdgeFollowedByClass;
  thumbnail_src: string;
  owner: FluffyOwner;
  gating_info: null;
  sharing_friction_info: SharingFrictionInfo;
  media_overlay_info: null;
  is_video: boolean;
  accessibility_caption: null;
};

export type FluffyOwner = {
  id: string;
  username: string;
};

export type SharingFrictionInfo = {
  should_have_sharing_friction: boolean;
  bloks_app_url: null;
};

export type ShortcodeMediaOwner = {
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
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
  edge_owner_to_timeline_media: EdgeFollowedByClass;
  edge_followed_by: EdgeFollowedByClass;
};
