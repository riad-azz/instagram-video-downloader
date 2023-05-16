import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { InstagramForm } from "@/components/instagram/InstagramForm";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <main className="container mx-auto w-full flex-1 rounded p-4 md:max-w-3xl">
        <header className="mb-8 motion-safe:animate-[animate-drop_1.5s_ease-in-out_1]">
          <h1 className="mb-2 text-center text-2xl font-bold sm:text-4xl">
            Instagram Downloader
          </h1>
          <p className="mb-4 text-center text-sm md:text-base">
            Riad Insta is a tool that lets you download Instagram content in
            high quality for free. You can save videos and reels with a few
            steps. Just copy and paste the Instagram URL and enjoy unlimited
            downloads with no login required.
          </p>
        </header>
        <InstagramForm />
        <p className="my-4 text-center text-sm text-gray-500 motion-safe:animate-[animate-late-fade-in_3s_ease-in-out_1] dark:text-gray-400">
          If the download opens a new page, just right click the video and then
          click `Save as video`
        </p>
      </main>
      <Footer />
    </div>
  );
}
