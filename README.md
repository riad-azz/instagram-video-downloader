# Instagram Videos Downloader

Simple Website/API for downloading instagram videos

## Description

A website that lets you download Instagram videos easily and quickly. You can paste the link or ID of any public Instagram post and get the video file in MP4 format. there is also an API that you can use to integrate this functionality into your own applications. The API is simple, and it returns JSON responses with the video URL and other metadata.

**You can preview and try the website live in vercel here : [Instagram Videos Downloader](https://riad-insta.vercel.app/)**

## Getting Started

### Website Preview

![webpage preview image](screenshots/sc-01.png)

![webpage preview image](screenshots/sc-02.png)

![webpage preview image](screenshots/sc-03.png)

## Installation & Running

1. Cloning the repository

```bash
git clone https://github.com/riad-azz/instagram-videos-downloader.git
```

2. Installing dependencies

```bash
cd instagram-videos-downloader
```

```bash
# Install packages
npm install
```

3. Starting the server

```bash
# Development
npm run dev

# Build 
npm run build

# Start
npm run start
```

## API Documentation

The API is pretty simple and straightforward.

Endpoint `/api/post` takes a Instagram post or reel URL as a param `url` _(required)_.

`GET /api/post?url={POST_URL}`

```bash
# GET REQUEST
curl -i "https://riad-insta.vercel.app/api/post?url=https://www.instagram.com/p/CGh4a0iASGS"
```

```bash
# JSON RESPONSE
{
  "id": "CGh4a0iASGS",
  "username": "rick_roll_memes",
  "videos":[
    {
    "width":"720"
    "height":"720"
    "caption": "post caption",
    "description": "(?) Likes count, (?) Comments count - Extra description info",
    "uploadDate": "2023-01-24T08:01:47-07:00",
    "url": "https://scontent.cdninstagram.../.../121671754_677314989877709_3634507045561235384_n.mp4...."
    "thumbnail": "https://scontent.cdninstagram.../.../121828820_350967549295657_6595550933958484113_n.jpg....",
    }
  ]
}
```

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details