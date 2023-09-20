import InstagramForm from "@/components/instagram/InstagramForm";
import { cn } from "@/utils";

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
      <div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-4 text-center font-semibold text-primary sm:text-2xl">
          Download Instagram Videos For Free
        </h2>
        <InstagramForm />
        <p className="my-4 text-center text-sm text-secondary motion-safe:animate-[animate-late-fade-in_2s_ease-in-out_1]">
          If the download opens a new page, just right click the video and then
          click `Save as video`
        </p>
      </div>
    </main>
  );
}
