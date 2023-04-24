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

export type DownloadVideoJson = {
  filename: string;
  downloadUrl: string;
};

export type IconSize = {
  size?: number;
};
