"use client";

import React from "react";

import { useTranslations } from "next-intl";
import { useIsMobile } from "@/hooks/use-is-mobile";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { LogoImage, LogoText } from "@/components/logo";
import { LocaleDropdown } from "@/features/i18n/locale-dropdown";
import { ThemeToggleButton } from "@/features/theme/theme-toggle-button";

import { Menu } from "lucide-react";

import { homeLinks } from "@/lib/constants";

export function Header() {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const t = useTranslations("layouts.home.header");

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

  const navLinks = [
    { href: homeLinks.features, label: t("links.features") },
    { href: homeLinks.howItWorks, label: t("links.howItWorks") },
    { href: homeLinks.frequentlyAsked, label: t("links.frequentlyAsked") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <div
          role="button"
          onClick={scrollUp}
          className="flex cursor-pointer items-center gap-2"
        >
          <LogoImage className="h-6 w-6 text-blue-500" />
          <LogoText />
        </div>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}

          <div className="flex items-center gap-2 border-l border-white/8 pl-4">
            <LocaleDropdown />
            <ThemeToggleButton />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="ml-auto flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80%] border-white/8 bg-[#111827] sm:w-[350px]"
            >
              <SheetHeader className="border-b border-white/8 pb-4">
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <LogoImage className="h-6 w-6 text-blue-500" />
                    <LogoText />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col">
                <nav className="flex flex-col gap-1 px-2 pt-4">
                  {navLinks.map(({ href, label }) => (
                    <a
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-3 text-base font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="border-t border-white/8 px-4 py-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">
                      {t("themeLabel")}
                    </span>
                    <ThemeToggleButton variant="outline" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">
                      {t("localeLabel")}
                    </span>
                    <LocaleDropdown variant="outline" />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
