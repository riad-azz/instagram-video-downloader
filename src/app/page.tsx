import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InstagramForm from "@/components/InstagramForm";

export default function HomePage() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col justify-between py-8 md:max-w-3xl">
      <Header
        title="Instagram Video Downloader"
        subtitle="Download Instagram Videos for Free"
        className="mb-24 flex h-fit w-full flex-col items-center justify-center text-center"
      />
      <main className="mx-auto w-full flex-1 rounded p-4">
        <InstagramForm />
        <p className="my-4 text-center text-sm text-gray-400 motion-safe:animate-[animate-late-fade-in_2s_ease-in-out_1] dark:text-gray-400">
          If the download opens a new page, just right click the video and then
          click `Save as video`
        </p>
      </main>
      <Footer />
    </div>
  );
}
