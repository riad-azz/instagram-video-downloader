"use client";
import { useState, FormEvent } from "react";

import { APIResponse, VideoInfo } from "@/types";
import { Exception, ClientException } from "@/lib/exceptions";
import { fetchVideoInfoAction } from "@/lib/instagram/actions/fetchVideoInfo";

import AlertError from "@/components/ui/AlertError";
import DownloadButton from "@/components/ui/DownloadButton";
import InputField from "@/components/ui/InputField";

const isValidFormInput = (postUrl: string) => {
  if (!postUrl) {
    return "Instagram URL was not provided";
  }

  if (!postUrl.includes("instagram.com/")) {
    return "Invalid URL does not contain Instagram domain";
  }

  if (!postUrl.startsWith("https://")) {
    return 'Invalid URL it should start with "https://www.instagram.com..."';
  }

  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

  if (!postRegex.test(postUrl) && !reelRegex.test(postUrl)) {
    return "URL does not match Instagram post or reel";
  }

  return "";
};

const downloadFile = async (filename: string, downloadUrl: string) => {
  try {
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
  } catch (error) {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    console.log(error);
  }
};

const downloadPostVideo = async (postUrl: string) => {
  const inputError = isValidFormInput(postUrl);
  if (inputError) {
    throw new ClientException(inputError);
  }

  const response: APIResponse<VideoInfo> = await fetchVideoInfoAction(postUrl);

  if (response.status === "error") {
    throw new ClientException(response.message);
  }

  if (!response.data) {
    throw new ClientException();
  }

  const { filename, videoUrl } = response.data;
  await downloadFile(filename, videoUrl);
};

export default function InstagramForm() {
  const [postUrl, setPostUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleError(error: any) {
    if (error instanceof Exception) {
      setErrorMsg(error.message);
    } else {
      console.error(error);
      setErrorMsg("Something went wrong, please try again.");
    }
  }

  function handleClear() {
    setPostUrl("");
    setErrorMsg("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      await downloadPostVideo(postUrl);
    } catch (error: any) {
      handleError(error);
    }

    setIsLoading(false);
  }

  return (
    <form
      className="flex w-full max-w-3xl flex-col items-center"
      onSubmit={handleSubmit}
    >
      <AlertError errorMsg={errorMsg} handleReset={() => setErrorMsg("")} />
      <div className="flex w-full flex-col items-center gap-2 md:flex-row">
        <InputField
          id="url-input"
          type="url"
          placeholder="Paste the Instagram URL here..."
          aria-label="Instagram video download URL input"
          title="Instagram video download URL input"
          value={postUrl}
          onChange={(e) => setPostUrl(e.target.value)}
          isLoading={isLoading}
          handleClear={handleClear}
          className="h-[50px] w-full rounded border-gray-400 text-sm focus:ring-white md:text-base"
          autoComplete="on"
          autoFocus
          required
        />
        <DownloadButton
          type="submit"
          title="Download Instagram video button"
          aria-label="Download Instagram video button"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}
