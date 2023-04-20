"use client";

import Link from "next/link";
import Image from "next/image";

import { MouseEventHandler, useState } from "react";

import { useStore } from "@/providers/theme";
import ThemeButton from "@/components/ui/ThemeButton";
import { Icons } from "@/components/Icons";

const LogoLink = ({ title }: { title: string }) => {
  const { theme } = useStore();
  return (
    <Link className="flex items-center gap-2 py-2" href="/">
      <Icons.logo size={40} />
      <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white">
        {title}
      </span>
    </Link>
  );
};

const NavLink = ({
  title,
  href,
  target,
  children,
}: {
  title: string;
  href: string;
  target?: string;
  children?: JSX.Element;
}) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="flex items-center gap-2 rounded bg-white px-3 py-2 font-medium text-gray-900 hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        {children}
        <span>{title}</span>
      </Link>
    </li>
  );
};

const MenuButton = ({ onClick }: { onClick: MouseEventHandler }) => {
  return (
    <button
      onClick={onClick}
      data-collapse-toggle="navbar-dropdown"
      type="button"
      className="order-last ml-3 inline-flex items-center rounded-lg border border-gray-300 p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
      aria-controls="navbar-dropdown"
      aria-expanded="false"
    >
      <span className="sr-only">Open navbar menu</span>
      <Icons.menu />
    </button>
  );
};

const MobileMenuLink = ({
  title,
  href,
  target,
  children,
}: {
  title: string;
  href: string;
  target?: string;
  children?: JSX.Element;
}) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="flex w-full items-center gap-4 rounded-lg border border-gray-300 bg-white px-5 py-2 font-medium text-gray-900 hover:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
      >
        {children}
        <span>{title}</span>
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      role="navigation"
      className="mb-12 flex w-full flex-col items-center justify-between gap-2 border-b border-gray-300 px-2 py-1 shadow-md dark:border-gray-600 dark:shadow-black/25 md:flex-row md:px-8"
    >
      <div className="flex w-full items-center md:gap-2">
        {/* Logo */}
        <div className="mr-auto w-fit">
          <LogoLink title="Riad-Azz" />
        </div>
        {/* Dropdown menu button */}
        <MenuButton onClick={() => setShowMenu(!showMenu)} />
        {/* Main Navigation */}
        <ul className="mr-2 flex shrink-0 gap-2">
          <div className="hidden gap-2 md:flex">
            <NavLink
              target="_blank"
              title="Github Repository"
              href="https://github.com/riad-azz/instagram-videos-downloader"
            >
              {<Icons.github />}
            </NavLink>
          </div>
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
          title="Github Repository"
          target="_blank"
          href="https://github.com/riad-azz/instagram-videos-downloader"
        >
          {<Icons.github />}
        </MobileMenuLink>
      </ul>
    </header>
  );
};

export default Navbar;
