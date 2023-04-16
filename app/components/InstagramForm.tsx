"use client";
import React, { useState, FormEvent } from "react";

const InstagramForm = () => {
  const [postUrl, setPostUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function downloadVideo(downloadUrl: string, filename: string) {
    await fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
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
        const downloadUrl = data.downloadUrl;
        const filename = data.filename;
        await downloadVideo(downloadUrl, filename);
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
      {errorMsg && <div className="text-red-500 mb-1">{errorMsg}</div>}
      <form
        className="flex flex-col items-center gap-4 md:flex-row md:gap-2 motion-safe:animate-[animate-up_1.5s_ease-in-out_1]"
        onSubmit={handleSubmit}
      >
        <input
          type="url"
          value={postUrl}
          autoFocus={true}
          onChange={(e) => setPostUrl(e.target.value)}
          placeholder="e.g. https://www.instagram.com/p/CGh4a0iASGS"
          aria-label="Instagram video download URL input"
          title="Instagram video download URL input"
          className="w-full px-2 py-2 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border border-gray-400 focus:ring-2 focus:ring-slate-300 focus:border-transparent focus:outline-none rounded"
        />
        {loading ? (
          <button
            disabled
            aria-label="Loading Instagram video download"
            title="Loading Instagram video download"
            type="button"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:text-white rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-300 focus:z-10 focus:ring-2 focus:ring-gray-200 focus:outline-none focus:text-blue-700 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-gray-200 animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Fetching
          </button>
        ) : (
          <button
            aria-label="Download Instagram video"
            title="Download Instagram video"
            type="submit"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:text-white rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-300 focus:z-10 focus:ring-2 focus:ring-gray-200 focus:outline-none focus:text-blue-700 inline-flex items-center"
          >
            <svg
              aria-label="download icon"
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download</span>
          </button>
        )}
      </form>
    </>
  );
};

export default InstagramForm;
