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
      className="flex flex-col md:flex-row md:px-8 gap-2 w-full justify-between items-center px-2 py-1 mb-12 border-b border-gray-400 dark:border-[#e5e7eb]"
    >
      <div className="max-md:w-full max-md:flex max-md:justify-between max-md:items-center">
        <Link className="flex gap-1 items-center py-2" href="/">
          <Image
            className="w-8 h-8"
            src="/logo.png"
            alt="Logo"
            width={128}
            height={128}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
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
