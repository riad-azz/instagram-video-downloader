"use client";

import { useState } from "react";
import {
  LogoLink,
  MenuButton,
  ThemeButton,
  NavLink,
  MobileMenuLink,
} from "./navigation";
import { siteConfig } from "@/configs/site";

type NavbarLinkProps = {
  id: number;
  title: string;
  href: string;
  icon?: React.ReactNode;
};

const navbarLinks: NavbarLinkProps[] = [
  {
    id: 0,
    title: "Home",
    href: "/",
  },
  {
    id: 0,
    title: "Contact Us",
    href: "https://github.com/riad-azz",
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="mb-4 w-full">
      <nav
        role="navigation"
        className="flex w-full flex-col items-center justify-between gap-2 border-b border-gray-300 px-2 py-1 dark:border-gray-600 md:flex-row md:px-8"
      >
        <div className="flex w-full items-center md:gap-2">
          {/* Logo */}
          <div className="mr-auto w-fit">
            <LogoLink title={siteConfig.name} href="/" />
          </div>
          {/* Dropdown menu button */}
          <MenuButton onClick={() => setShowMenu(!showMenu)} />
          {/* Main Navigation */}
          <ul className="mr-2 hidden shrink-0 gap-2 md:flex">
            {navbarLinks.map((link) => (
              <NavLink key={link.id} href={link.href}>
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
              <span>{link.title}</span>
            </MobileMenuLink>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
