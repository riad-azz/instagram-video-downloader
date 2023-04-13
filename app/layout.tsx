import "./globals.css";

export const metadata = {
  title: "Instagram Videos Downloader",
  description: "Download instagram videos very easily with one simple click",
  keywords:
    "instagram, videos, download, reels, instagram-downloader, downloader",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
