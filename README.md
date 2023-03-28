# Instagram Videos Downloader

Simple website/api for downloading instagram videos

## Description

A website that lets you download Instagram videos easily and quickly. You can paste the ID of any public Instagram post and get the video file in MP4 format. there is also an API that you can use to integrate this functionality into your own applications. The API is simple, and it returns JSON responses with the video URL and other metadata.

**You can preview and try the website live in my replit here : [Instagram Videos Downloader](https://insta-vids-downloder.riadazzoun.repl.co)**

## Getting Started

### Website Preview

![webpage preview image](screenshots/sc-01.png)

![webpage preview image](screenshots/sc-02.png)

![webpage preview image](screenshots/sc-03.png)

## API Documentation

The api is pretty simple and straightforward.

there is one endpoint "/api" that takes two params "id" _(required)_ and "all" _(optional, defaults to false)_

if you want to get the first video from the post just pass the "id" param, if you want to get all the videos in the post set the "all" param to true.

### Single video request

`GET /api?id={POST_ID}`

```bash
curl -i "http://localhost:3000/api?id=CGh4a0iASGS"
```

```bash
{
    "id": CGh4a0iASGS,
    "username": "riad-azz",
    "createdDate":"2023-01-24T08:01:47-07:00",
    "caption": "post caption",
    "description": "24 Likes, 10 Comments - extra description info",
    "thumbnail": "THUMBNAIL_URL",
    "url": "MP4_FILE_URL"
}
```

### All videos request

`GET /api?id={POST_ID}&all=true`

```bash
curl -i "http://localhost:3000/api?id=CGh4a0iASGS&all=true"
```

```bash
{
    "id": CGh4a0iASGS,
    "username": "riad-azz",
    "createdDate":"2023-01-24T08:01:47-07:00",
    "videos":[
        {
        "caption": "post caption",
        "description": "24 Likes, 10 Comments - extra description info",
        "thumbnail": "THUMBNAIL_URL",
        "url": "MP4_FILE_URL"
        }
    ]
}
```

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
