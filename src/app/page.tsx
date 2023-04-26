import InstagramForm from "@/components/InstagramForm";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";

export default async function HomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-between">
        <Navbar />
        <main className="container mx-auto w-full flex-1 rounded p-4 md:max-w-3xl">
          <header className="mb-8 motion-safe:animate-[animate-drop_1.5s_ease-in-out_1]">
            <h1 className="mb-2 text-center text-2xl font-bold sm:text-4xl">
              Instagram Downloader
            </h1>
            <p className="mb-4 text-center text-sm md:text-base">
              Download Instagram Videos, Reels in high quality for free.
            </p>
          </header>
          <InstagramForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
