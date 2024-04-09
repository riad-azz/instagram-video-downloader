import { InstagramVideoForm } from "@/features/instagram/components/form";

export default function HomePage() {
  return (
    <div className="flex flex-col py-8">
      <h1 className="text-balance mb-8 text-center text-4xl font-extrabold">
        Instagram Video Downloader
      </h1>
      <section className="flex flex-col items-center justify-center gap-4">
        <InstagramVideoForm />
      </section>
    </div>
  );
}
