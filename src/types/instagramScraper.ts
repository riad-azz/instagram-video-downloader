export type PostJson = {
  articleBody: string;
  author: {
    "@type": string;
    identifier: {
      "@type": string;
      propertyID: string;
      value: string;
    };
    image: string;
    name: string;
    alternateName: string;
    url: string;
  };
  comment: {
    "@type": string;
    text: string;
    author: {
      "@type": string;
      identifier: {
        "@type": string;
        propertyID: string;
        value: string;
      };
      image: string;
      name: string;
      alternateName: string;
      url: string;
    };
    dateCreated: string;
    interactionStatistic: {
      "@type": string;
      interactionType: string;
      userInteractionCount: number;
    };
  };
  commentCount: string;
  contentLocation: any;
  "@context": string;
  dateCreated: string;
  dateModified: string;
  headline: string;
  identifier: {
    "@type": string;
    propertyID: string;
    value: string;
  };
  image: Array<any>;
  interactionStatistic: Array<{
    "@type": string;
    interactionType: string;
    userInteractionCount: number;
  }>;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
  "@type": string;
  video: Array<{
    "@type": string;
    uploadDate: string;
    description: string;
    name: string;
    caption: string;
    height: string;
    width: string;
    contentUrl: string;
    thumbnailUrl: string;
    genre: Array<any>;
    keywords: Array<any>;
    interactionStatistic: Array<{
      "@type": string;
      interactionType: string;
      userInteractionCount: number;
    }>;
  }>;
};
