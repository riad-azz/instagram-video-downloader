"use client";

import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import DropdownLink from "./DropdownLink";
import ThemeButton from "./ThemeButton";
import BurgerButton from "./BurgerButton";

import { useState } from "react";

const Navigation = () => {
  const [menu, setMenu] = useState(false);

  return (
    <header
      role="navigation"
      className="mb-12 flex w-full flex-col items-center justify-between gap-2 border-b border-gray-400 px-2 py-1 dark:border-[#e5e7eb] md:flex-row md:px-8"
    >
      <div className="max-md:flex max-md:w-full max-md:items-center max-md:justify-between">
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
        <BurgerButton onClick={() => setMenu(!menu)} />
      </div>
      <ul className="flex gap-2 max-md:hidden">
        <NavLink
          target="_blank"
          content="Github Repository"
          href="https://github.com/riad-azz/instagram-videos-downloader"
          animation="motion-safe:animate-[animate-drop_1s_ease-in-out_1]"
        />
        <NavLink
          target="_blank"
          content="Author"
          href="https://github.com/riad-azz/"
          animation="motion-safe:animate-[animate-drop_1s_ease-in-out_1]"
        />
        <ThemeButton animation="motion-safe:animate-[animate-roll-in_1s_ease-in_1]" />
      </ul>
      <ul
        className={`flex flex-col gap-2 max-md:w-full ${
          !menu && "hidden"
        } md:hidden`}
      >
        <DropdownLink
          target="_blank"
          content="Github Repository"
          href="https://github.com/riad-azz/instagram-videos-downloader"
        />
        <DropdownLink
          target="_blank"
          content="Author"
          href="https://github.com/riad-azz/"
        />
        <ThemeButton />
      </ul>
    </header>
  );
};

export default Navigation;
