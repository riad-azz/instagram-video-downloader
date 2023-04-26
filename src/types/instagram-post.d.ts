export interface PostJson {
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
}

export interface Author {
  "@type": string;
  identifier: Identifier;
  image: string;
  name: string;
  alternateName: string;
  url: string;
}

export interface Comment {
  "@type": string;
  text: string;
  author: CommentAuthor;
  dateCreated: string;
  interactionStatistic: InteractionStatistic;
}

export interface CommentAuthor {
  "@type": string;
  identifier: Identifier;
  image: string;
  name: string;
  alternateName: string;
  url: string;
}

export interface InteractionStatistic {
  "@type": string;
  interactionType: string;
  userInteractionCount: number;
}

export interface Identifier {
  "@type": string;
  propertyID: string;
  value: string;
}

export interface MainEntityOfPage {
  "@type": string;
  "@id": string;
}

export interface PostJsonVideo {
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
}
