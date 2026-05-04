import { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the SnapSave team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
          <p className="text-gray-400">
            Have a question, found a bug, or want to report an issue? We&apos;re
            here to help.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-blue-600/20 p-3">
                <Mail className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Email Support
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  For general inquiries, bug reports, or DMCA concerns.
                </p>
                <a
                  href="mailto:support@snapssave.com"
                  className="mt-3 inline-block text-blue-400 transition-colors hover:text-blue-300 hover:underline"
                >
                  support@snapssave.com
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
            <h2 className="mb-3 text-lg font-semibold text-white">
              Common Topics
            </h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <strong className="text-gray-300">Bug reports:</strong> If a
                link isn&apos;t working, please include the type of content
                (video/reel/story) and the error you see.
              </li>
              <li>
                <strong className="text-gray-300">DMCA requests:</strong> See
                our{" "}
                <a href="/dmca" className="text-blue-400 hover:underline">
                  DMCA page
                </a>{" "}
                for the correct process.
              </li>
              <li>
                <strong className="text-gray-300">Privacy questions:</strong>{" "}
                See our{" "}
                <a
                  href="/privacy-policy"
                  className="text-blue-400 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-gray-300">Partnership inquiries:</strong>{" "}
                Reach us via email with the subject line &quot;Partnership&quot;.
              </li>
            </ul>
          </div>

          <p className="text-center text-xs text-gray-600">
            We aim to respond within 48 hours on business days.
          </p>
        </div>
      </div>
    </div>
  );
}
