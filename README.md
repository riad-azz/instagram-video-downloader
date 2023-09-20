# Instagram Videos Downloader

Simple Website/API for downloading instagram videos made with Next.js 13.

## Description

A website that lets you download Instagram videos easily and quickly. You can paste the URL of any public Instagram post and get the video file in MP4 format. there is also an API that you can use to integrate this functionality into your own applications. The API is simple, and it returns JSON responses with the video URL and other metadata.

_Note: Instagram stories aren't supported._

You can preview and try the website live in Vercel here : [download-ig-videos.vercel.app](https://download-ig-videos.vercel.app/)

## Website Preview

Easy and User friendly UI (Interactions feedback and error messages).

![Desktop preview](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/desktop-preview.gif?raw=true)

## Getting Started

**1.** Cloning the repository:

```bash
git clone https://github.com/riad-azz/instagram-video-downloader.git
```

**2.** Installing dependencies:

```bash
cd instagram-video-downloader
```

```bash
npm install
```

**3.** Starting the server:

```bash
# Development
npm run dev

# Build
npm run build

# Start
npm run start
```

**4.** Running Tests:

I am using [jest](https://jestjs.io/) for testing, you can find all the test files in `src/__tests__`.

```bash
# Run all tests
npm run test

# Run a single test
npx jest -t "<test-name>"

# Example
npx jest -t "success-fetchPostJson"
```

## Authenticated API

You can use a session cookie to authenticate your requests by setting the `INSTAGRAM_COOKIE` environment variable:

```env
# INSTAGRAM - API
INSTAGRAM_COOKIE="YOUR-INSTAGRAM-COOKIE"

# ...other variables
```

Next go to the `src/configs/instagram.ts` file and make sure that `enableUserAPI` is set to `true`:

```js
// Instagram API
export const instagramCookie = process.env.INSTAGRAM_COOKIE ?? "";
export const enableUserApi = !!instagramCookie && true; // <---- Here make sure its true
// ... Other vars
```

**DISCLAIMER**: The account might be permanently suspended by Instagram. Use at your own risk.

## Server API

The Server API is disabled by default but you can enable it by :

1. Go to `src/configs/instagram.ts`
2. Set `enableServerAPI` to `true`.

Now you can use the API and integrate this functionality in your other applications.

### Endpoint: /api/video?url={POST_URL}

Parameters :

- `url` : Instagram Post or Reel link **(required)**.

#### GET Request example

```bash
curl -i "http://localhost:3000/api/video?url=https://www.instagram.com/p/CGh4a0iASGS"
```

#### API Response

![API response preview](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/api-response-preview.png?raw=true)

## Rate Limiter - Upstash

In order to reduce the load on the API and ensure optimal performance, I have implemented rate limiting using Upstash. This integration allows me to restrict the number of requests made to the API within a specified time frame, preventing excessive traffic and potential service disruptions.

To enable this feature follow these steps:

1. Create an account on [upstash.com](https://upstash.com/).
2. Create a new Redis database.
3. Click on the newly created database.
4. Scroll down to REST API, click on `.env` and copy the two variables provided.
5. Create a new `.env.local` file in the root directory.
6. Paste what you copied inside and add `USE_UPSTASH` and set it to `true`.

Here is what your `.env.local` should look like:

```env
# ...other variables
USE_UPSTASH="true"
UPSTASH_REDIS_REST_URL="YOUR-UPSTASH-URL"
UPSTASH_REDIS_REST_TOKEN="YOUR-UPSTASH-TOKEN"
```

All ratelimit configs can be found in `src/configs/upstash.ts`.

If you would like to change the identifier (default is IP) you can change it in `src/middleware.ts`.

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
