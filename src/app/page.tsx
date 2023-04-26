import InstagramForm from "@/components/InstagramForm";
import Navbar from "@/components/Navigation";
import { Icons } from "@/components/Icons";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-between">
        <Navbar />
        <main className="container mx-auto w-full flex-1 rounded p-4 md:max-w-2xl">
          <header className="mb-4 motion-safe:animate-[animate-drop_1.5s_ease-in-out_1]">
            <h1 className="mb-1 text-center text-xl font-bold sm:text-2xl">
              Instagram Video Downloader
            </h1>
            <p className="mb-4 text-center text-sm md:text-base">
              Download Instagram videos and reels for free with our easy-to-use
              Instagram downloader tool. Save Instagram videos and reels in high
              quality with our fast, reliable downloader.
            </p>
            <p className="text-center text-sm md:text-base">
              Copy and paste the post or reel URL and press on
              <span className="mx-2 inline-flex select-none items-center gap-1">
                <Icons.download />
                Download.
              </span>
            </p>
          </header>
          <InstagramForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
