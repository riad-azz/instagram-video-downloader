"use client";
import { useState, FormEvent } from "react";

import { APIResponse, VideoInfo } from "@/types";
import { Exception, ClientException } from "@/lib/exceptions";
import { fetchVideoInfoAction } from "@/lib/instagram/actions";

import AlertError from "@/components/AlertError";
import DownloadButton from "@/components/ui/DownloadButton";
import InstagramInput from "@/components/instagram/InstagramInput";

const validateFormInput = (postUrl: string) => {
  if (!postUrl) {
    throw new ClientException("Instagram URL was not provided");
  }

  if (!postUrl.includes("instagram.com/")) {
    throw new ClientException("Invalid URL does not contain Instagram domain");
  }

  if (!postUrl.startsWith("https://")) {
    throw new ClientException(
      'Invalid URL it should start with "https://www.instagram.com..."'
    );
  }

  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

  if (!postRegex.test(postUrl) && !reelRegex.test(postUrl)) {
    throw new ClientException("URL does not match Instagram post or reel");
  }
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
    setIsLoading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Check user input
      validateFormInput(postUrl);
      // Attempt to download
      await downloadPostVideo(postUrl);
    } catch (error: any) {
      return handleError(error);
    }

    setIsLoading(false);
  }

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <AlertError errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      <div className="flex w-full flex-col items-center gap-2 md:flex-row">
        <InstagramInput
          postUrl={postUrl}
          setPostUrl={setPostUrl}
          isLoading={isLoading}
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
