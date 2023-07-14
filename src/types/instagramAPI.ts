export type InstaAPIResponse = {
  require_login?: boolean;
  graphql: {
    shortcode_media: {
      __typename: string;
      id: string;
      shortcode: string;
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
      is_video: boolean;
      tracking_token: string;
      upcoming_event: any;
      edge_media_to_tagged_user: {
        edges: Array<any>;
      };
      edge_media_to_caption: {
        edges: Array<{
          node: {
            created_at: string;
            text: string;
          };
        }>;
      };
      can_see_insights_as_brand: boolean;
      caption_is_edited: boolean;
      has_ranked_comments: boolean;
      like_and_view_counts_disabled: boolean;
      edge_media_to_parent_comment: {
        count: number;
        page_info: {
          has_next_page: boolean;
          end_cursor: string;
        };
        edges: Array<{
          node: {
            id: string;
            text: string;
            created_at: number;
            did_report_as_spam: boolean;
            owner: {
              id: string;
              is_verified: boolean;
              profile_pic_url: string;
              username: string;
            };
            viewer_has_liked: boolean;
            edge_liked_by: {
              count: number;
            };
            is_restricted_pending: boolean;
            edge_threaded_comments: {
              count: number;
              page_info: {
                has_next_page: boolean;
                end_cursor: any;
              };
              edges: Array<any>;
            };
          };
        }>;
      };
      edge_media_to_hoisted_comment: {
        edges: Array<any>;
      };
      edge_media_preview_comment: {
        count: number;
        edges: Array<{
          node: {
            id: string;
            text: string;
            created_at: number;
            did_report_as_spam: boolean;
            owner: {
              id: string;
              is_verified: boolean;
              profile_pic_url: string;
              username: string;
            };
            viewer_has_liked: boolean;
            edge_liked_by: {
              count: number;
            };
            is_restricted_pending: boolean;
          };
        }>;
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
      owner: {
        id: string;
        is_verified: boolean;
        profile_pic_url: string;
        username: string;
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
      is_ad: boolean;
      edge_web_media_to_related_media: {
        edges: Array<any>;
      };
      coauthor_producers: Array<any>;
      pinned_for_users: Array<any>;
      encoding_status: any;
      is_published: boolean;
      product_type: string;
      title: string;
      video_duration: number;
      thumbnail_src: string;
      clips_music_attribution_info: {
        artist_name: string;
        song_name: string;
        uses_original_audio: boolean;
        should_mute_audio: boolean;
        should_mute_audio_reason: string;
        audio_id: string;
      };
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
              edges: Array<{
                node: {
                  __typename: string;
                  id: string;
                  shortcode: string;
                  edge_media_preview_like: {
                    count: number;
                  };
                  edge_media_preview_comment: {
                    count: number;
                  };
                  thumbnail_src: string;
                  owner: {
                    id: string;
                    username: string;
                  };
                  gating_info: any;
                  sharing_friction_info: {
                    should_have_sharing_friction: boolean;
                    bloks_app_url: any;
                  };
                  media_overlay_info: any;
                  is_video: boolean;
                  accessibility_caption: any;
                };
              }>;
            };
          };
        }>;
      };
    };
  };
  showQRModal: boolean;
};
