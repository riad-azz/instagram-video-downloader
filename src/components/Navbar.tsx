import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 flex h-12 w-full items-center justify-between bg-white px-2 shadow-sm md:px-4">
      {/* Logo */}
      <Link
        href="/"
        aria-label="Logo"
        className="w-fit animate-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text py-2 text-base font-extrabold text-transparent"
      >
        <span className="hidden text-xl md:block">IG Downloader</span>
        <span className="block text-base md:hidden">IG Downloader</span>
      </Link>
      {/* Desktop */}
      <div className="hidden items-center gap-8 pr-4 text-lg font-light md:flex">
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <Link
          target="_blank"
          href="https://twitter.com/riadazz"
          className="text-primary hover:underline"
        >
          Contact
        </Link>
      </div>
      {/* Mobile */}
      <div className="flex items-center gap-4 text-sm md:hidden">
        <Link href="/" className="rounded bg-blue-500 px-4 py-2 text-white">
          Home
        </Link>
        <Link
          target="_blank"
          href="https://twitter.com/riadazz"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
