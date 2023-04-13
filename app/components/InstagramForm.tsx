"use client";
import React, { useState } from "react";

const InstagramForm = () => {
  const [url, setUrl] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    //TODO: FINISH ADDING DOWNLOAD FUNCTIONALITY
  }

  return (
    <form
      method="POST"
      action="/api/post"
      className="flex gap-2"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="e.g. www.instagram.com/p/CGh4a0iASGS"
        className="w-full px-2 py-1 border border-slate-300 outline-none rounded"
      />
      <button
        type="submit"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </button>
    </form>
  );
};

export default InstagramForm;
