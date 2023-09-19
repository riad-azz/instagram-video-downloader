"use client";

import { useState, useRef, FormEvent } from "react";
import { APIResponse, VideoInfo } from "@/types";
import { Exception, ClientException } from "@/exceptions";
import { validateFormInput } from "@/lib/instagram/validators";
import { fetchVideoInfoAction } from "@/lib/instagram/actions";

import AlertError from "@/components/AlertError";
import DownloadButton from "@/components/ui/DownloadButton";

const downloadVideo = async (filename: string, downloadUrl: any) => {
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

export default function InstagramForm() {
  const [postUrl, setPostUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const errorCount = useRef<number>(0);

  function handleError(error: any) {
    if (error instanceof Exception) {
      setErrorMsg(error.message);
    } else {
      console.error(error);
      errorCount.current++;
      if (errorCount.current > 5) {
        setErrorMsg(
          "Something went wrong, if this problem persists contact the developer."
        );
      } else {
        setErrorMsg("Something went wrong, please try again.");
      }
    }
    setIsLoading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      validateFormInput(postUrl);
    } catch (error: any) {
      return handleError(error);
    }

    try {
      const response: APIResponse<VideoInfo> =
        await fetchVideoInfoAction(postUrl);

      if (response.status === "error") {
        throw new ClientException(response.message);
      }

      if (!response.data) {
        throw new ClientException();
      }

      const { filename, videoUrl } = response.data;
      await downloadVideo(filename, videoUrl);

      errorCount.current = 0;
      setErrorMsg("");
    } catch (error: any) {
      return handleError(error);
    }

    setIsLoading(false);
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-8 shadow-md">
      <h2 className="mb-4 text-center font-semibold text-primary sm:text-2xl">
        Download Instagram Videos For Free
      </h2>
      <AlertError errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      <form
        className="flex flex-col items-center gap-4 md:flex-row md:gap-2"
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
          placeholder="Paste the Instagram URL here..."
          aria-label="Instagram video download URL input"
          title="Instagram video download URL input"
          className="h-[50px] w-full rounded border-gray-400"
        />
        <DownloadButton
          type="submit"
          title="Download Instagram video button"
          aria-label="Download Instagram video button"
          isLoading={isLoading}
        />
      </form>
      <p className="my-4 text-center text-sm text-secondary motion-safe:animate-[animate-late-fade-in_2s_ease-in-out_1]">
        If the download opens a new page, just right click the video and then
        click `Save as video`
      </p>
    </div>
  );
}
