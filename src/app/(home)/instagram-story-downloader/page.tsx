import { Metadata } from "next";
import { InstagramForm } from "@/components/instagram-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Instagram Story Downloader — Save Instagram Stories Online",
  description:
    "Download Instagram Stories before they expire. Paste a public story link and save it instantly with SnapSave. Free and no signup required.",
};

const faqs = [
  {
    q: "How do I get the link to an Instagram Story?",
    a: "On Instagram, open the story, tap the three-dot menu, and select 'Copy Link'. Note: this only works for stories shared from public accounts where a shareable link is available.",
  },
  {
    q: "Can I download stories from private accounts?",
    a: "No. SnapSave can only access stories from public Instagram accounts that have a shareable link.",
  },
  {
    q: "Do stories expire before I can download them?",
    a: "Instagram stories expire after 24 hours. Use SnapSave as soon as you find a story you want to keep to make sure it's still available.",
  },
  {
    q: "Is SnapSave free for story downloads?",
    a: "Yes. Downloading stories is completely free with no limits or signup required.",
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

export default function InstagramStoryDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B0F19] px-4 py-20 md:py-28">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400">
            Instagram Story Downloader
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Download Instagram Stories Online
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400 md:text-lg">
            Save Instagram video stories before they disappear. Paste a public
            story link and download it instantly — free with no account needed.
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
            Keep Instagram Stories Forever
          </h2>
          <p className="leading-relaxed text-gray-400">
            Instagram Stories vanish after 24 hours. With SnapSave, you can
            save video stories from public accounts and keep them on your device
            permanently. No more missing content that expires before you can
            revisit it.
          </p>
          <p className="leading-relaxed text-gray-400">
            Availability depends on whether the story has a shareable link and
            whether the account is public. SnapSave works best with story links
            that start with https://www.instagram.com/stories/.
          </p>

          <h2 className="pt-4 text-2xl font-bold text-white">
            How to Download Instagram Stories
          </h2>
          <ol className="space-y-3 text-gray-400">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-sm font-bold text-violet-400">
                1
              </span>
              <span>Open the Instagram story you want to save.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-sm font-bold text-violet-400">
                2
              </span>
              <span>
                Tap the three-dot menu and select &quot;Copy Link&quot;.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-sm font-bold text-violet-400">
                3
              </span>
              <span>
                Paste the link into SnapSave above and click{" "}
                <strong className="text-white">Download Now</strong>.
              </span>
            </li>
          </ol>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-400">
            <strong>Note:</strong> Story downloads depend on the type of content
            and account privacy settings. SnapSave only works with public
            account stories that have a shareable link.
          </div>

          <h2 className="pt-4 text-2xl font-bold text-white">
            Why Save Stories with SnapSave
          </h2>
          <ul className="space-y-2 text-gray-400">
            {[
              "Save stories before they expire after 24 hours",
              "Works in your browser — no app needed",
              "Free with no limits or signup",
              "Works on mobile and desktop",
              "Download in original quality",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 text-violet-400">✓</span>
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
                  <AccordionTrigger className="px-4 py-5 text-left text-base font-medium text-white hover:text-violet-400 hover:no-underline">
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
              className="rounded-lg border border-white/8 bg-white/4 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-violet-500/30 hover:text-white"
            >
              Instagram Video Downloader →
            </a>
            <a
              href="/instagram-reels-downloader"
              className="rounded-lg border border-white/8 bg-white/4 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-violet-500/30 hover:text-white"
            >
              Instagram Reels Downloader →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
