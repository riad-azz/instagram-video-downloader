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

interface INavbarLink {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navbarLinks: INavbarLink[] = [
  {
    id: 0,
    title: "Home",
    href: "/",
    icon: <Icons.home />,
  },
  {
    id: 1,
    title: "About",
    href: "/about",
    icon: <Icons.about />,
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav
      role="navigation"
      className="mb-4 flex w-full flex-col items-center justify-between gap-2 border-b border-gray-300 px-2 py-1 shadow-md dark:border-gray-600 dark:shadow-black/25 md:flex-row md:px-8"
    >
      <div className="flex w-full items-center md:gap-2">
        {/* Logo */}
        <div className="mr-auto w-fit">
          <LogoLink title="Insta Downloader" href="/" />
        </div>
        {/* Dropdown menu button */}
        <MenuButton onClick={() => setShowMenu(!showMenu)} />
        {/* Main Navigation */}
        <ul className="mr-2 hidden shrink-0 gap-2 md:flex">
          {navbarLinks.map((link) => (
            <NavLink key={link.id} href={link.href}>
              {link.icon}
              <span>{link.title}</span>
            </NavLink>
          ))}
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
        {navbarLinks.map((link) => (
          <MobileMenuLink key={link.id} href={link.href}>
            {link.icon}
            <span>{link.title}</span>
          </MobileMenuLink>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
