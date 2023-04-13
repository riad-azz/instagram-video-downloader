import InstagramForm from "./components/InstagramForm";

export default function Home() {
  return (
    <main className="w-full md:max-w-2xl mx-auto p-4 my-8 md:border rounded">
      <header className="mb-8">
        <h1 className="text-2xl text-center font-bold select-none">
          Instagram Videos Downloader
        </h1>
        <p className="tracking-wide text-center">
          Copy and paste the post or reel URL and press Download.
        </p>
      </header>
      <InstagramForm />
    </main>
  );
}
