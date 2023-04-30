"use client";

import { useState, FormEvent } from "react";
import { DownloadButton } from "./DownloadButton";
import {
  IGException,
  IGClientException,
} from "@/exceptions/instagramExceptions";

const validateInput = (postUrl: string) => {
  if (!postUrl) {
    throw new IGClientException("Instagram URL was not provided");
  }

  if (!postUrl.includes("instagram.com/")) {
    throw new IGClientException(
      "Invalid URL does not contain Instagram domain"
    );
  }

  if (!postUrl.startsWith("https://")) {
    throw new IGClientException(
      'Invalid URL it should start with "https://www.instagram.com..."'
    );
  }

  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

  if (!postRegex.test(postUrl) && !reelRegex.test(postUrl)) {
    throw new IGClientException("URL does not match Instagram post or reel");
  }
};

const downloadVideo = async (filename: string, downloadUrl: any) => {
  await fetch(downloadUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.target = "_blank";
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
};

const fetchVideo = async (postUrl: string) => {
  const response = await fetch(`/api/instagram?url=${postUrl}`, {
    method: "POST",
  });

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new IGClientException("Internal server error");
  }
  const data = await response.json();
  if (data.error) {
    throw new IGClientException(data.error);
  }
  const filename = data.filename;
  const downloadUrl = data.downloadUrl;
  await downloadVideo(filename, downloadUrl);

  return true;
};

export const InstagramForm = () => {
  const [postUrl, setPostUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleError(error: any) {
    if (error instanceof IGException) {
      setErrorMsg(error.message);
    } else {
      console.error(error);
      setErrorMsg("Something went wrong take a guess!!");
    }
    setIsLoading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      validateInput(postUrl);
    } catch (error: any) {
      return handleError(error);
    }

    try {
      const isSuccess = await fetchVideo(postUrl);
      if (isSuccess) setErrorMsg("");
    } catch (error: any) {
      return handleError(error);
    }

    setIsLoading(false);
  }

  return (
    <>
      {errorMsg !== "" && (
        <div className="mb-1 text-sm text-red-500 md:text-base">{errorMsg}</div>
      )}
      <form
        className="flex flex-col items-center gap-4 motion-safe:animate-[animate-up_1.5s_ease-in-out_1] md:flex-row md:gap-2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="url-input" className="sr-only">
          instagram URL input
        </label>
        <input
          id="url-input"
          type="url"
          value={postUrl}
          autoFocus={true}
          onChange={(e) => setPostUrl(e.target.value)}
          placeholder="e.g. https://www.instagram.com/p/CGh4a0iASGS"
          aria-label="Instagram video download URL input"
          title="Instagram video download URL input"
          className="w-full rounded border border-slate-100 px-2 py-3 placeholder-gray-400/80 drop-shadow-md focus:outline-none dark:border-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <DownloadButton isLoading={isLoading} />
      </form>
    </>
  );
};
