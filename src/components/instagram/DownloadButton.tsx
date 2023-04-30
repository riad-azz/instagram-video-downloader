import { Icons } from "@/components/Icons";

export interface IDownloadButton {
  isLoading: boolean;
}

export const DownloadButton: React.FC<IDownloadButton> = ({ isLoading }) => {
  return (
    <>
      <button
        aria-label="Download Instagram video"
        title="Download Instagram video"
        type="submit"
        className="inline-flex items-center gap-2 rounded border border-slate-100 bg-white px-5 py-3.5 text-sm font-medium tracking-wide drop-shadow-lg focus:outline-none dark:border-none dark:bg-gray-700 max-md:w-full max-md:justify-center"
      >
        {isLoading && (
          <>
            <Icons.loading />
            <span>Fetching</span>
          </>
        )}
        {!isLoading && (
          <>
            <Icons.download />
            <span>Download</span>
          </>
        )}
      </button>
    </>
  );
};
