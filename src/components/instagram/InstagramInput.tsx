import React from "react";
import { MdClear } from "react-icons/md";

export type InstagramInputProps = {
  postUrl: string;
  setPostUrl: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
};

const InstagramInput = (props: InstagramInputProps) => {
  const { postUrl, setPostUrl, isLoading } = props;
  return (
    <div className="relative h-[50px] w-full">
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
        className="h-[50px] w-full rounded border-gray-400 text-sm md:text-base"
        disabled={isLoading}
      />
      {postUrl && !isLoading && (
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <button
            type="button"
            aria-label="Clear URL input"
            onClick={() => setPostUrl("")}
            className="flex items-center rounded bg-gray-500 p-2 text-white"
          >
            <MdClear className="text-xl" />
            <span className="text-sm font-light">Clear</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default InstagramInput;
