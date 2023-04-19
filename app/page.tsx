import InstagramForm from "@/components/instagram-form";
import Navbar from "@/components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto w-full rounded p-4 md:max-w-2xl">
        <header className="mb-8 motion-safe:animate-[animate-drop_1.5s_ease-in-out_1]">
          <h1 className="mb-1 text-center text-xl font-bold sm:text-2xl">
            Instagram Video Downloader
          </h1>
          <p className="text-center text-sm md:text-base">
            Easily download Instagram videos and reels by copying and pasting
            URL into our fast and reliable downloader.
          </p>
        </header>
        <InstagramForm />
      </main>
    </>
  );
}
