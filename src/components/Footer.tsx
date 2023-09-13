import { AiFillGithub } from "react-icons/ai";
import { TbBrandNextjs } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-screen-xl px-4 py-2 text-center text-secondary">
      <div className="flex flex-col items-center gap-2 text-center text-xs">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <a
              target="_blank"
              href="https://github.com/riad-azz"
              className="flex items-center hover:underline"
            >
              <TbBrandNextjs className="text-xl" />
              <span>Next.js</span>
            </a>
          </div>
          <span>|</span>
          <div>
            <span>Designed by </span>
            <a
              target="_blank"
              href="https://github.com/riad-azz"
              className="text-primary hover:underline"
            >
              @riad-azz
            </a>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <p>This project is fully open source on</p>
          <a
            target="_blank"
            href="https://github.com/riad-azz/instagram-video-downloader/"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <AiFillGithub className="text-sm" />
            <span>Github</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
