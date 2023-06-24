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

## Instagram API

Incorporating this feature may be considered advanced and is not recommended if you don't know what you are doing. I will not go into details on how to obtain the Session cookie, but to put it simply you just have to login to your Instagram account and open the developer tools of your browser then go to the networking tab and you should be able to find your Session cookie in the request headers.

I do not recommend this if you host your application on a serverless platform because your Instagram session is likely to expire due to the account being accessed from many different regions.

To enable this simply follow these steps:

1. Set `enableUserApi` to `true` in `src/configs/instagram.ts` .
2. Create `.env.local` file in the root directory of the project.
3. Get your Session Cookie from Instagram (I recommend using a dummy account for this).
4. Copy the Cookie and paste it in the `.env.local` as `AUTH_COOKIE` file that you created.

This is how your `.env.local` should look like:

```env
AUTH_COOKIE="YOUR-IG-SESSION-COOKIE"
```

If you are confused just check `.env.example` and copy whats there then replace with your Session cookie.

**Note** : If your cookie contains `\054` which most likely it will, this is known as an octal escape sequence and you will have to escape all of them by adding backslash `\\054`. If you don't do this you will get an error and the app won't run.

For example (this is not a real cookie just for demonstration) :

```env
AUTH_COOKIE='sessionid=665465&sd44d.....rur="CLN\05459230432636\0541719114429:01f7f46f618c340f4457ebb"'
```

This will become :

```env
AUTH_COOKIE='sessionid=665465&sd44d.....rur="CLN\\05459230432636\\0541719114429:01f7f46f618c340f4457ebb"'
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

- `url` : Instagram Post or Reel link **(required)**.

#### GET Request example

```bash
curl -i "https://riad-insta.vercel.app/api?url=https://www.instagram.com/p/CGh4a0iASGS"
```

#### API Response

![API response preview](https://github.com/riad-azz/readme-storage/blob/main/instagram-videos-downloader/api-response.png?raw=true)

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
