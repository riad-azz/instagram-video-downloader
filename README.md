# Instagram Videos Downloader

Simple Website/API for downloading instagram videos made with Next.js 13 app directory

## Description

A website that lets you download Instagram videos easily and quickly. You can paste the URL of any public Instagram post and get the video file in MP4 format. there is also an API that you can use to integrate this functionality into your own applications. The API is simple, and it returns JSON responses with the video URL and other metadata.

_PS: Instagram stories aren't supported._

You can preview and try the website live in vercel here : [riad-insta.vercel.app](https://riad-insta.vercel.app/)

## Website Preview

The frontend includes the following:

* Dark/Light themes supported.
* Responsive UI on mobile.
* Easy and User friendly UI (Interactions feedback and error messages).

![Website preview](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/website-preview.png?raw=true)

## Getting Started

1.Cloning the repository

```bash
git clone https://github.com/riad-azz/instagram-video-downloader.git
```

2.Installing dependencies

```bash
cd instagram-video-downloader
```

```bash
npm install
```

3.Starting the server

```bash
# Development
npm run dev

# Build
npm run build

# Start
npm run start
```

4.Testing

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

## Rate Limiter - Upstash

In order to reduce the load on the API and ensure optimal performance, I have implemented rate limiting using Upstash. This integration allows me to restrict the number of requests made to the API within a specified time frame, preventing excessive traffic and potential service disruptions.

To set up Upstash create `.env.local` file and insert your `URL` and `Token`:

```env
USE_UPSTASH="true"
UPSTASH_URL="YOUR-UPSTASH-URL"
UPSTASH_TOKEN="YOUR-UPSTASH-TOKEN"
```

All ratelimit configs can be found in `src/configs/upstash.ts`.

If you would like to change the identifier (default is IP) you can change it in `src/middleware.ts`.

## API Documentation

The API is pretty simple and straightforward.

### Endpoint: /api?url={POST_URL}

Parameters :

* `url` : Instagram Post or Reel link **(required)**.

`GET Request example`

```bash
curl -i "https://riad-insta.vercel.app/api?url=https://www.instagram.com/p/CGh4a0iASGS"
```

`GET Response preview`

![API response preview](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/api-response.png?raw=true)

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
