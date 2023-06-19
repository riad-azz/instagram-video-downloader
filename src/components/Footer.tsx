import { Icons } from "@/components/Icons";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-100 text-gray-800 shadow dark:border-0 dark:bg-gray-900 dark:text-slate-300 dark:shadow-lg">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-2 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © 2023
          <a
            target="_blank"
            href="https://github.com/riad-azz"
            className="mx-1 hover:underline"
          >
            riad-azz
          </a>
          . All Rights Reserved.
        </span>
        <div className="mt-3 flex items-center gap-2 text-sm sm:text-center md:mt-0">
          <Icons.github />
          <span>Full Open Source project</span>
        </div>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium md:mt-0">
          <li>
            <a
              target="_blank"
              href="https://github.com/riad-azz/instagram-video-downloader/blob/master/LICENSE.md"
              className="mr-4 hover:underline md:mr-6"
            >
              Licensing
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/riad-azz"
              className="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
