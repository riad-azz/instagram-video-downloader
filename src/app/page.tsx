import { InstagramForm } from "@/components/instagram/InstagramForm";

export default function HomePage() {
  return (
    <main className="container mx-auto my-8 w-full flex-1 rounded p-4 md:max-w-3xl">
      <section className="mb-8 motion-safe:animate-[animate-drop_1.5s_ease-in-out_1]">
        <h1 className="mb-2 text-center text-3xl font-bold sm:text-4xl">
          Instagram Video Downloader
        </h1>
        <p className="mb-4 text-center text-sm sm:text-base">
          Instagram Video Downloader tool , designed to effortlessly download
          high-quality Instagram content for free. No registration or account
          required. You can save videos and reels by copying and pasting the
          Instagram URL.
        </p>
      </section>
      <section>
        <InstagramForm />
        <p className="my-4 text-center text-sm text-gray-500 motion-safe:animate-[animate-late-fade-in_2s_ease-in-out_1] dark:text-gray-400">
          If the download opens a new page, just right click the video and then
          click `Save as video`
        </p>
      </section>
      <article className="h-0 select-none overflow-hidden">
        <h1>Welcome to Insta Videos Downloader</h1>
        <p>
          Discover the premier destination for hassle-free Instagram video
          downloads. With Insta Videos Downloader, you can effortlessly save
          Instagram videos to your device and enjoy them offline, anytime,
          anywhere.
        </p>
        <p>
          Whether you&pos;re seeking entertaining moments, informative
          tutorials, or inspiring content, Insta Videos Downloader has you
          covered.
        </p>
        <p>
          Our user-friendly interface ensures a seamless experience, allowing
          you to download Instagram videos with just a few clicks. Simply paste
          the video URL, select your desired quality, and voila! Your favorite
          Instagram videos are at your fingertips.
        </p>
        <p>
          Unlock the potential of sharing and rewatching Instagram videos with
          ease. Showcasing a vast array of genres, from comedy sketches to
          stunning travel footage, Insta Videos Downloader lets you curate a
          personalized video library that resonates with your interests.
        </p>
        <p>
          Our advanced technology guarantees swift and secure downloads,
          maintaining the original video quality without any compromise.
          Experience the freedom to enjoy Instagram videos offline, even when
          internet access is limited.
        </p>
        <p>
          Join thousands of satisfied users who rely on Insta Videos Downloader
          as their go-to platform for Instagram video downloads. Don&apos;t miss
          out on the captivating content shared by your favorite creators;
          download and save Instagram videos effortlessly.
        </p>
        <p>
          Get started with Insta Videos Downloader today and unlock a world of
          limitless entertainment at your fingertips. Start building your
          personal video collection and share your favorite moments with friends
          and followers. Download Instagram videos with ease and elevate your
          viewing experience with Insta Videos Downloader - the ultimate tool
          for Instagram video enthusiasts.
        </p>
      </article>
    </main>
  );
}
