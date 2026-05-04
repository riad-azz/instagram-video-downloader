import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "SnapSave terms of service — rules for using our platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] px-4 py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: May 2025</p>
        </div>

        <div className="space-y-6 text-gray-400 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Acceptance of Terms</h2>
            <p>
              By using SnapSave (snapssave.com), you agree to these Terms of Service. If you do not agree, please do not use this service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Use of Service</h2>
            <p>SnapSave provides a tool to download publicly available Instagram videos, reels, and stories. You agree to use this service only for lawful purposes, including:</p>
            <ul className="ml-4 space-y-1 list-disc">
              <li>Downloading content you own or have explicit permission to download.</li>
              <li>Personal, non-commercial use of downloaded content.</li>
              <li>Respecting the intellectual property rights of content creators.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Prohibited Uses</h2>
            <p>You may not use SnapSave to:</p>
            <ul className="ml-4 space-y-1 list-disc">
              <li>Download content you do not have the right to reproduce or distribute.</li>
              <li>Circumvent any Instagram security features or terms of service.</li>
              <li>Use downloaded content for commercial purposes without proper authorization.</li>
              <li>Automate bulk downloads or scraping through our service.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Disclaimer of Warranties</h2>
            <p>
              SnapSave is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or that downloaded content will always be available. Instagram may change its platform at any time, which could affect our service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Limitation of Liability</h2>
            <p>
              SnapSave is not liable for any damages arising from your use of this service, including any copyright infringement claims resulting from content you download using our tool. You are solely responsible for ensuring you have the right to download and use any content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Not Affiliated with Instagram</h2>
            <p>
              SnapSave is an independent service and is not affiliated with, endorsed by, or connected to Instagram or Meta Platforms, Inc. in any way.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use of SnapSave after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p>
              For any questions regarding these terms, contact us at{" "}
              <a href="mailto:support@snapssave.com" className="text-blue-400 hover:underline">
                support@snapssave.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
