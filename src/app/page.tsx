import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InstagramForm from "@/components/InstagramForm";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between py-8">
      <Header
        title="Instagram Video Downloader"
        className="mb-24 flex h-fit w-full flex-col items-center justify-center text-center"
      />
      <main className="mx-auto w-full max-w-6xl flex-1">
        <InstagramForm />
      </main>
      <Footer />
    </div>
  );
}
