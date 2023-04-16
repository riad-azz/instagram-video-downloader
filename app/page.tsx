import InstagramForm from "./components/InstagramForm";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="container w-full md:max-w-2xl mx-auto p-4 rounded">
        <header className="mb-8 motion-safe:animate-[animate-drop_1.5s_ease-in-out_1]">
          <h1 className="text-2xl font-bold text-center mb-1">
            Instagram Video Downloader
          </h1>
          <h2 className="text-xl text-center mb-2">
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
