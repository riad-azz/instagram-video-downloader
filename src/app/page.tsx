import Image from "next/image";

import InstagramForm from "@/components/instagram/InstagramForm";
import { cn } from "@/utils";

export default function HomePage() {
  return (
    <main className="flex w-full flex-1 flex-col items-center gap-8">
      <div
        id="#download"
        className={cn(
          "flex w-full flex-col items-center px-4 py-12 shadow-sm",
          "bg-gradient-to-r from-blue-600 to-purple-600"
        )}
      >
        <h1
          className={cn(
            "py-2 text-center text-2xl font-extrabold text-white sm:text-4xl"
          )}
        >
          Instagram Video Downloader
        </h1>
        <InstagramForm />
        <p className="my-4 text-center text-xs text-gray-200 md:text-sm">
          If the download opens a new page, just right click the video and then
          click `Save as video`
        </p>
      </div>

      <div className="container mx-auto flex w-full flex-col items-center">
        <section id="#features" className="flex w-full flex-col items-center">
          <header className="mb-12 flex w-full flex-col items-center text-center">
            <h2 className="mb-2 text-xl font-bold md:text-3xl">
              Features of IG Downloader
            </h2>
            <p className="text-gray-600">
              IG Downloader supports downloading videos from both reels and
              posts links
            </p>
          </header>

          <div className="mb-16 flex w-full max-w-3xl flex-col items-center gap-2 md:flex-row md:gap-8">
            <Image
              src="/images/features/download.jpg"
              width={0}
              height={0}
              sizes="100%"
              quality={100}
              alt="instagram"
              className="h-72 w-full flex-shrink-0 object-cover md:w-72 md:rounded-full"
            />
            <div className="w-full px-2">
              <h4 className="mb-2 text-lg font-semibold">
                Download and Save Videos
              </h4>
              <p className="text-sm text-gray-600">
                Download videos from posts and reels links, and save them to
                your device as MP4 files in high quality resolution to watch
                offline.
              </p>
            </div>
          </div>
          <div className="mb-16 flex w-full max-w-3xl flex-col items-center gap-2 md:flex-row md:gap-8">
            <Image
              src="/images/features/login.jpg"
              width={0}
              height={0}
              sizes="100%"
              quality={100}
              alt="instagram"
              className="h-72 w-full flex-shrink-0 object-cover md:order-2 md:w-72 md:rounded-full"
            />
            <div className="w-full px-2 md:order-1">
              <h4 className="mb-2 text-lg font-semibold">
                No Registration or Login Required
              </h4>
              <p className="text-sm text-gray-600">
                No need to create an account or login to download videos. Just
                copy the link, paste it in the box and click download.
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-3xl flex-col items-center gap-2 md:flex-row md:gap-8">
            <Image
              src="/images/features/share.jpg"
              width={0}
              height={0}
              sizes="100%"
              quality={100}
              alt="instagram"
              className="h-72 w-full flex-shrink-0 object-cover md:w-72 md:rounded-full"
            />
            <div className="w-full px-2">
              <h4 className="mb-2 text-lg font-semibold">
                Share with Your Friends
              </h4>
              <p className="text-sm text-gray-600">
                Download videos and save them on your device to share them with
                your friends any time without the fear of losing your favorite
                memes and funny videos.
              </p>
            </div>
          </div>
        </section>

        <section
          id="#what-is-ig-downloader"
          className="my-12 flex w-full flex-col items-start px-4"
        >
          <h2 className="mb-2 text-lg font-semibold md:text-2xl">
            What is IG Downloader
          </h2>
          <p className="text-sm md:text-base">
            IG Downloader, an incredibly versatile tool, grants you the ability
            to effortlessly download videos from Instagram posts and reels. With
            its user-friendly interface and robust functionality, you can
            seamlessly save these captivating videos to your device, ensuring
            you always have access to your favorite Instagram content. This way,
            you can easily share these videos with your friends or enjoy them
            offline at your convenience, offering a delightful and flexible
            Instagram experience tailored to your preferences.
          </p>
        </section>

        <section
          id="#how-to-use"
          className="mb-12 flex w-full flex-col items-start px-4"
        >
          <h2 className="mb-2 text-lg font-semibold md:text-2xl">
            How To Use IG Downloader
          </h2>

          <div>
            <p className="mb-2">
              <span className="font-bold">Step 1:</span>{" "}
              <span className="text-sm">
                First, go to Instagram and find the video that has captured your
                attention, whether it&apos;s nestled within a post or part of an
                engaging reel. Now, here&apos;s where the magic begins – simply
                copy the video&apos;s link. You can achieve this by either
                copying the link from your browser&apos;s URL bar or, for even
                more convenience, click on those trusty three dots and select
                &ldquo;Copy Link&ldquo;.
              </span>
            </p>
            <p>
              <span className="font-bold">Step 2:</span>{" "}
              <span className="text-sm">
                With the Instagram video link in your clipboard, head over to IG
                Downloader and find the Input Box eagerly waiting for your
                command. Paste the video link here with a simple Ctrl+V (or
                Command+V for our Mac enthusiasts) and hit that
                &ldquo;Download&ldquo; button.
              </span>
            </p>
            <p className="mt-4 text-sm md:text-base">
              And there you have it! With just these two straightforward steps,
              you&apos;ve successfully summoned IG Downloader&apos;s wizardry to
              save the desired video directly onto your device. Now, it&apos;s
              ready to be shared with your friends, ensuring your social circle
              can revel in the captivating content you&apos;ve discovered. Get
              ready to embrace the world of hassle-free Instagram video
              downloading!
            </p>
          </div>
        </section>

        <section
          id="#why-ig-downloader-is-the-best"
          className="mb-12 flex w-full flex-col items-start px-4"
        >
          <h2 className="mb-2 text-lg font-semibold md:text-2xl">
            IG Downloader - The Best Instagram Video Downloader
          </h2>
          <p className="text-sm md:text-base">
            IG Downloader is widely recognized as the premier Instagram video
            downloader in the realm of digital tools and applications. This
            exceptional software distinguishes itself by offering users the
            remarkable ability to effortlessly download videos from both regular
            posts and engaging reels links, enabling you to conveniently save
            these captivating visual moments to your device in the universally
            compatible MP4 format. What sets it apart even further is its
            unwavering commitment to delivering content in the highest quality
            resolution available, ensuring that you can enjoy your downloaded
            videos offline, anytime, and, perhaps most impressively, all of this
            comes at absolutely no cost to you.
          </p>
        </section>

        <section
          id="#can-be-used-on-mobile"
          className="mb-12 flex w-full flex-col items-start px-4"
        >
          <h2 className="mb-2 text-lg font-semibold md:text-2xl">
            Can I use IG Downloader on my Phone?
          </h2>
          <p className="text-sm md:text-base">
            Certainly, you have the option to utilize the IG Downloader
            application right from your smartphone, accessible through any web
            browser of your choice. This convenient feature ensures that you can
            easily access and use IG Downloader&apos;s functionality on your
            mobile device, regardless of the browser you prefer to employ for
            this purpose.
          </p>
        </section>

        <section
          id="#can-download-stories"
          className="mb-12 flex w-full flex-col items-start px-4"
        >
          <h2 className="mb-2 text-lg font-semibold md:text-2xl">
            Can I Download Stories on IG Downloader?
          </h2>
          <p className="text-sm md:text-base">
            No, the action of downloading stories on IG Downloader is not
            supported by the application due to its inherent limitations, as it
            prioritizes user privacy and adheres to Instagram&pos;s policies and
            security measures.
          </p>
        </section>
      </div>
    </main>
  );
}
