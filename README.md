# Instagram Videos Downloader

Simple Website/API for downloading instagram videos made with Next.js 13 app directory

## Description

A website that lets you download Instagram videos easily and quickly. You can paste the URL of any public Instagram post and get the video file in MP4 format. there is also an API that you can use to integrate this functionality into your own applications. The API is simple, and it returns JSON responses with the video URL and other metadata.

_PS: Instagram stories aren't supported._

You can preview and try the website live in vercel here : [riad-insta.vercel.app](https://riad-insta.vercel.app/)

## Website Preview

The frontend includes the following:

- Dark/Light themes supported.
- Responsive UI on mobile.
- Easy and User friendly UI (Interactions feedback and error messages).

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

I am using [jest](https://jestjs.io/) for testing which is pretty simple and easy to use. You can find all the test files in `src/__tests__`.

```bash
# Run all tests
npm run test
```

> Run a single test

```bash
# Run a single test
npx jest -t "<test-name>"

# Example
npx jest -t "success-fetchPostJson"
```

## Authenticated Instagram API

Incorporating this feature may be considered advanced and is not recommended if you don't know what you are doing. I will not go into details on how to obtain the **Session Cookie**, but to put it simply you have to login to your Instagram account and open the developer tools of your browser and go to the networking tab and you should be able to find your **Session Cookie** in the request headers.

To enable this simply follow these steps:

1. Set `enableUserApi` to `true` in `src/configs/instagram.ts` .
2. Create `.env.local` file in the root directory of the project.
3. Get your Session Cookie from Instagram (I recommend using a dummy account for this).
4. Copy the Session Cookie and paste it in the `.env.local` as `AUTH_COOKIE` file that you created.

If you are confused just check `.env.example` and copy whats there then replace with your Session cookie.

This is how your `.env.local` should look like:

```env
AUTH_COOKIE="YOUR-IG-SESSION-COOKIE"
```

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

## API Documentation

The API is disabled by default but you can enable it by :

1. Go to `src/configs/instagram.ts`
2. Set `enableServerAPI` to `true`.

Now you can use `/api` from other applications.

### Endpoint: /api?url={POST_URL}

Parameters :

- `url` : Instagram Post or Reel link **(required)**.

#### GET Request example

```bash
curl -i "http://localhost:3000/api?url=https://www.instagram.com/p/CGh4a0iASGS"
```

#### API Response

![API response preview](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/api-response.png?raw=true)

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
