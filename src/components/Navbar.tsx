"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import IconButton from "@/components/ui/IconButton";

import { cn } from "@/utils";

const navbarLinks = [
  {
    name: "Home",
    href: "/",
    target: "_self",
  },
  {
    name: "Creator",
    href: "https://github.com/riad-azz",
    target: "_blank",
  },
  {
    name: "Github",
    href: "https://github.com/riad-azz/instagram-video-downloader",
    target: "_blank",
  },
  {
    name: "Contact",
    href: "https://twitter.com/riadazz",
    target: "_blank",
  },
];

const Navbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navbarRef = React.useRef<HTMLElement>(null);
  // Close Mobile Nav if screen size is bigger than 768
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 768 && setOpenNav(false)
    );
  }, []);

  // Close Mobile Nav on click outside Navbar
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setOpenNav(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-fit w-full">
      <nav
        ref={navbarRef}
        className={cn(
          "z-[999] w-full items-center justify-between bg-white",
          "flex flex-col md:flex-row md:px-4",
          openNav ? "shadow-none" : "shadow-sm"
        )}
      >
        <div className="flex w-full items-center justify-between px-2">
          {/* Logo */}
          <div
            aria-label="Logo"
            className={cn(
              "flex select-none items-center gap-1 py-2 font-extrabold",
              "animate-rgb bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"
            )}
          >
            <Image
              src={"/images/logo.png"}
              width={50}
              height={50}
              alt="logo"
              className="h-8 w-8"
            />
            <span className="text-2xl">IG Downloader</span>
          </div>
          {/* Mobile Nav Button */}
          <IconButton
            onClick={() => setOpenNav(!openNav)}
            className="p-1 md:hidden"
          >
            <span className="text-2xl">
              {openNav ? <IoCloseSharp /> : <RxHamburgerMenu />}
            </span>
          </IconButton>
        </div>
        {/* Desktop */}
        <div className="hidden items-center gap-8 pr-4 text-lg font-light md:flex">
          {navbarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.target}
              className="hover:text-purple-600 hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Mobile Nav */}
        {openNav && (
          <div className="relative z-[999] w-full md:hidden">
            <div
              className={cn(
                "full-top absolute flex w-full flex-col items-start gap-1 rounded-b p-2 shadow-md",
                "animate-[fade-in_0.2s_ease-in-out_1] bg-white"
              )}
            >
              {navbarLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.target}
                  onClick={() => setOpenNav(false)}
                  className="w-full rounded bg-gray-50 px-4 py-2 text-center text-lg font-light text-primary hover:text-purple-600 hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
