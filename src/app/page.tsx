import Image from "next/image";

import InstagramForm from "@/components/instagram/InstagramForm";
import { cn } from "@/utils";

export default function HomePage() {
  return (
    <main className="flex w-full flex-1 flex-col items-center gap-8">
      <div
        id="#download"
        className={cn(
          "flex w-full flex-col items-center px-4 py-24 shadow-sm",
          "bg-gradient-to-r from-blue-600 to-purple-600"
        )}
      >
        <h1
          className={cn(
            "py-2 text-center text-2xl font-extrabold text-white sm:text-4xl"
          )}
        >
          Instagram Video Downloader
        </h1>
        <InstagramForm />
        <p className="my-4 text-center text-xs text-white md:text-sm">
          If the download opens a new page, just right click the video and then
          click `Save as video`
        </p>
      </div>
    </main>
  );
}
