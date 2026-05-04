import React from "react";

import { Film, Clapperboard, BookOpen, LayoutGrid } from "lucide-react";

import { homeSections } from "@/lib/constants";

const contentTypes = [
  {
    Icon: Film,
    title: "Instagram Videos",
    description:
      "Download videos from any public Instagram post. Save clips directly to your device in their original quality.",
    gradient: "from-blue-600/20 to-blue-800/10",
    iconColor: "text-blue-400",
  },
  {
    Icon: Clapperboard,
    title: "Instagram Reels",
    description:
      "Save short-form Reels videos in full quality. Perfect for keeping your favorite trending content offline.",
    gradient: "from-indigo-600/20 to-indigo-800/10",
    iconColor: "text-indigo-400",
  },
  {
    Icon: BookOpen,
    title: "Instagram Stories",
    description:
      "Capture story videos before they disappear. Works with public account stories shared via direct link.",
    gradient: "from-violet-600/20 to-violet-800/10",
    iconColor: "text-violet-400",
  },
  {
    Icon: LayoutGrid,
    title: "Carousel Posts",
    description:
      "Access video content within multi-post carousels. Supports video slides from public carousel posts.",
    gradient: "from-purple-600/20 to-purple-800/10",
    iconColor: "text-purple-400",
  },
];

export function SupportedContent() {
  return (
    <section
      id={homeSections.supportedContent}
      className="w-full scroll-mt-16 bg-[#0D1120] py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400">
            Supported Content
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            What You Can Download
          </h2>
          <p className="mx-auto max-w-lg text-gray-400 md:text-lg">
            SnapSave supports multiple types of Instagram video content from
            public accounts.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contentTypes.map(({ Icon, title, description, gradient, iconColor }) => (
            <div
              key={title}
              className="flex flex-col items-start space-y-4 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/12"
            >
              <div
                className={`rounded-xl bg-gradient-to-br ${gradient} p-3`}
              >
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-600">
          Availability depends on the content type and account privacy settings.
          SnapSave only works with public Instagram links.
        </p>
      </div>
    </section>
  );
}
