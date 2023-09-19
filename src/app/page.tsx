import InstagramForm from "@/components/InstagramForm";

import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-8">
      <h1
        className={cn(
          "py-2 text-center text-xl font-extrabold sm:text-4xl",
          "animate-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"
        )}
      >
        Instagram Video Downloader
      </h1>
      <InstagramForm />
    </main>
  );
}
