import InstagramForm from "@/components/InstagramForm";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="container mx-auto w-full rounded p-4 md:max-w-2xl">
        <header className="mb-8 motion-safe:animate-[animate-drop_1.5s_ease-in-out_1]">
          <h1 className="mb-1 text-center text-2xl font-bold">
            Instagram Video Downloader
          </h1>
          <h2 className="mb-2 text-center text-xl">
            Download Videos and Reels for Free
          </h2>
          <p className="text-center">
            Easily download Instagram videos and reels by copying and pasting
            the post or reel URL into our fast and reliable downloader.
          </p>
        </header>
        <InstagramForm />
      </main>
    </>
  );
}
