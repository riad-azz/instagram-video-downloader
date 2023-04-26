"use client";

import { useState, FormEvent } from "react";
import DownloadButton from "@/components/ui/DownloadButton";

const InstagramForm = () => {
  const [postUrl, setPostUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function downloadVideo(filename: string, downloadUrl: any) {
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
    // Reset error message
    setErrorMsg("");
  }

  async function fetchVideo() {
    if (!postUrl) {
      return setErrorMsg("Instagram URL was not provided");
    }

    if (!postUrl.includes("instagram.com/")) {
      return setErrorMsg("Invalid URL does not contain Instagram domain");
    }

    if (!postUrl.startsWith("https://")) {
      return setErrorMsg(
        'Invalid URL it should start with "https://www.instagram.com..."'
      );
    }

    const postRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

    const reelRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

    if (!postRegex.test(postUrl) && !reelRegex.test(postUrl)) {
      return setErrorMsg("URL does not match Instagram post or reel");
    }

    try {
      const response = await fetch(`/api/post?url=${postUrl}`, {
        method: "POST",
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.error) return setErrorMsg(data.error);
        const filename = data.filename;
        const downloadUrl = data.downloadUrl;
        await downloadVideo(filename, downloadUrl);
      } else {
        return setErrorMsg("Internal server error");
      }
    } catch (error) {
      console.error(error);
      return setErrorMsg("Something went wrong take a guess!!");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await fetchVideo();
    } catch (error) {
      console.error(error);
      return setErrorMsg("Something went wrong take a guess!!");
    }

    setLoading(false);
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
          className="w-full rounded border border-gray-400 px-2 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <DownloadButton loading={loading} />
      </form>
    </>
  );
};

export default InstagramForm;
