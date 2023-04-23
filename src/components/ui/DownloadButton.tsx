import { Icons } from "@/components/Icons";

const DownloadButton = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading && (
        <button
          disabled
          aria-label="Loading Instagram video download"
          title="Loading Instagram video download"
          type="button"
          className="inline-flex items-center gap-2 rounded border border-gray-400 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-blue-300 max-md:w-full max-md:justify-center"
        >
          <Icons.loading />
          <span>Fetching</span>
        </button>
      )}
      {!loading && (
        <button
          aria-label="Download Instagram video"
          title="Download Instagram video"
          type="submit"
          className="inline-flex items-center gap-2 rounded border border-gray-400 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-blue-300 max-md:w-full max-md:justify-center"
        >
          <Icons.download />
          <span>Download</span>
        </button>
      )}
    </>
  );
};

export default DownloadButton;
