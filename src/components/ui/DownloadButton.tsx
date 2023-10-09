import React from "react";

import { AiOutlineLoading3Quarters, AiOutlineDownload } from "react-icons/ai";
import { cn } from "@/utils";

export interface DownloadButtonProps extends React.ComponentProps<"button"> {
  isLoading: boolean;
}

const DownloadButton = (props: DownloadButtonProps) => {
  const { isLoading, className, ...buttonProps } = props;
  return (
    <button
      disabled={isLoading}
      {...buttonProps}
      className={cn(
        "flex items-center justify-center gap-2 rounded p-3 font-bold shadow-md",
        "h-[50px] w-full md:w-[250px]",
        "border border-blue-300",
        "bg-blue-600 text-white",
        "transition-colors duration-200 ease-in-out",
        {
          "hover:bg-blue-500": !isLoading,
          "cursor-not-allowed": isLoading,
        },
        className
      )}
    >
      {isLoading ? (
        <>
          <AiOutlineLoading3Quarters
            className="animate-spin text-xl"
            aria-hidden="true"
          />
          <span aria-hidden="true">Fetching</span>
        </>
      ) : (
        <>
          <AiOutlineDownload className="text-xl" aria-hidden="true" />
          <span aria-hidden="true">Download</span>
        </>
      )}
    </button>
  );
};

export default DownloadButton;
