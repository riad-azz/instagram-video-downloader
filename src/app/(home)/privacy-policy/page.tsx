import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SnapSave privacy policy — how we handle your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] px-4 py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: May 2025
          </p>
        </div>

        <div className="space-y-6 text-gray-400 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <p>
              SnapSave (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This policy explains what information we collect when you use snapssave.com and how we use it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Information We Do Not Collect</h2>
            <p>
              SnapSave does not require you to create an account. We do not collect, store, or sell any personally identifiable information. Specifically:
            </p>
            <ul className="ml-4 space-y-1 list-disc">
              <li>We do not store the Instagram URLs you submit.</li>
              <li>We do not log download history tied to individual users.</li>
              <li>We do not ask for or store your Instagram credentials.</li>
              <li>We do not sell or share user data with third parties.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Cookies and Local Storage</h2>
            <p>
              We use minimal browser cookies to store your language preference and theme setting. These are functional cookies stored locally in your browser and are not used for tracking or advertising.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Analytics</h2>
            <p>
              We may use anonymous, aggregated analytics (such as page view counts) to understand how the service is used. This data does not identify individual users.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Third-Party Services</h2>
            <p>
              SnapSave fetches media from Instagram&apos;s public infrastructure. Instagram and Meta have their own privacy policies. We are not affiliated with Instagram or Meta.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Children&apos;s Privacy</h2>
            <p>
              SnapSave is not directed to children under 13. We do not knowingly collect any information from children.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at{" "}
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
