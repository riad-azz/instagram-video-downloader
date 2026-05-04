import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA Policy",
  description: "SnapSave DMCA policy — copyright takedown requests.",
};

export default function DmcaPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] px-4 py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">DMCA Policy</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: May 2025</p>
        </div>

        <div className="space-y-6 text-gray-400 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <p>
              SnapSave respects the intellectual property rights of others and complies with the Digital Millennium Copyright Act (DMCA). We do not host, store, or redistribute any Instagram content on our servers. SnapSave acts as a browser-based tool that retrieves publicly available media directly from Instagram&apos;s infrastructure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">How SnapSave Works</h2>
            <p>
              SnapSave does not cache or store any video content. When you request a download, the media is fetched directly from Instagram and streamed to your browser. We do not maintain any library of Instagram content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Copyright Infringement Notice</h2>
            <p>
              If you believe that content accessible through SnapSave infringes your copyright, please note that:
            </p>
            <ul className="ml-4 space-y-1 list-disc">
              <li>The content is served directly from Instagram, not hosted by us.</li>
              <li>To have the content removed, you should file a DMCA notice directly with Instagram/Meta.</li>
              <li>We will cooperate with any lawful copyright enforcement requests.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Contact for DMCA Concerns</h2>
            <p>
              If you have a DMCA concern specific to our service (not the underlying Instagram content), you may contact us at:
            </p>
            <p>
              <a href="mailto:support@snapssave.com" className="text-blue-400 hover:underline">
                support@snapssave.com
              </a>
            </p>
            <p>
              Please include: your contact information, a description of the copyrighted work, the URL where the allegedly infringing content was accessed, and a statement of good faith belief that the use is not authorized.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">User Responsibility</h2>
            <p>
              Users of SnapSave are solely responsible for ensuring they have the legal right to download and use any content retrieved through our service. Downloading copyrighted content without authorization may violate copyright law.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
