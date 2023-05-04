export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImageUrl: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type VideoJson = {
  username: string;
  caption: string;
  width: string;
  height: string;
  downloadUrl: string;
  thumbnailUrl: string;
};

export type DownloadJson = {
  filename: string;
  downloadUrl: string;
};

export interface IFetchPostFunction {
  postUrl: string;
  timeout?: number;
}
