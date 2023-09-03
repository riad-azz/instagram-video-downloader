import { ButtonHTMLAttributes } from "react";
import { AiOutlineLoading3Quarters, AiOutlineDownload } from "react-icons/ai";

export interface DownloadButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  isLoading,
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        className="flex h-[50px] w-full items-center justify-center gap-2 rounded border border-gray-700 bg-[#1b1b1e] p-3 text-sm tracking-wide outline-none hover:bg-opacity-80 focus:outline-blue-600 md:w-[250px]"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin" />
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
