import { InstagramForm } from "@/components/instagram/InstagramForm";

export default function HomePage() {
  return (
    <main className="container mx-auto w-full flex-1 rounded p-4 md:max-w-3xl">
      <header className="mb-8 motion-safe:animate-[animate-drop_1.5s_ease-in-out_1]">
        <h1 className="mb-2 text-center text-2xl font-bold sm:text-4xl">
          Instagram Downloader
        </h1>
        <p className="mb-4 text-center text-sm md:text-base">
          Riad Insta is a tool that lets you download Instagram content in high
          quality for free. You can save videos and reels with a few steps. Just
          copy and paste the Instagram URL and enjoy unlimited downloads with no
          login required.
        </p>
      </header>
      <InstagramForm />
    </main>
  );
}
