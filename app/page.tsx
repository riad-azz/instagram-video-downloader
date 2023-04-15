import Link from "next/link";
import InstagramForm from "./components/InstagramForm";
import Image from "next/image";
import NavLink from "./components/NavLink";
import ThemeButton from "./components/ThemeButton";

export default function Home() {
  return (
    <>
      <header className="flex flex-col md:flex-row md:px-8 gap-2 w-full justify-between items-center px-2 py-1.5 mb-12 border-b">
        <div className="flex gap-1 items-center text-xl font-bold tracking-tight">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <Link href="/">Instagram Downloader</Link>
        </div>
        <ul className="flex gap-2">
          <NavLink
            target="_blank"
            content="Github Repository"
            href="https://github.com/riad-azz/instagram-videos-downloader"
            animation="motion-safe:animate-[animate-slide-right_1s_ease-in-out_1]"
          />
          <NavLink
            target="_blank"
            content="Author"
            href="https://github.com/riad-azz/"
            animation="motion-safe:animate-[animate-slide-right_1s_ease-in-out_1]"
          />
          <ThemeButton></ThemeButton>
        </ul>
      </header>
      <main className="container w-full md:max-w-2xl mx-auto p-4 border rounded">
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
