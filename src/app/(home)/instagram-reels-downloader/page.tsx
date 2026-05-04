import { Metadata } from "next";
import { InstagramForm } from "@/components/instagram-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Instagram Reels Downloader — Download Reels Online",
  description:
    "Download Instagram Reels for free. Paste any public Reel link and save it to your device in seconds. No signup, no app required.",
};

const faqs = [
  {
    q: "How do I download an Instagram Reel?",
    a: "Open the Reel on Instagram, tap the three-dot menu, and copy the link. Paste it into SnapSave above and click Download Now.",
  },
  {
    q: "Are Reels downloaded in full quality?",
    a: "Yes. SnapSave fetches the Reel directly from Instagram's servers and delivers it in the original quality without re-encoding.",
  },
  {
    q: "Can I download Reels from private accounts?",
    a: "No. Only Reels from public Instagram accounts can be downloaded through SnapSave.",
  },
  {
    q: "Does this work on iPhone?",
    a: "Yes. SnapSave works on all devices including iPhone, Android, and desktop browsers. No app installation is required.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function InstagramReelsDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B0F19] px-4 py-20 md:py-28">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400">
            Instagram Reels Downloader
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Download Instagram Reels Online
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400 md:text-lg">
            Save any public Instagram Reel to your device instantly. Free, fast,
            and no account required.
          </p>
          <div className="mt-8">
            <InstagramForm />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-[#0D1120] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Save Instagram Reels in Seconds
          </h2>
          <p className="leading-relaxed text-gray-400">
            Instagram Reels are short, engaging videos that disappear from your
            feed unless you save them. SnapSave makes it easy to keep any public
            Reel permanently on your device — without needing the Instagram app
            or a login.
          </p>
          <p className="leading-relaxed text-gray-400">
            Just paste the Reel link into the box above, and SnapSave will
            retrieve the video directly from Instagram and start your download.
            The process takes a few seconds.
          </p>

          <h2 className="pt-4 text-2xl font-bold text-white">
            How to Download Instagram Reels
          </h2>
          <ol className="space-y-3 text-gray-400">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-sm font-bold text-indigo-400">
                1
              </span>
              <span>Open the Reel on Instagram you want to download.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-sm font-bold text-indigo-400">
                2
              </span>
              <span>
                Tap the three-dot (⋯) menu and select &quot;Copy Link&quot;.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-sm font-bold text-indigo-400">
                3
              </span>
              <span>
                Paste the link here and click{" "}
                <strong className="text-white">Download Now</strong>.
              </span>
            </li>
          </ol>

          <h2 className="pt-4 text-2xl font-bold text-white">
            Why Use SnapSave for Reels
          </h2>
          <ul className="space-y-2 text-gray-400">
            {[
              "Save trending Reels before they get taken down",
              "Download in original quality — no watermarks",
              "Works on iPhone, Android, and desktop",
              "No Instagram login required",
              "Completely free to use",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 text-indigo-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0B0F19] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="rounded-2xl border border-white/8 bg-white/4 p-2">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map(({ q, a }, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className={i < faqs.length - 1 ? "border-b border-white/6" : "border-0"}
                >
                  <AccordionTrigger className="px-4 py-5 text-left text-base font-medium text-white hover:text-indigo-400 hover:no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 text-left text-sm leading-relaxed text-gray-400">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-[#0D1120] px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm text-gray-500">Also available:</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/instagram-video-downloader"
              className="rounded-lg border border-white/8 bg-white/4 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-indigo-500/30 hover:text-white"
            >
              Instagram Video Downloader →
            </a>
            <a
              href="/instagram-story-downloader"
              className="rounded-lg border border-white/8 bg-white/4 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-indigo-500/30 hover:text-white"
            >
              Instagram Story Downloader →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
