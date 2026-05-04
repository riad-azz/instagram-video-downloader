import { Metadata } from "next";
import { InstagramForm } from "@/components/instagram-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Instagram Video Downloader — Save Instagram Videos Online",
  description:
    "Download Instagram videos online for free. Paste any public Instagram video link and save it instantly. No signup required.",
};

const faqs = [
  {
    q: "How do I download an Instagram video?",
    a: "Copy the video link from Instagram, paste it into the input field above, and click Download Now. Your video will start downloading immediately.",
  },
  {
    q: "What video formats are supported?",
    a: "SnapSave downloads videos in the format Instagram uses — typically MP4. You get the original quality without any re-encoding.",
  },
  {
    q: "Can I download videos from private accounts?",
    a: "No. SnapSave only works with publicly accessible Instagram content. Private account videos cannot be downloaded.",
  },
  {
    q: "Is this tool free?",
    a: "Yes, completely free. No account, no subscription, no hidden fees.",
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

export default function InstagramVideoDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B0F19] px-4 py-20 md:py-28">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
            Instagram Video Downloader
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Download Instagram Videos Online
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400 md:text-lg">
            Paste any public Instagram video link below and save it directly to
            your device — for free, instantly, with no account required.
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
            Save Instagram Videos Easily
          </h2>
          <p className="leading-relaxed text-gray-400">
            SnapSave is the fastest way to download Instagram videos online.
            Whether you found a great cooking tutorial, a funny clip, or an
            informative post you want to keep — just copy the link and paste it
            here.
          </p>
          <p className="leading-relaxed text-gray-400">
            All you need is a public Instagram link. SnapSave fetches the
            highest quality video available and delivers it directly to your
            browser for download. No watermarks, no re-encoding, no fuss.
          </p>

          <h2 className="pt-4 text-2xl font-bold text-white">
            How to Download Instagram Videos
          </h2>
          <ol className="space-y-3 text-gray-400">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-sm font-bold text-blue-400">
                1
              </span>
              <span>
                Open Instagram and navigate to the video post you want to
                download.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-sm font-bold text-blue-400">
                2
              </span>
              <span>
                Tap the three-dot menu on the post and select &quot;Copy
                Link&quot;.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-sm font-bold text-blue-400">
                3
              </span>
              <span>
                Paste the link into SnapSave above and click{" "}
                <strong className="text-white">Download Now</strong>.
              </span>
            </li>
          </ol>

          <h2 className="pt-4 text-2xl font-bold text-white">
            Benefits of Using SnapSave
          </h2>
          <ul className="space-y-2 text-gray-400">
            {[
              "Works directly in your browser — no app needed",
              "Downloads in original quality",
              "Completely free with no usage limits",
              "No Instagram account or login required",
              "Mobile-friendly on iPhone and Android",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 text-blue-400">✓</span>
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
                  <AccordionTrigger className="px-4 py-5 text-left text-base font-medium text-white hover:text-blue-400 hover:no-underline">
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
              href="/instagram-reels-downloader"
              className="rounded-lg border border-white/8 bg-white/4 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-blue-500/30 hover:text-white"
            >
              Instagram Reels Downloader →
            </a>
            <a
              href="/instagram-story-downloader"
              className="rounded-lg border border-white/8 bg-white/4 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-blue-500/30 hover:text-white"
            >
              Instagram Story Downloader →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
