"use client";

import { useState } from "react";
import { Icons } from "@/components/Icons";
import {
  LogoLink,
  MenuButton,
  ThemeButton,
  NavLink,
  MobileMenuLink,
} from "./navigation";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav
      role="navigation"
      className="mb-12 flex w-full flex-col items-center justify-between gap-2 border-b border-gray-300 px-2 py-1 shadow-md dark:border-gray-600 dark:shadow-black/25 md:flex-row md:px-8"
    >
      <div className="flex w-full items-center md:gap-2">
        {/* Logo */}
        <div className="mr-auto w-fit">
          <LogoLink title="Riad-Insta" />
        </div>
        {/* Dropdown menu button */}
        <MenuButton onClick={() => setShowMenu(!showMenu)} />
        {/* Main Navigation */}
        <ul className="mr-2 hidden shrink-0 gap-2 md:flex">
          <NavLink
            target="_blank"
            href="https://github.com/riad-azz/instagram-videos-downloader"
          >
            {<Icons.github />}
            <span>Source Code</span>
          </NavLink>
        </ul>
        {/* Theme Toggle */}
        <ThemeButton />
      </div>
      {/* Mobile Menu Navigation */}
      <ul
        className={`mb-2 flex flex-col gap-2 max-md:w-full ${
          !showMenu && "hidden"
        } md:hidden`}
      >
        <MobileMenuLink
          target="_blank"
          href="https://github.com/riad-azz/instagram-videos-downloader"
        >
          {<Icons.github />}
          <span>Source Code</span>
        </MobileMenuLink>
      </ul>
    </nav>
  );
};

export default Navbar;
