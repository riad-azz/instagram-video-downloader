export type ScrapedPost = {
  articleBody: string;
  author: Author;
  comment: Comment;
  commentCount: string;
  contentLocation: any;
  "@context": string;
  dateCreated: string;
  dateModified: string;
  headline: string;
  identifier: Identifier;
  image: any[];
  interactionStatistic: InteractionStatistic[];
  mainEntityOfPage: MainEntityOfPage;
  "@type": string;
  video: InstagramPageVideo[];
};

export type Author = {
  "@type": string;
  identifier: Identifier;
  image: string;
  name: string;
  alternateName: string;
  url: string;
};

export type Comment = {
  "@type": string;
  text: string;
  author: CommentAuthor;
  dateCreated: string;
  interactionStatistic: InteractionStatistic;
};

export type CommentAuthor = {
  "@type": string;
  identifier: Identifier;
  image: string;
  name: string;
  alternateName: string;
  url: string;
};

export type InteractionStatistic = {
  "@type": string;
  interactionType: string;
  userInteractionCount: number;
};

export type Identifier = {
  "@type": string;
  propertyID: string;
  value: string;
};

export type MainEntityOfPage = {
  "@type": string;
  "@id": string;
};

export type PostJsonVideo = {
  "@type": string;
  uploadDate: string;
  description: string;
  name: string;
  caption: string;
  height: string;
  width: string;
  contentUrl: string;
  thumbnailUrl: string;
  genre: string[];
  keywords: string[];
};
