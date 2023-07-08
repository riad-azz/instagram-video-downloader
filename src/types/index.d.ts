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

export type AxiosFetchProps = {
  credentials?: boolean;
  url: string;
  headers?: object;
  timeout?: number;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";
  data?: any;
  throwError?: boolean;
};

export type FetchPostProps = {
  postUrl: string;
  timeout?: number;
};
