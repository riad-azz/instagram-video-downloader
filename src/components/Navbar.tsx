"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  return (
    <header className="h-fit w-full">
      <nav
        className={cn(
          "z-50",
          "flex h-[3.5rem] px-4",
          "bg-accent/20 w-full items-center border-b"
        )}
      >
        <div className="hidden select-none text-xl font-extrabold uppercase md:block">
          Downloader
        </div>
        <MobileNav className="md:hidden" />
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden items-center gap-4 text-lg sm:gap-8 sm:pr-8 md:flex">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link
              target="_blank"
              href="https://github.com/riad-azz/instagram-video-downloader"
              className="hover:underline"
            >
              Github
            </Link>{" "}
            <Link
              target="_blank"
              href="https://github.com/riad-azz"
              className="hover:underline"
            >
              Creator
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
