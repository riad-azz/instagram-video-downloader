# Instagram Videos Downloader

Simple Website/API for downloading instagram videos made with Next.js 13 app directory

## Description

A website that lets you download Instagram videos easily and quickly. You can paste the URL of any public Instagram post and get the video file in MP4 format. there is also an API that you can use to integrate this functionality into your own applications. The API is simple, and it returns JSON responses with the video URL and other metadata.

_PS: Instagram stories aren't supported._

**You can preview and try the website live in vercel here : [riad-insta.vercel.app](https://riad-insta.vercel.app/)**

> **Note**
> This mainly works on posts with `application/ld+json` script present in the html.
> If its missing the app will try to fallback on the API but its not that stable due to vercel being serverless.

## Website Preview

### Dark/Light themes

![webpage preview image](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/sc-01.png?raw=true)

![webpage preview image](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/sc-02.png?raw=true)

### Fetching/Error handling

![webpage preview image](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/sc-03.png?raw=true)

![webpage preview image](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/sc-04.png?raw=true)

### Responsive on mobile

![webpage preview image](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/sc-05.png?raw=true)

![webpage preview image](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/sc-06.png?raw=true)

## Installation & Running

### 1.Cloning the repository

```bash
git clone https://github.com/riad-azz/instagram-video-downloader.git
```

### 2.Installing dependencies

```bash
cd instagram-video-downloader
```

```bash
npm install
```

### 3.Starting the server

```bash
# Development
npm run dev

# Build
npm run build

# Start
npm run start
```

### 4.Testing

I am using [jest](https://jestjs.io/) for testing which is pretty simple and easy to use. You can find all the test files in `src/tests`.

> Run all tests

```bash
# Run all tests
npm run test
```

> Run a single test

```bash
# Command
npx jest -t "<test-name>"

# Example
npx jest -t "success-fetchPostJson"
```

## Rate limiter

The website has been getting spammed a lot which was resulting in the session being terminated repeatably so i decided to add rate limiting.

[Upstash](https://upstash.com/) is used for rate limiting and stopping spam. You can enable it by creating your own account and setting up the environment variables in `.env.local` .

All ratelimit configs can be found in `src/configs/upstash.ts`.

```env
USE_UPSTASH="true"
UPSTASH_URL="YOUR-UPSTASH-URL"
UPSTASH_TOKEN="YOUR-UPSTASH-TOKEN"
```

If you would like to change the ban identifier (default is IP) you can change it in `src/middleware.ts`.

## Instagram Graphql API Option

This is a fallback in case the page scraping doesn't work.

The application already uses instagram API as a fallback but as a Guest (Not authorized) so it will be rate limited every few requests (around 20 - 30) or in case of spam.

All Instagram configs can be found in `src/configs/instagram.ts`.

1. Create `.env.local` file.
2. Copy and paste the content of `.env.example` in your `.env.local` file.
3. set `USE_IG_SESSION` to `true`.
4. Fill in the rest of variables with your dummy account session info.

```env
USE_IG_SESSION="true"
USER_ID="YOUR-INSTAGRAM-USER-ID"
SESSION_ID="YOUR-INSTAGRAM-SESSION-ID"
CSRF_TOKEN="YOUR-INSTAGRAM-CSRF-TOKEN"
```

### Getting the Session info

> **Warning**
> DO NOT USE YOUR REAL ACCOUNT AND DO NOT SHARE THE SESSION INFO WITH ANYONE

1. Open the browser in incognito mode.

2. Login to your dummy account.

3. Open the dev tool in your browser.

4. Visit this instagram endpoint : [Shared Data endpoint](https://www.instagram.com/data/shared_data/).

5. Get the info from the request headers (Check the image below).

Note : if the network tab is empty just refresh the page and the request will appear.

![Session info image tutorial](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/sc-07.png?raw=true)

## API Documentation

The API is pretty simple and straightforward.

Endpoint `/api/instagram` takes an Instagram **Post** or **Reel** link as a param `url` (required).

`GET /api/instagram?url={POST_URL}`

```bash
curl -i "https://riad-insta.vercel.app/api/instagram?url=https://www.instagram.com/p/CGh4a0iASGS"
```

```bash
{
  "username": string; # Poster username
  "caption": string; # Post caption
  "width": string; # Video width ex. 1920
  "height": string; # Video height ex. 1080
  "downloadUrl": string; # MP4 file link
  "thumbnailUrl": string; # Thumbnail image link
}
```

API live response example : [https://riad-insta.vercel.app/api/example](https://riad-insta.vercel.app/api/instagram?url=https://www.instagram.com/p/CGh4a0iASGS)

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
