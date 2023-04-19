"use client";

import Link from "next/link";
import Image from "next/image";
import NavLink from "@/components/NavLink";
import MobileMenuLink from "@/components/MobileMenuLink";
import ThemeButton from "@/components/ThemeButton";
import MenuButton from "@/components/MenuButton";

import { useState } from "react";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      role="navigation"
      className="mb-12 flex w-full flex-col items-center justify-between gap-2 border-b border-gray-300 px-2 py-1 shadow-md dark:border-gray-600 dark:shadow-black/25 md:flex-row md:px-8"
    >
      <div className="flex w-full items-center md:gap-2">
        {/* Logo */}
        <div className="w-full">
          <Link className="flex items-center gap-1 py-2" href="/">
            <Image
              className="h-8 w-8"
              src="/logo.png"
              alt="Logo"
              width={128}
              height={128}
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              Riad-Azz
            </span>
          </Link>
        </div>
        {/* Dropdown menu button */}
        <MenuButton onClick={() => setShowMenu(!showMenu)} />
        {/* Main Navigation */}
        <ul className="flex shrink-0 gap-2">
          <div className="hidden gap-2 md:flex">
            <NavLink
              target="_blank"
              title="Github Repository"
              href="https://github.com/riad-azz/instagram-videos-downloader"
            />
          </div>
        </ul>
        {/* Theme */}
        <ThemeButton />
      </div>
      {/* Mobile Menu Navigation */}
      <ul
        className={`mb-2 flex flex-col gap-2 max-md:w-full ${
          !showMenu && "hidden"
        } md:hidden`}
      >
        <MobileMenuLink
          title="Github Repository"
          target="_blank"
          href="https://github.com/riad-azz/instagram-videos-downloader"
        />
      </ul>
    </header>
  );
};

export default Navigation;
