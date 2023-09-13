import { ButtonHTMLAttributes } from "react";
import { AiOutlineLoading3Quarters, AiOutlineDownload } from "react-icons/ai";
import { cn } from "@/lib/utils";

export interface DownloadButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

const DownloadButton = (props: DownloadButtonProps) => {
  const { isLoading, className, ...otherProps } = props;
  return (
    <>
      <button
        {...otherProps}
        className={cn(
          "flex items-center justify-center gap-2 rounded p-3",
          "h-[50px] w-full md:w-[250px]",
          "bg-blue-500 text-white hover:bg-blue-600",
          className
        )}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
            <span>Fetching</span>
          </>
        ) : (
          <>
            <AiOutlineDownload className="text-xl" />
            <span>Download</span>
          </>
        )}
      </button>
    </>
  );
};

export default DownloadButton;
