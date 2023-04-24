# Instagram Videos Downloader

Simple Website/API for downloading instagram videos made with Next.js 13 app directory

## Description

A website that lets you download Instagram videos easily and quickly. You can paste the URL of any public Instagram post and get the video file in MP4 format. there is also an API that you can use to integrate this functionality into your own applications. The API is simple, and it returns JSON responses with the video URL and other metadata.

Note : This does not work on instagram stories.

**You can preview and try the website live in vercel here : [riad-insta.vercel.app](https://riad-insta.vercel.app/)**

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

1. Cloning the repository

```bash
git clone https://github.com/riad-azz/instagram-video-downloader.git
```

2. Installing dependencies

```bash
cd instagram-video-downloader
```

```bash
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
curl -i "https://riad-insta.vercel.app/api/post?url=https://www.instagram.com/p/CGh4a0iASGS"
```

```bash
{
  "username": "rick_roll_memes",
  "caption": "Rick roll day #rickroll #rickrolled #rickrolling #rickastley #rickastleytou...",
  "width":"720"
  "height":"480"
  "downloadUrl": "https://scontent.cdninstagram.../.../121671754_677314989877709_3634507045561235384_n.mp4..."
  "thumbnailUrl": "https://scontent.cdninstagram.../.../121828820_350967549295657_6595550933958484113_n.jpg...",
}
```

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
